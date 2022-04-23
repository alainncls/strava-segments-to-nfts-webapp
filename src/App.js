import React, { useEffect, useState } from 'react';

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
        activities &&
        activities.length &&
        activities.map((activity) => (
          <div key={activity.id}>
            <h1>{activity.name}</h1>
            <button onClick={() => checkForSegments(activity.id)}>Check for segments</button>
          </div>
        ))
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
