import axios from 'axios';


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


const ParseMemoriesDetails = () => {

  // Make Back-end call here to get Json, and parse similarly to the mock response.
  {/*Parse memory */ }
  memories = MockResponse.memories.map((memory) => ({ latitude: memory.latitude, longitude: memory.longitude, title: memory.title }))
  error = false;

  return { memories, error }
}


const baseUrl = 'https://reqres.in'; // unify this endpoint with other hardcoded baseUrl in codebase.
axios({
  method: 'get',
  url: `${baseUrl}/api/users/1`,
}).then((response) => {
  console.log(response.data);
});

const fetchData = (URI) => {
// Invoking the get method to perform a GET request
axios.get(`${baseUrl}` + URI).then((response) => {
  console.log(response.data);
  if(response.status == 200){
    return response.data
  }else{
    console.warn('An error occurred in the fetchData function with the URI: ' + URI);
    return null;
  }
});




}




export { ParseMemoriesDetails, fetchData };

export default ParseMemoriesDetails;