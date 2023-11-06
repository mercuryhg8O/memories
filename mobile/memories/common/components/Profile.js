import React, { Component, useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView, Dimensions } from 'react-native';
import { CurrentUserContext } from '../context/contexts';
import axios from 'axios';

const Profile = () => {

    {/* Once the  */}
    const [userName, setUserName] = useState('');
    const [userBio, setUserBio] = useState('');
    const { displayUser, targetUserUID, endpointURL } = useContext(CurrentUserContext);
    useEffect(()=>{}, [userName]);

    // once a new userUID is selected, then a request should be made to gather data about the user
    useEffect(()=>{}, [targetUserUID]);
    const requestUserData = async () => {
        // creates a request for the user data once 
        const query_string = `userdetails/?username=${targetUserUID}`
        const response = await axios.get(endpointURL + query_string).catch((err) => {
            console.log('error during retrieval of when getting response: ', err);
            return true;
        });

        const userName = response.data.username;
        const userBio = response.data.bio;
        setUserName(userName);
        setUserBio(userBio);
    }


    // ternary expression:
    //  T -> show user modal
    //  F -> return empty view
    return (displayUser ?
        <SafeAreaView style={styles.modal} accessibilityLabel='User profile' accessible={true}>
            <View style={styles.content}>
                <View style={styles.iconnname}>
                    <Image style={styles.icon} />
                    <Text style={styles.name}>{userName + "#" + targetUserUID}</Text>
                </View>
                <SafeAreaView style={styles.bioview}>
                    <Text>{userBio}</Text>
                </SafeAreaView>
            </View>
        </SafeAreaView> : <View></View>
    );
};

const vw = Dimensions.get('window').width;

const styles = StyleSheet.create({
    modal: {
        height: '30%',
        width: '100%',
        marginTop: 'auto',
        backgroundColor: 'white',
    },
    content: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column'
    },
    iconnname: {
        left: .08 * vw,
        top: .05 * vw,
        flexDirection: 'row'
    },
    icon: {
        backgroundColor: 'purple',
        width: .20 * vw, height: .20 * vw, // make sure these values are the same
        borderRadius: 50,
    },
    name: {
        fontSize: 30,
        top: 40,
        left: 10
    },
    bioview: {
        left: .28 * vw + 10,
        top: 30,
        width: .70 * vw - 30,
        flexGrow: 1,
        flexDirection: 'row'
    }
});

export default Profile;