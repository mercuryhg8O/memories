import { useState, useEffect, createContext, useContext, } from 'react';
import axios from 'axios';
import { CurrentUserContext } from '../context/contexts';

const isValidUser = async (username) => {
    const { endpointURL } = useContext(CurrentUserContext);

    const query_string = `/api/isvaliduser?email=${username}`
    const response = await axios.get(endpointURL + query_string).catch((err) => {
      console.log('error during retrieval of when getting response: ', err);
      return false;
    });

    if(response.data.userIsValid === 'true'){
        return true;
    }
    
    return true;
}

export {isValidUser};

export default isValidUser;