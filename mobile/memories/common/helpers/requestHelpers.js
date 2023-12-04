import { useState, useEffect, createContext, useContext, } from 'react';
import { Alert } from 'react-native';
import axios from 'axios';
import { CurrentUserContext } from '../context/contexts';



// endpoint the the backend is deployed at
export const BASE_URL = 'https://memories-test-server.onrender.com'


// create a request to sign in
const isValidUser = async (email, password) => {
  const query_string = `/account/login?email=${email}&password=${password}`
  const request_address = BASE_URL + query_string
  console.log('request made to: ' + request_address)
  let signed_in_worked = false;
  let userId = 'tempuserid'

  const request_body = {
    "email": email,
    "password": password
  };

  const response = await axios.post(request_address, request_body).catch((err) => {
    console.log('error during retrieval of when getting response: ', err);
  });

  if (response && response.data.message === 'Auth successful') {
    userId = response.data.accountID;
    signed_in_worked = true;
  }

  return { signed_in_worked, userId };
}

// request information about a user
const getUserData = async (userid) => {
  const query_string = `/account/${userid}`
  const request_address = BASE_URL + query_string
  console.log('request made to: ' + request_address)

  // error handling
  let found_user = false;
  let username = 'default username'; 
  let bio = 'default bio';

  axios.get(request_address).then((response) => {
    console.log("HEREEE");
    console.log(response);
    username = response.data.doc.username;
    bio = response.data.doc.bio;
    console.log("response: " + username + " " + bio);
    found_user = true;
  }).catch((err) => {
    console.log('error during retrieval response: ', err);
  });

  console.log("response: " + username + " " + bio);
  return { found_user, username, bio };
}

// send a request to follow a user
// param: current_user <- current userid
// param: user_to_follow <- userid of user to follow
const followUser = async (current_user, user_to_follow) => {

  // create back-end request to ask to follow the user
  const query_string = `/account/${user_to_follow}/${current_user}/follow`;
  const request_address = BASE_URL + query_string;

  // error handling and return value handling:
  let error_during_request = false;
  let follow_request_sent = false;

  // send request to back-end
  console.log('sending request to:' + request_address);
  const response = await axios.post(request_address).catch((err) => {
    console.log('error during axios request: ', err);
    error_during_request = true;
  });

  // parse response to see if follow request was sent & process successfully
  if (response !== undefined) {
    console.log(response.status);

    // create alert if request was sent
    if (!error_during_request && follow_request_sent === true) {
      Alert.alert('Send follow request', 'You sent a follow request to. You may already follow them.' + user_to_follow, [
        { text: 'Awesome' }
      ]);
    }

    follow_request_sent = response?.follow_request_sent;
    if (follow_request_sent === undefined) {
      follow_request_sent = false;
    }
  }

  if (!follow_request_sent) {
    return false;
  }

  return true;

}

// request to create a user
const createUserSuccessful = async (userName, email, password, bio) => {
  // TODO: reminder that email needs a '@<something>.com'
  const query_string = `/account/signup`
  const request_address = BASE_URL + query_string
  console.log('request made to: ' + request_address);
  let created_account = true;
  let userId = '';

  const request_body = {
    "email": email,
    "username": userName,
    "password": password,
    "label": "Blog",
    "bio": bio,
  };

  const response = await axios.post(request_address, request_body).catch((err) => {
    console.log('error during retrieval of when getting response: ', err);
    console.warn('an account with that email address already exists.')
    created_account = false;
  });

  if (created_account) {
    userId = response.data.createdAccount._id
    console.log('created account');
    console.log('the account that was created has the userid of:', userId);
    console.log('response:');
    console.log(response.data);
  }

  console.log('once the createUserSuccessful function ends, this is the value of the created_account bool: ', created_account)
  console.log('once the createUserSuccessful function ends, this is the value of the userId: ', userId)

  return { created_account, userId };
}

// get details about a memory 
const getMemoryDetails = async (memoryId) => {

  // create request to backend to get details about a memory and package it in a memory object
  const query_string = `/memory/id/${memoryId}`
  const request_address = BASE_URL + query_string
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
  if (error_during_request) {
    console.log('Since there was an error getting the details for a memory. Sending default dummy data instead');
  }

  // if the request was successful parse the response 
  const response_data = response?.data?.memory;
  const user_name = response_data?.accountName; // account id
  const memory_description = response_data?.bodyText;
  const likes_by_people = response_data?.likedBy;
  const tags = response_data?.tags;

  console.log(memory_description)

  // console.log('response parsed: ', user_name, memory_description, tags);

  if (user_name !== undefined &&
    memory_description !== undefined &&
    likes_by_people !== undefined &&
    tags !== undefined && !error_during_request) {

    created_memory = {
      username: user_name,
      memoryDescription: memory_description,
      numOfLikes: likes_by_people.length,
      tags: tags
    }

    // was able to parse all fields of the memoery response, so update the memory object
    return created_memory;
  } else {
    console.log("could not parse the response data for a memory object");
  }

  return created_memory;
}

