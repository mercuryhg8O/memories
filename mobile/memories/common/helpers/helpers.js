import axios from 'axios';
import { Alert } from 'react-native';
import * as Location from 'expo-location';
import {getMemoryDetails} from './requestHelpers';


const MockResponse = {
  "memories": [
    {
      "id": 1,
      "title": "Memory 1",
      "latitude": 42.72975825494276,
      "longitude": -73.67830944235584,
      "description": "This is description 1",
    },
    {
      "id": 2,
      "title": "Memory 2",
      "latitude": 42.72993893531263,
      "longitude": -73.676754972665,
      "description": "This is description 1",
    },
  ]
}

const defaultLatLong = {
  latitude: 42,
  longitude: 42,
}


const ParseMemoriesDetails = () => {

  // Make Back-end call here to get Json, and parse similarly to the mock response.
  {/*Parse memory */ }
  memories = MockResponse.memories.map((memory) => ({ latitude: memory.latitude, longitude: memory.longitude, title: memory.title, id: memory.id }))
  error = false;

  return { memories, error }
}


const fetchData = (URI) => {
  // Invoking the get method to perform a GET request
  axios.get(`${baseUrl}` + URI).then((response) => {
    console.log(response.data);
    if (response.status == 200) {
      return response.data
    } else {
      console.warn('An error occurred in the fetchData function with the URI: ' + URI);
      return null;
    }
  });
}


const goTo = (mapView, lat, long, latDelta = .5, longDelta = .5) => {
  const region = {
    latitude: lat,
    longitude: long,
    latitudeDelta: latDelta,
    longitudeDelta: longDelta,
  }
  mapView.current.animateToRegion(region, 1000); // args: (region, duration)
}


const getCurrentLatLong = async () => {

  // set default lat and long
  let latitude = defaultLatLong.latitude;
  let longitude = defaultLatLong.longitude;


  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {

    Alert.alert('location permissions not available', 'navigate to setting and allow app location permissions', [
      { text: 'OK' }, { text: 'No thank you' }
    ]);

    // give default location as current location
    return { latitude, longitude };
  }

  // get current location
  const location = await Location.getCurrentPositionAsync({});
  if (location?.coords?.latitude !== undefined && location?.coords?.longitude !== undefined) {
    // latitude and longitude are valid so return lat and long
    latitude = location.coords.latitude;
    longitude = location.coords.longitude;
    return { latitude, longitude };
  }

  // could not access current location
  Alert.alert('Could not access current location', 'navigate to setting and allow app location permissions', [
    { text: 'OK' }
  ]);
  return { latitude, longitude };

};


const setCurrentLocation = async (mapView) => {
  // sets mapView to current location if possible, or a default location (if location settings are not enabled).

  const { latitude, longitude } = await getCurrentLatLong();

  console.log('get current lat and long returned: ' + latitude + 'and' + longitude)

  await goTo(mapView, latitude, longitude);
};


const selectMemory = async (mapView, memoryId, setCurrentMemoryDetails, setDisplayMemoryDetails, lat=0, long=0)  => {
  /* selectMemory does the following:
  - move the mapview to the location of the memory
  - set the current memory details (makes a call to request helper function to get data from backend)
  */

  // update the map to move to the memory location (optional)
  goTo(mapView, lat, long, .01, .01);


  // send request to backend (await on)
  const created_memory = await getMemoryDetails(memoryId);

  // update the memory currentMemoryDetails (used by the memory modal)
  setCurrentMemoryDetails(created_memory);

  // set displayMemoryDetails if able to retrieve all details
  setDisplayMemoryDetails(true);
}


export { ParseMemoriesDetails, fetchData, goTo, setCurrentLocation, selectMemory };

export default ParseMemoriesDetails;