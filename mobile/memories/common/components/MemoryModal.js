import React, { Component, useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView, Dimensions } from 'react-native';
import { CurrentUserContext } from '../context/contexts';
import axios from 'axios';
import {getUserData} from '../helpers/requestHelpers';

const MemoryModal = () => {

    {/* Once the  */}
    const [userName, setUserName] = useState('');
    const [memoryDescription, setMemoryDescription] = useState('');
    const [numberOfLikes, setNumberOfLikes] = useState(0)
    const [memoryTags, setMemoryTags] = useState('no tags found');
    const { displayMemoryDetails, currentMemoryDetails } = useContext(CurrentUserContext);

    // Once the displayMemoryDetails gets updated, it should parse the currentMemoryDetails object (if not empty)
    useEffect(() => {

        // check if the current memory details is populated:
        const user_name = currentMemoryDetails?.username;
        const memory_description = currentMemoryDetails?.memoryDescription;
        const number_of_likes = currentMemoryDetails?.numOfLikes;
        const tags = currentMemoryDetails?.tags;

        if(user_name !== undefined && 
            memory_description !== undefined && 
            number_of_likes !== undefined && 
            tags !== undefined){

                // all fields of the currentMemoryDetails were retrieved, so update the memory modal to use them
                setUserName(user_name);
                setMemoryDescription(memory_description);
                setNumberOfLikes(number_of_likes);
                setMemoryTags(tags);
            }else{

                console.log("A field inside of the currentMemoryDetails object was not able to be retrieved");
            }

    }, [displayMemoryDetails]);


    // ternary expression:
    //  T -> show memory modal
    //  F -> return empty view
    return (displayMemoryDetails ?
        <SafeAreaView style={styles.modal} accessibilityLabel='memory modal' accessible={true}>
            <View style={styles.content}>
                <View style={styles.iconnname}>
                    <Image style={styles.icon} />
                    <Text style={styles.name}>{userName}</Text>
                </View>
                <SafeAreaView style={styles.bioview}>
                    <Text>{memoryDescription}</Text>
                </SafeAreaView>
                <SafeAreaView style={styles.bioview}>
                    <Text>Likes: {numberOfLikes}</Text> {/* TODO: need the ability to dislike by clicking on it*/}
                </SafeAreaView>
                <SafeAreaView style={styles.bioview}>
                    <Text>Tags: {memoryTags}</Text>
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

export default MemoryModal;