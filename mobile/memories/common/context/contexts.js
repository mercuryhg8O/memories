// import React, { createContext, useContext, useState } from 'react';
import React, {useState, createContext, useEffect} from 'react';

const CurrentUserContext = createContext();
function CurrentUserContextProvider({ children }) {

  // used for getting required information about a user for displaying in the main view modal
  const [currentUserID, setCurrentUser] = useState('');
  const [displayUser, setDisplayUser] = useState(false);
  
  // used for populating memory modal that displays information about the memory that is currently selected
  const [currentMemoryDetails, setCurrentMemoryDetails] = useState({});
  const [displayMemoryDetails, setDisplayMemoryDetails] = useState(false);
  /*
  Memory object is assumed to have the following format:
  Object:
  - username: <username of creator of memory>
  - memoryDescription: <description of the memory>
  - numOfLikes: <number of likes on the post>
  - tags: <tags associated with the post as a single string where all the tags are concatenated>
  */

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
        currentMemoryDetails,
        setCurrentMemoryDetails,
        displayMemoryDetails, // boolean of if the memory modal should be displayed
        setDisplayMemoryDetails,
        targetUserUID,
        setTargetUserUID,
        endpointURL,
      }}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export { CurrentUserContext, CurrentUserContextProvider };