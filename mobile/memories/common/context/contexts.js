// import React, { createContext, useContext, useState } from 'react';
import React, {useState, createContext, useEffect} from 'react';

const CurrentUserContext = createContext();
function CurrentUserContextProvider({ children }) {
  const [currentUserID, setCurrentUser] = useState('');
  const [displayUser, setDisplayUser] = useState(false);
  const [targetUserUID, setTargetUserUID] = useState('');
  const endpointURL = 'https://reqres.in';

  const mapView = React.createRef();

  return (
    <CurrentUserContext.Provider
      value={{
        mapView,
        currentUserID,
        setCurrentUser,
        displayUser, // boolean of if the profile modal should be displayed
        setDisplayUser,
        targetUserUID,
        setTargetUserUID,
        endpointURL,
      }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export { CurrentUserContext, CurrentUserContextProvider };