// create a memory
const createMemorySuccessful = async (accountID, memoryDescription, memoryVisibility, memoryTags, latitude, longitude) => {
  // NOTE: requires a minium of 5 characters for memoryDescription
  const query_string = `/memory`
  const request_address = BASE_URL + query_string;
  console.log('request made to: ' + request_address);

  // error handling and return value handling:
  let error_during_request = false;
  let created_memory = false;
  // in the future add error checking for user-side data validation
  console.log(accountID)

  // function pre-conditons check (make sure all arguments are not null)
  if (accountID && memoryDescription && memoryVisibility && memoryTags && latitude && longitude){
    return false;
  }

  // send a post request to the server to create a memory
  const response = await axios.post(request_address, {
    bodyText: memoryDescription,
    visibility: memoryVisibility,
    accountID: accountID,
    tags: memoryTags,
    latitude: latitude,
    longitude: longitude
  }).catch((err) => {
    console.log('an error happened when trying to create a memory during the requesting phase' + err);
    error_during_request = true;
  });

  // parse response to see if memory was created
  if (!error_during_request && response?.data?.message === "Created memory successfully") {
    console.log('the memory?.data?.valid_info: ' + response?.data?.createdMemory._id);
    created_memory = true;
  }

  if (!error_during_request && created_memory) {
    console.log('created a memory');
    return true;
  } else {
    console.log('something went wrong while creating a memory');
  }

  // could not create memory
  return false;
}

// get memories that a user has made (that can be seen by the current user)
const getMemoriesFromUser = async (currentuserid, memories_of_this_user) => {

  // get a list of id's, lats, and longs of each memory from this user
  const query_string = `/memory/${memories_of_this_user}/${currentuserid}`
  const request_address = BASE_URL + query_string
  console.log('request made to: ' + request_address)

  // error checking (back-end cannot accept undefined user requests)
  let search_worked = false;

  if (currentuserid === undefined || memories_of_this_user === undefined) {
    console.log('currentuserid: ', currentuserid, ' memories_of_this_user: ', memories_of_this_user)
    console.log('setting both to 0')
    currentuserid = 0
    memories_of_this_user = 0
    return { search_worked, memories_list };
  }
  
  let memories_list = []


  const response = await axios.get(request_address).catch((err) => {
    console.log('error during retrieval of when getting response: ', err);

    // search_worked = false
  });

  console.log(response.data);

  if (response && response.data?.count !== undefined) {
    memories_list = response.data.memory;
    search_worked = true;
  }

  //console.log(memories_list)
  console.log('search_worked: ', search_worked)

  return { search_worked, memories_list };


};

// get a list of users for the search page
const getUsersFromSearch = async (searchString) => {

  const query_string = `/search/user?search=${searchString}`
  const request_address = BASE_URL + query_string
  // console.log('request made to: ' + request_address)
  let search_worked = false;
  let users_list = []


  const response = await axios.get(request_address).catch((err) => {
    console.log('error during retrieval of when getting response: ', err);
  });


  if (response && response.status === 200) {


    for (let key of response.data.user.keys()) {

      person_detail = {
        userid: response.data.user[key]._id,
        username: response.data.user[key].username,
      }

      users_list.push(person_detail);
    }
    search_worked = true;
  }

  return { search_worked, users_list };
};

// get a list of mutuals 
const getMutuals = async (currentUserId) => {
  const query_string = `/account/${currentUserId}/mutuals`;
  const request_address = BASE_URL + query_string;

  const response = await axios.get(request_address).catch((err) => {
    console.log('failed getting mutuals list, here\'s yer \'rror', err);
  });

  if (response && response.status === 200) {
    for (let key of response.data.user.keys()) {
      person_detail = {
        // TODO waiting on backend to be fully implemented
      }
    }
  }
}


export { isValidUser, createUserSuccessful, getUserData, getMemoryDetails, followUser, getMemoriesFromUser, createMemorySuccessful, getUsersFromSearch };
