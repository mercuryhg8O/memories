import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { ParseMemoriesDetails } from '../helpers/helpers';
import { StatusBar } from 'expo-status-bar';
import SearchButton from '../components/SearchButton.js';
import Map from '../components/Map';
import Profile from '../components/Profile';
import MemoryModal from '../components/MemoryModal.js'
import { CurrentUserContext } from '../context/contexts';
import NavigationButton from '../components/NavigationButton.js'


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
            {/* <View style={{backgroundColor: 'black', width: '100%', flexDirection: 'row'}}>
                need to hardcode real user ids from the database once we have those
                <TestingProfileButton navigation={navigation} userId={1234}/>
                <TestingProfileButton navigation={navigation} userId={2341}/>
                <TestingProfileButton navigation={navigation} userId={3412}/>
                <TestingProfileButton navigation={navigation} userId={4123}/>
                <Text style={{color: 'white', top: 10, left: 10}}>For demo only</Text>
             </View> */}

            <View /* Buttons for navigation*/ style={styles.navbar}>
                {/* Temporary: the navigateTo is set to the screen name as defined in nav */}
                <NavigationButton navigation={navigation} navigateTo={'Search'}/>
                <NavigationButton navigation={navigation} navigateTo={'UserScreen'}/>
                <NavigationButton navigation={navigation} navigateTo={'CreateMemory'}/>
                <TouchableOpacity><Text> navigate to current location</Text></TouchableOpacity>
            </View>


            <Map
                navigation={navigation}
                memory_locations={memory_locations} />
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
        // position: 'absolute',
        // top: 50, bottom: 20,
        width: '100%',
        height: '5%',
        alignContent: 'center',
        flexDirection: 'row'
    }
});

export default MainScreen;