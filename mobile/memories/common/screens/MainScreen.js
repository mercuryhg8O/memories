import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyMap from '../components/myMap.component';
import { useState, useEffect} from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import {ParseMemoriesDetails} from '../helpers/helpers';

function MainScreen({ navigation }) {

    // // TODO: Move memory locations from component state to context state.
    // useEffect(() => {

    //     const { memories, error } = ParseMemoriesDetails();
    //     setMemoryLocations(memories)
    // }, []);

    // [memory_locations, setMemoryLocations] = useState([]);
    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            <SearchButton/>
            <Map/>
            <Search/>
            <Profile/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default MainScreen;