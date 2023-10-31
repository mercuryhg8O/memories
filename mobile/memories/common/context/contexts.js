import { createContext, useContext, useState } from 'react';

const CurrentUserContext = createContext({ isLoggedIn: false, currentUserID: '' });
function AuthContextProvider({ children }) {
  const [currentUserID, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

    const login = ({username, password}) => {
        // here I should send a request to the backend

        if(username === 'user1' && password === 'password'){
            return true;
        }

        return false;
    }

  return (
    <CurrentUserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        currentUserID,
        setCurrentUser,
        login,
      }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export { CurrentUserContext, AuthContextProvider};