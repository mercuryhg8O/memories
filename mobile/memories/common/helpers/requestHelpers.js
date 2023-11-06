import { useState, useEffect, createContext, useContext, } from 'react';
import axios from 'axios';
import { CurrentUserContext } from '../context/contexts';

const endpointURL = ''

const isValidUser = async (email, password) => {
    const query_string = `/api/isvaliduser?email=${email}&password=${password}`
    const request_address = endpointURL + query_string
    console.log('request made to: ' + request_address)

 
    const response = await axios.get(request_address,).catch((err) => {
      console.log('error during retrieval of when getting response: ', err);
    });

    if(response && response.data.isvaliduser === 'true'){
        return true;
    }
    
    return true;
}

const createUserSuccessful = async (username, email, password, bio) => {
  const query_string = `/api/createaccount?email=${email}&password=${password}&username=${username}&bio=${bio}`
  const request_address = endpointURL + query_string
  console.log('request made to: ' + request_address)
  
  const response = await axios.get(request_address).catch((err) => {
    // console.log('error during retrieval of when getting response: ', err);
    return false;
  });

  if(response && response.data.isvaliduser === 'true'){
      return true;
  }
  
  return true;
}

export {isValidUser, createUserSuccessful};

export default isValidUser;