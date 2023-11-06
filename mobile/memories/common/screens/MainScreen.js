import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { ParseMemoriesDetails } from '../helpers/helpers';
import { StatusBar } from 'expo-status-bar';
import SearchButton from '../components/SearchButton.js';
import TestingProfileButton from '../components/TestingProfileButton.js';
import Map from '../components/Map';
import Search from '../components/Search';
import Profile from '../components/Profile';
import { CurrentUserContext } from '../context/contexts';


// Main page
function MainScreen({ navigation }) {

    const { displayUser, setDisplayUser } = useContext(CurrentUserContext);

    useEffect(() => {
        const { memories, error } = ParseMemoriesDetails();
        setMemoryLocations(memories)
    }, []);
    [memory_locations, setMemoryLocations] = useState([]);

    const displayUserModal = () => {
        console.log('sleep, my bestie');
        setDisplayUser(true);
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            {/* Buttons for interim demo only */}
            <View style={{backgroundColor: 'black', width: '100%', flexDirection: 'row'}}>
                {/* need to hardcode real user ids from the database once we have those */}
                <TestingProfileButton navigation={navigation} userId={1234}/>
                <TestingProfileButton navigation={navigation} userId={2341}/>
                <TestingProfileButton navigation={navigation} userId={3412}/>
                <TestingProfileButton navigation={navigation} userId={4123}/>
                <Text style={{color: 'white', top: 10, left: 10}}>For demo only</Text>
            </View>
            <Map memory_locations={memory_locations} />
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