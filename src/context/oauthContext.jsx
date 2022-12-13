import { createContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { setRefreshToken } from '../service/setRefreshToken';

export const OauthContext = createContext();

export function OauthProvider({ children }) {
  const [userInfo, setUserInfo] = useState();

  const onRefresh = () => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    setRefreshToken(accessToken, refreshToken).then((data) => {
      const { accessToken, refreshToken, accessTokenExpiresIn } = data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('accessTokenExpiresIn', accessTokenExpiresIn);

      setUserInfo(jwtDecode(accessToken));
    });
  };

  const onLogout = () => {
    setUserInfo('');
  };

  const initialUserInfo = (token) => {
    const userInfo = jwtDecode(token);
    setUserInfo(userInfo);
  };

  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    token && initialUserInfo(token);
  }, []);

  return (
    <OauthContext.Provider value={{ userInfo, onRefresh, onLogout }}>
      {children}
    </OauthContext.Provider>
  );
}
