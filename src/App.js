import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activities, setActivities] = useState([]);
  const [refreshToken, setRefreshToken] = useState(process.env.REACT_APP_REFRESH_TOKEN);
  const [accessToken, setAccessToken] = useState();
  const [checkResults, setCheckResults] = useState();

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
          setIsLoading(false);
        })
        .catch((e) => console.error(e));
    }
  }, [accessToken]);

  const checkForSegments = (activityId) => {
    if (accessToken) {
      fetch(`http://localhost:3001/activities/${activityId}`, {
        method: 'POST',
        headers: new Headers({
          'x-strava-token': accessToken,
          'Content-Type': 'application/json',
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.activity.matchingSegmentsIds > 0) {
            alert(`This activity has ${data.activity.matchingSegmentsIds.length} matching segments`);
            setCheckResults(
              data.activity.matchingSegmentsIds.map((matchingSegmentId, index) => {
                return {
                  segmentId: matchingSegmentId,
                  picture: data.activity.segmentsPictures[index],
                };
              }),
            );
          }
        })
        .catch((e) => console.error(e));
    }
  };

  function showActivities() {
    if (isLoading) {
      return <>LOADING</>;
    } else if (checkResults && checkResults.length) {
      return <></>;
    } else {
      return (
        <>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
              <a className="navbar-brand" href="#">
                Strava Segments to NFTs
              </a>
              <Button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </Button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">
                      Home
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link disabled" href="#">
                      Coming soon
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <div className="row">
            {activities &&
              activities.length &&
              activities.map((activity) => (
                <div className="col-sm-6" key={activity.id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{activity.name}</h5>
                      <p className="card-text">
                        Some quick example text to build on the card title and make up the bulk of the card's content.
                      </p>
                      <Button onClick={() => checkForSegments(activity.id)}>Check for segments</Button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      );
    }
  }

  function showMatchingSegments() {
    if (checkResults && checkResults.length) {
      return checkResults.map((result) => (
        <div key={result.segmentId}>
          <h1>Segment #{result.segmentId}</h1>
          <img alt={result.segmentId} src={`https://ipfs.io/ipfs/${result.picture}`} width={500} />
        </div>
      ));
    }
  }

  return (
    <div className="App">
      {showActivities()}
      {showMatchingSegments()}
    </div>
  );
}

export default App;
