import React, { useEffect, useState } from 'react';
import useQueryParams from '../../hooks/useQueryParams';
import { useNavigate } from 'react-router-dom';

const StravaLogin = () => {
  const query = useQueryParams();
  const navigate = useNavigate();
  const targetScope = [
    'read',
    'activity:write',
    'activity:read',
    'activity:read_all',
    'profile:write',
    'profile:read_all',
    'read_all',
  ];

  const [refreshToken, setRefreshToken] = useState('');
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const code = query.get('code');
    const scope = query.get('scope');
    if (checkScope(scope) && code) {
      let clientID = process.env.REACT_APP_CLIENT_ID;
      let clientSecret = process.env.REACT_APP_CLIENT_SECRET;

      fetch(
        `https://www.strava.com/api/v3/oauth/token?client_id=${clientID}&client_secret=${clientSecret}&code=${code}&grant_type=authorization_code`,
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
    } else {
      // TODO: display error on scope
    }
  }, [query]);

  useEffect(() => {
    if (refreshToken !== '' && accessToken !== '') {
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('tokenCreationDate', new Date().toString());
      navigate('/');
    }
  }, [refreshToken, accessToken]);

  const checkScope = (scope: string | null) => {
    if (!scope) {
      return false;
    }
    const scopeArray = scope.split(',');
    return scopeArray.length && targetScope.every((v) => scopeArray.includes(v));
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <p>Getting token from Strava</p>
      </div>
    </>
  );
};

export default StravaLogin;
