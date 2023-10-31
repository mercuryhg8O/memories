import { createContext, useContext, useState } from 'react';

const CurrentUserContext = createContext({ isLoggedIn: false, currentUserID: '' });
function AuthContextProvider({ children }) {
  const [currentUserID, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const baseUrl = 'https://reqres.in';

  return (
    <CurrentUserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        currentUserID,
        setCurrentUser,
        baseUrl
      }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export { CurrentUserContext, AuthContextProvider};