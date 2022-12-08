import { createContext, useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

export const OauthContext = createContext();

export function OauthProvider({ children }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userInfo, setUserInfo] = useState(initialValue);

  const navigate = useNavigate();

  const onRefresh = () => {};

  const isGoogleLogin = () => {
    const accessToken = searchParams.get('accessToken');
    const refreshToken = searchParams.get('refreshToken');
    const accessTokenExpiresIn = searchParams.get('accessTokenExpiresIn');

    if (accessToken) {
      setUserInfo({
        isLogin: true,
        accessToken,
        refreshToken,
        accessTokenExpiresIn,
      });

      navigate('/');
    }
  };

  useEffect(() => {
    isGoogleLogin();
  }, []);

  return (
    <OauthContext.Provider value={{ userInfo, onRefresh }}>
      {children}
    </OauthContext.Provider>
  );
}

const initialValue = {
  isLogin: false,
  accessToken: '',
  refreshToken: '',
  accessTokenExpiresIn: '',
};
