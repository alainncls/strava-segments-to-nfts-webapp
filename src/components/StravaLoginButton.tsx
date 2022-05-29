import React from 'react';
import btnStrava from './../img/btn_strava.svg';

const StravaLoginButton = () => {
  return (
    <div className="d-flex justify-content-center">
      <a
        href={`https://www.strava.com/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&response_type=code&scope=read,read_all,profile:read_all,profile:write,activity:read,activity:read_all,activity:write&redirect_uri=${process.env.REACT_APP_OAUTH_URL}`}
      >
        <img src={btnStrava} />
      </a>
    </div>
  );
};

export default StravaLoginButton;
