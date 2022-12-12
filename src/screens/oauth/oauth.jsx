import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { setAuthorizationToken } from '../../service/setAuthorizationToken';

export default function Oauth() {
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();

  const isGoogleLogin = () => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const accessTokenExpiresIn = searchParams.get('accessTokenExpiresIn');

    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('accessTokenExpiresIn', accessTokenExpiresIn);

    setAuthorizationToken(accessToken);
    navigate('/');
  };

  useEffect(() => {
    isGoogleLogin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
