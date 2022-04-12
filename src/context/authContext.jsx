import { createContext, useState, useEffect, useCallback } from 'react';

let logoutTimer;
export const Auth = createContext({
  token: '',
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjustedExpirationTime = new Date(expirationTime).getTime();

  const remainingTime = adjustedExpirationTime - currentTime;
  return remainingTime;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem('adminToken');
  const storedExpirationTime = localStorage.getItem('adminExpirationTime');

  const remainingTime = calculateRemainingTime(storedExpirationTime);

  if (remainingTime <= 60000) {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminExpirationTime');
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

const AuthProvider = ({ children }) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [adminToken, setAdminToken] = useState(initialToken);
  const isLoggedIn = !!adminToken;

  console.log(isLoggedIn);

  const logout = useCallback(() => {
    setAdminToken(null);
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminExpirationTime');

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const login = (token, expirationTime) => {
    setAdminToken(token);
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminExpirationTime', expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logout, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logout, tokenData.duration);
    }
  }, [tokenData, logout]);

  const valueCtx = {
    token: adminToken,
    isLoggedIn: isLoggedIn,
    login: login,
    logout: logout,
  };

  return <Auth.Provider value={valueCtx}>{children}</Auth.Provider>;
};

export default AuthProvider;
