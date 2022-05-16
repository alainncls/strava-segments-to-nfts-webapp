import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import { Card, Modal, Spinner } from 'react-bootstrap';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const [refreshToken, setRefreshToken] = useState(process.env.REACT_APP_REFRESH_TOKEN);
  const [accessToken, setAccessToken] = useState();
  const [checkResults, setCheckResults] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
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
    }
  }, [accessToken]);

  const checkForSegments = (activityId) => {
    if (accessToken) {
      setIsLoading(true);
      fetch(`http://localhost:3001/activities/${activityId}`, {
        method: 'POST',
        headers: new Headers({
          'x-strava-token': accessToken,
          'Content-Type': 'application/json',
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.activity?.matchingSegmentsIds > 0) {
            setCheckResults(
              data.activity.matchingSegmentsIds.map((matchingSegmentId, index) => {
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

  const showHeader = () => {
    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-white">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#navbarExample01"
              aria-controls="navbarExample01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="fas fa-bars"></i>
            </button>
            <div className="collapse navbar-collapse" id="navbarExample01">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item active">
                  <a className="nav-link" aria-current="page" href="#">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link  disabled" href="#">
                    Features
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link  disabled" href="#">
                    About
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="p-5 mb-3 text-center bg-light">
          <h1 className="mb-3">Strava Segments to NFTs</h1>
          <h4 className="mb-3">Mint NFTs for the eligible Strava segments you've gone through</h4>
          <a
            className="btn btn-outline-secondary m-1"
            href="https://github.com/alainncls/strava-segments-to-nfts-webapp"
            target="_blank"
            rel="noreferrer"
            role="button"
          >
            <i className="bi bi-github"></i> WebApp
          </a>
          <a
            className="btn btn-outline-secondary m-1"
            href="https://github.com/alainncls/strava-segments-to-nfts"
            target="_blank"
            rel="noreferrer"
            role="button"
          >
            <i className="bi bi-github"></i> Server
          </a>
        </div>
      </header>
    );
  };

  const showFooter = () => {
    return (
      <footer className="bg-secondary text-center text-white text-lg-start fixed-bottom">
        <div className="text-center p-3">
          <strong>Strava Segments to NFTs</strong> built and designed with
          <span className="text-danger"> ♥</span> by{' '}
          <a href="https://alainnicolas.fr" target="_blank" rel="noreferrer" className="text-white">
            Alain Nicolas
          </a>
        </div>
      </footer>
    );
  };

  const showActivities = () => {
    return (
      <div className="row">
        {activities &&
          activities.length &&
          activities.map((activity) => (
            <div className="col-sm-6 mb-3" key={activity.id}>
              <Card>
                <Card.Header>
                  <Card.Title>{activity.name}</Card.Title>
                </Card.Header>
                <Card.Body>
                  <div>{new Date(Date.parse(activity.start_date)).toLocaleDateString()}</div>
                </Card.Body>
                <Card.Footer>
                  <Button className="btn btn-primary btn-sm" onClick={() => checkForSegments(activity.id)}>
                    Check for eligible segments
                  </Button>
                </Card.Footer>
              </Card>
            </div>
          ))}
      </div>
    );
  };

  const handleModalClose = () => setShowModal(false);
  const handleMintNfts = () => {
    // TODO: do mint NFTs
    setShowModal(false);
  };

  const showMatchingSegments = () => {
    return (
      <Modal show={showModal} onHide={handleModalClose} size={'lg'} scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>Eligible segments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {checkResults.map((result) => (
            <div key={result.segmentId}>
              <h5>Segment #{result.segmentId}</h5>
              <img
                alt={result.segmentId}
                src={`https://ipfs.io/ipfs/${result.picture.replace('ipfs://', '')}`}
                width={500}
              />
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleMintNfts}>
            Mint NFTs
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const showLoader = () => {
    if (isLoading) {
      return (
        <div className="d-flex justify-content-center">
          <Spinner animation={'grow'} role={'status'} />
        </div>
      );
    }
  };

  return (
    <Container className="p-3">
      {showHeader()}
      {showLoader()}
      <Container className="mb-5">
        {showActivities()}
        {showMatchingSegments()}
      </Container>
      {showFooter()}
    </Container>
  );
}

export default App;
