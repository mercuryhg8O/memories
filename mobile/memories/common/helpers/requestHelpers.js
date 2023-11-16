import { useState, useEffect, createContext, useContext, } from 'react';
import { Alert } from 'react-native';
import axios from 'axios';
import { CurrentUserContext } from '../context/contexts';

const endpointURL = ''


const mockMemoryResponse = {
  username: 'user1234',
  memoryDescription: 'memoryDescription example',
  numOfLikes: 0,
  tags: 'tags example'
}

const isValidUser = async (email, password) => {
  const query_string = `/api/isvaliduser?email=${email}&password=${password}`
  const request_address = endpointURL + query_string
  console.log('request made to: ' + request_address)


  const response = await axios.get(request_address,).catch((err) => {
    console.log('error during retrieval of when getting response: ', err);
  });

  if (response && response.data.isvaliduser === 'true') {
    return true;
  }

  return true;
}



const getUserData = async (userid) => {
  const query_string = `/api/userid?userid=${userid}`
  const request_address = endpointURL + query_string
  console.log('request made to: ' + request_address)

  const response = await axios.get(request_address).catch((err) => {
    console.log('error during retrieval response: ', err);
    return false;
  });

  let username = 'a';
  let bio = 'a';

  if (response) {
    username = response.data.username;
    bio = response.data.bio;
  }

  return { userid, username, bio };
}


const followUser = async (current_user, user_to_follow) => {

  // create back-end request to ask to follow the user
  const query_string =  `/api/followuser?requesting_user=${current_user}&usertofollow=${user_to_follow}`;
  const request_address = endpointURL + query_string;

  // error handling and return value handling:
  let error_during_request = false;
  let follow_request_sent = false;

  // send request to back-end
  console.log('sending request to:' + request_address);
  const response = await axios.get(request_address).catch((err) => {
    console.log('error during axios request: ', err);
    error_during_request = true;
  });

  // parse response to see if follow request was sent & process successfully
  if(response !== undefined){
    follow_request_sent = response?.follow_request_sent;
    if(follow_request_sent === undefined){
      follow_request_sent = false;
    }
  }


  // create alert if request was sent
  if(!error_during_request && follow_request_sent === true){
    Alert.alert('Send follow request', 'You sent a follow request to' + user_to_follow, [
      { text: 'Awesome' }
    ]);
  }
  
  if(!follow_request_sent){
    console.log('follow request was not sent');
  }
  
}


const createUserSuccessful = async (username, email, password, bio) => {
  const query_string = `/api/createaccount?email=${email}&password=${password}&username=${username}&bio=${bio}`
  const request_address = endpointURL + query_string;
  console.log('request made to: ' + request_address);

  const response = await axios.get(request_address).catch((err) => {
    // console.log('error during retrieval of when getting response: ', err);
    return false;
  });

  if (response && response.data.isvaliduser === 'true') {
    return true;
  }

  return true;
}

const getMemoryDetails = async (memoryId) => {
  // create a request to backend asking for details about a memory based on the memory id.
  // if there is an error, then send "dummy data".



  // TEMPORARY: short circuit request logic to provide mock memory details
  // TODO: remove once route is established on backend.
  return mockMemoryResponse;


  // create request to backend to get details about a memory and package it in a memory object
  const query_string = `/api/getmemorydetails?memoryid=${memoryId}`
  const request_address = endpointURL + query_string
  console.log('request should be made to: ' + request_address);

  // error handling and return value handling:
  let error_during_request = false;
  let created_memory = {
    username: 'error user example',
    memoryDescription: 'error example',
    numOfLikes: 0,
    tags: 'error example'
  }

  const response = await axios.get(request_address).catch((err) => {
    // an error occured while recieving the message. Should alert user

    console.log('There was an error while making a request to:' + request_address);
    error_during_request = true
  });

  // If there was an error, send dummy data and set up error handling
  if(error_during_request){
    console.log('Since there was an error getting the details for a memory. Sending default dummy data instead');
  }

  // if the request was successful parse the response 
  const response_data = response?.data;
  const user_name = response_data?.username;
  const memory_description = response_data?.memoryDescription;
  const number_of_likes = response_data?.numOfLikes;
  const tags = response_data?.tags;

  if(user_name !== undefined && 
      memory_description !== undefined && 
      number_of_likes !== undefined && 
      tags !== undefined && !error_during_request){

          created_memory = {
            username: user_name,
            memoryDescription: memory_description,
            numOfLikes: number_of_likes,
            tags: tags
          }

          // was able to parse all fields of the memoery response, so update the memory object
          return created_memory;
      }else{
          console.log("could not parse the response data for a memory object");
      }

  return created_memory;
}

export { isValidUser, createUserSuccessful, getUserData, getMemoryDetails, followUser };
