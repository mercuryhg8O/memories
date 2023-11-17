import { useState, useEffect, createContext, useContext, } from 'react';
import { Alert } from 'react-native';
import axios from 'axios';
import { CurrentUserContext } from '../context/contexts';

const endpointURL = 'https://memories-test-server.onrender.com'


const mockMemoryResponse = {
  username: 'user1234',
  memoryDescription: 'memoryDescription example',
  numOfLikes: 0,
  tags: 'tags example'
}

const isValidUser = async (email, password) => {
  const query_string = `/account/login?email=${email}&password=${password}`
  const request_address = endpointURL + query_string
  console.log('request made to: ' + request_address)
  let signed_in_worked = false;
  let userId = 'tempuserid'

  const request_body = {
    "email": email,
    "password": password
  };


  const response = await axios.post(request_address,request_body).catch((err) => {
    console.log('error during retrieval of when getting response: ', err);
  });

  console.log(response);

  if (response && response.data.message === 'Auth successful') {
    userId = response.data.accountID;
    signed_in_worked = true;
  }

  return {signed_in_worked, userId};
}



const getUserData = async (userid) => {
  const query_string = `/api/userid?userid=${userid}`
  const request_address = endpointURL + query_string
  console.log('request made to: ' + request_address)

  // error handling
  let found_user = false;

  const response = await axios.get(request_address).catch((err) => {
    console.log('error during retrieval response: ', err);
  });

  let username = 'default username';
  let bio = 'default bio';

  if (response) {
    username = response.data.username;
    bio = response.data.bio;
    found_user= true
  }

  // set to true for testing purposes - TODO: remove
  found_user = true;

  return { found_user, username, bio };
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
  // TODO: reminder that email needs a '@<something>.com'
  const query_string = `/account/signup`
  const request_address = endpointURL + query_string
  console.log('request made to: ' + request_address);
  let created_account = true;
  let userId = '';

  const request_body = {
    "email": email,
    "username": username,
    "password": password,
    "label": "Blog",
    "bio": bio,
  };

  console.log(request_body)


  const response = await axios.post(request_address, request_body).catch((err) => {
    console.log('error during retrieval of when getting response: ', err);
    created_account = false;
  });

  if(created_account){
    userId = response.data.createdAccount._id
    console.log('created account')
  }
  console.log('response:');
  console.log(response.data);

  return {created_account, userId};
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


const createMemorySuccessful = async ( memoryDescription, memoryVisibility, memoryTags, latitude, longitude) => {

  // temporary short circuit for testing
  return true;

  const query_string = `/api/creatememory`
  const request_address = endpointURL + query_string;
  console.log('request made to: ' + request_address);
  console.log('the contents of the request body are as follow:', memoryDescription, memoryVisibility, memoryTags);
  console.log('at this location', latitude, longitude);
  
  // error handling and return value handling:
  let error_during_request = false;
  let created_memory = false;
  // in the future add error checking for user-side data validation

  // send a post request to the server to create a memory
  const response = await axios.post(request_address, {
    memory_description: memoryDescription,
    memory_visibility: memoryVisibility,
    memory_tags: memoryTags
  }).catch((err) => {
    console.log('an error happened when trying to create a memory during the requesting phase' + err);
    error_during_request = true;
  });

  // parse response to see if memory was created
  if(!error_during_request && response?.data?.created_memory !== undefined){
    console.log('the memory?.data?.valid_info: ' + response?.data?.created_memory);
    created_memory = true;
  }

  if(!error_during_request && created_memory){
    console.log('created a memory');
    return true;
  }else{
    console.log('something went wrong while creating a memory');
  }


  return false;
}


const getMemoriesFromUser = () => {

  // get a list of id's, lats, and longs of each memory from this user

  


};


export { isValidUser, createUserSuccessful, getUserData, getMemoryDetails, followUser, createMemorySuccessful };
