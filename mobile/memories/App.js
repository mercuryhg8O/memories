import { useState, useEffect} from 'react';
import MapView from 'react-native-maps';
import MyMap from './common/components/myMap.component';
import ParseMemoriesDetails from './common/helpers';
import { StyleSheet, View } from 'react-native';



export default function App() {
  
  [memory_locations, setMemoryLocations] = useState([]);
  


  useEffect(() => {

    const { memories, error } = ParseMemoriesDetails();
    setMemoryLocations(memories)
  }, []);



  return (
    <View style={styles.container}>
      <MyMap style={{flex:2}} memory_locations={memory_locations}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});