import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { IActivity, IActivityData } from '../../types/activity';
import { ISegment } from '../../types/segment';
import Loader from '../../components/Loader/Loader';
import Header from '../../components/Header/Header';
import Activities from '../../components/Activities/Activities';
import MatchingSegmentsModal from '../../components/MatchingSegmentsModal/MatchingSegmentsModal';
import StravaLoginButton from '../../components/StravaLoginButton/StravaLoginButton';
import Footer from '../../components/Footer/Footer';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [refreshToken, setRefreshToken] = useState<string>();
  const [accessToken, setAccessToken] = useState<string>();
  const [tokenCreationDate, setTokenCreationDate] = useState<Date>();
  const [checkResults, setCheckResults] = useState<ISegment[]>([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (refreshToken && tokenCreationDate && tokenCreationDate.getTime() < new Date().getTime() - 6 * 3600 * 1000) {
      let clientID = process.env.REACT_APP_CLIENT_ID;
      let clientSecret = process.env.REACT_APP_CLIENT_SECRET;
      fetch(
        `https://www.strava.com/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`,
        {
          method: 'POST',
        },
      )
        .then((res) => res.json())
        .then((result) => {
          setRefreshToken(result.refresh_token);
          setAccessToken(result.access_token);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [tokenCreationDate]);

  useEffect(() => {
    const access = localStorage.getItem('accessToken');
    if (access) {
      setAccessToken(access);
    }

    const refresh = localStorage.getItem('refreshToken');
    if (refresh) {
      setRefreshToken(refresh);
    }

    const creationDate = localStorage.getItem('tokenCreationDate');
    if (creationDate) {
      setTokenCreationDate(new Date(creationDate));
    }
  }, []);

  // use current access token to call all activities
  useEffect(() => {
    if (accessToken) {
      fetch(`https://www.strava.com/api/v3/athlete/activities?access_token=${accessToken}`)
        .then((res) => res.json())
        .then((data) => {
          setActivities(data);
        })
        .catch((e) => console.error(e))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [accessToken]);

  const checkForSegments = (activityId: string) => {
    if (accessToken) {
      setIsLoading(true);
      fetch(`${process.env.REACT_APP_SERVER_URL}/activities/${activityId}`, {
        method: 'POST',
        headers: new Headers({
          'x-strava-token': accessToken,
          'Content-Type': 'application/json',
        }),
      })
        .then((res) => res.json())
        .then((data: IActivityData) => {
          if (data.activity?.matchingSegmentsIds.length) {
            setCheckResults(
              data.activity.matchingSegmentsIds.map((matchingSegmentId: number, index: number) => {
                return {
                  segmentId: matchingSegmentId,
                  picture: data.activity.segmentsPictures[index],
                };
              }),
            );
            setShowModal(true);
          }
        })
        .catch((e) => console.error(e))
        .finally(() => setIsLoading(false));
    }
  };

  const buildMintNftsBody = () => {
    const segmentsPictures = checkResults.map((result) => result.picture);
    const matchingSegmentsIds = checkResults.map((result) => result.segmentId);
    return { segmentsPictures, matchingSegmentsIds };
  };

  const handleMintNfts = () => {
    if (accessToken && checkResults.length) {
      setIsLoading(true);
      const body = buildMintNftsBody();
      const headers: HeadersInit = new Headers();
      headers.set('Content-Type', 'application/json');
      headers.set('x-strava-token', accessToken);
      fetch(`${process.env.REACT_APP_SERVER_URL}/nfts`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers,
      })
        .then((res) => res.json())
        .catch((e) => console.error(e))
        .finally(() => {
          setShowModal(false);
          setIsLoading(false);
        });
    } else {
      alert('Something went wrong while trying to mint NFTs');
    }
  };

  const onModalHide = () => {
    setShowModal(false);
    setCheckResults([]);
  };

  return (
    <>
      <Loader loading={isLoading} />
      <Container className="p-3">
        <Header />
        <div className={'mb-5'}>
          {accessToken ? (
            <>
              <Activities activities={activities} checkForSegments={checkForSegments} />
              <MatchingSegmentsModal
                checkResults={checkResults}
                displayModal={showModal}
                handleMintNfts={handleMintNfts}
                onHide={onModalHide}
              />
            </>
          ) : (
            <StravaLoginButton />
          )}
        </div>
        <Footer />
      </Container>
    </>
  );
};

export default Home;
