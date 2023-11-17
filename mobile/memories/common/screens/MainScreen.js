import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { ParseMemoriesDetails, getCurrentLatLong, goTo } from '../helpers/helpers';
import { StatusBar } from 'expo-status-bar';
import SearchButton from '../components/SearchButton.js';
import Map from '../components/Map';
import Profile from '../components/Profile';
import MemoryModal from '../components/MemoryModal.js'
import { CurrentUserContext } from '../context/contexts';
import NavigationButton from '../components/NavigationButton.js'


// Main page
function MainScreen({ navigation }) {

    const { mapView, displayUser, setDisplayUser, currentUserID, targetUserUID } = useContext(CurrentUserContext);

    useEffect(() => {

        ParseMemoriesDetails(currentUserID, targetUserUID).then().catch(() => {console.log('there was an error while trying to retrieve the memories')});

        // const { memories, error } = 
        setMemoryLocations(memories)
    }, [targetUserUID]);
    [memory_locations, setMemoryLocations] = useState([]);

    const displayUserModal = () => {
        console.log('sleep, my bestie');
        setDisplayUser(true);
    }

    return (
        <View style={styles.container}>
            <StatusBar style="auto" />
            {/* Buttons for interim demo only */}
            {/* <View style={{backgroundColor: 'black', width: '100%', flexDirection: 'row'}}>
                need to hardcode real user ids from the database once we have those
                <TestingProfileButton navigation={navigation} userId={1234}/>
                <TestingProfileButton navigation={navigation} userId={2341}/>
                <TestingProfileButton navigation={navigation} userId={3412}/>
                <TestingProfileButton navigation={navigation} userId={4123}/>
                <Text style={{color: 'white', top: 10, left: 10}}>For demo only</Text>
             </View> */}

            <Map
                navigation={navigation}
                memory_locations={memory_locations} />
            <View /* Buttons for navigation*/ style={styles.navbar}>
                {/* Temporary: the navigateTo is set to the screen name as defined in nav */}
                <NavigationButton label="?" navigation={navigation} navigateTo={'Search'}/>
                <NavigationButton label="_" navigation={navigation} navigateTo={'UserScreen'}/>
                <NavigationButton label="+" navigation={navigation} navigateTo={'CreateMemory'}/>
                {/* <TouchableOpacity
                    onPress={() => {
                        const {lat, long} =  getCurrentLatLong();
                        goTo(mapView, lat, long);
                    }}
                    >
                    <Text> navigate to current location</Text>
                </TouchableOpacity> */}
            </View>
            <Profile/>
            <MemoryModal/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    navbar: {
        position: 'absolute',
        left: '87%',
        top: 10,
        width: '10%',
        gap: 10,
        height: 'auto',
        alignContent: 'center',
        flexDirection: 'column'
    }
});

export default MainScreen;