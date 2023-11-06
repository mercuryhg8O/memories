import { useState, useEffect, createContext, useContext, } from 'react';
import axios from 'axios';
import { CurrentUserContext } from '../context/contexts';

const isValidUser = async (email, password) => {
    // const { endpointURL } = useContext(CurrentUserContext);
    endpointURL = 'aa'

    const query_string = `/api/isvaliduser?email=${email}&password=${password}`
    const response = await axios.get(endpointURL + query_string).catch((err) => {
      console.log('error during retrieval of when getting response: ', err);
      return false;
    });

    if(response.data.isvaliduser === 'true'){
        return true;
    }
    
    return true;
}

const createUserSuccessful = async (username, email, password, bio) => {
  // const { endpointURL } = useContext(CurrentUserContext);

  const query_string = `/api/createaccount?email=${email}&password=${password}&username=${username}`
  const response = await axios.get(endpointURL + query_string).catch((err) => {
    console.log('error during retrieval of when getting response: ', err);
    return false;
  });

  if(response.data.isvaliduser === 'true'){
      return true;
  }
  
  return true;
}

export {isValidUser, createUserSuccessful};

export default isValidUser;