
const MockResponse = {
    "memories": [
      {
        "title": "Place 1",
        "latitude": 42.72975825494276,
        "longitude": -73.67830944235584
      },
      {
        "title": "Union",
        "latitude": 42.72993893531263,
        "longitude": -73.676754972665
      },
    ]
  }
  
  
  const ParseMemoriesDetails = () => {
  
    // Make Back-end call here to get Json, and parse similarly to the mock response.
    {/*Parse memory */ }
    memories = MockResponse.memories.map((memory) => ({ latitude: memory.latitude, longitude: memory.longitude, title: memory.title}))
    error = false;
  
    return { memories, error }
  }
  
  
  
  export default ParseMemoriesDetails;