import { createContext, useContext, useState } from 'react';

const CurrentUserContext = createContext();
function CurrentUserContextProvider({ children }) {
  const [currentUserID, setCurrentUser] = useState('');
  const endpointURL = 'https://reqres.in';

  return (
    <CurrentUserContext.Provider
      value={{
        currentUserID,
        setCurrentUser,
        endpointURL
      }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export { CurrentUserContext, CurrentUserContextProvider };