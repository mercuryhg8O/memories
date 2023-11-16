import React, { Component, useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { CurrentUserContext } from '../context/contexts';
import axios from 'axios';
import {getUserData, followUser } from '../helpers/requestHelpers';

const Profile = () => {

    {/* Once the  */}
    const [userName, setUserName] = useState('');
    const [userBio, setUserBio] = useState('');
    const { displayUser, targetUserUID, currentUserID } = useContext(CurrentUserContext);

    // Once the targetUserUID gets updated, a request to get the profile of the targetUserUID is created
    // and the username and bio information gets updated.
    useEffect(()=>{
        const getUserProfileData = async () => {
            const {userid, username, bio} = await getUserData(targetUserUID);

            if(!userid){
                console.log('error parsing response from request for profile with uid: ' + targetUserUID);
            }else{
                // response was valid, so parse and save the output
                console.log(userid);
                console.log(username);
                console.log(bio);
                setUserName(username);
                setUserBio(bio);
            }
        }
        getUserProfileData();
    }, [targetUserUID]);



    // ternary expression:
    //  T -> show profile modal
    //  F -> return empty view
    return (displayUser ?
        <SafeAreaView style={styles.modal} accessibilityLabel='User profile' accessible={true}>
            <View style={styles.content}>
                <View style={styles.iconnname}>
                    <Image style={styles.icon} />
                    <Text style={styles.name}>{userName + '#' + targetUserUID}</Text>
                </View>
                <SafeAreaView style={styles.bioview}>
                    <Text>{userBio}</Text>
                </SafeAreaView>

                <SafeAreaView style={styles.bioview}>
                    <TouchableOpacity onPress={()=> {followUser(currentUserID, targetUserUID)}}>
                        <Text>follow user</Text>
                    </TouchableOpacity>
                    
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