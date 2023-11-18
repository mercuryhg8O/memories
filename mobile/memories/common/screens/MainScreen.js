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
    [memory_locations, setMemoryLocations] = useState([]);

    useEffect(() => {

        console.log("hiihihihoihoihoio", currentUserID, targetUserUID);



        const setMapInfo = () => {

            ParseMemoriesDetails(currentUserID, targetUserUID).then(({memories, error}) => {

                if(error){
                    console.log('an error happened when parsing route info')
                }
                else{
                    setMemoryLocations(memories);
                }
            }).catch(() => {console.log('there was an error while trying to retrieve the memories from memory list parser')});


        }

        setMapInfo();


    }, [targetUserUID]);
    

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
                <NavigationButton label="🔍" accLabel="Search" navigation={navigation} navigateTo={'Search'}/>
                <NavigationButton label="➕" accLabel="Create Memory" navigation={navigation} navigateTo={'CreateMemory'}/>
                <NavigationButton label="⚙️" accLabel="Settings" navigation={navigation} navigateTo={'SettingsHome'}/>
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