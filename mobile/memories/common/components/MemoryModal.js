import React, { Component, useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Image, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native';
import { CurrentUserContext } from '../context/contexts';
import axios from 'axios';
import {getUserData} from '../helpers/requestHelpers';

// Popup that displays memory information
const MemoryModal = () => {

    const [userName, setUserName] = useState('');
    const [memoryDescription, setMemoryDescription] = useState('');
    const [numberOfLikes, setNumberOfLikes] = useState(0)
    const [liked, setLiked] = useState(false);
    const [memoryTags, setMemoryTags] = useState('no tags found');
    const { displayMemoryDetails, setDisplayMemoryDetails, currentMemoryDetails } = useContext(CurrentUserContext);

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

                console.log('oaidjosaijowniaiwj')
            }else{

                console.log("A field inside of the currentMemoryDetails object was not able to be retrieved");
            }

    }, [displayMemoryDetails || currentMemoryDetails]);

    // re-render: whenever an aspect about a memory changes
    useEffect(() => { console.log('re rendering', memoryDescription) }, [memoryDescription]);


    // ternary expression:
    //  T -> show memory modal
    //  F -> return empty view
    return (displayMemoryDetails ?
        <SafeAreaView style={styles.modal} accessibilityLabel='memory modal' accessible={true}>
            <View style={styles.content}>
                <View style={styles.iconName}>
                    <Image style={styles.icon} />
                    <Text style={styles.name}> {userName} </Text>
                </View>
                <SafeAreaView style={styles.bioView}>
                    <Text>Memory description: {memoryDescription}</Text>
                </SafeAreaView>
                <SafeAreaView style={styles.bioView}>
                    <Text>Likes: {numberOfLikes}</Text> 
                </SafeAreaView>
                <SafeAreaView style={styles.bioView}>
                    <Text>Tags: {memoryTags}</Text>
                </SafeAreaView>
                
            </View>
            <SafeAreaView>
                <TouchableOpacity onPress={()=> {
                    setLiked(!liked);
                }}>
                    <Text style={{fontSize: 30}}>{liked ? "💔" : "❤️"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> {setDisplayMemoryDetails(false)}}>
                    <Text>close memory</Text>
                </TouchableOpacity>
            </SafeAreaView>
            
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
    iconName: {
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
    bioView: {
        left: .28 * vw + 10,
        top: 30,
        width: .70 * vw - 30,
        flexGrow: 1,
        flexDirection: 'row'
    }
});

export default MemoryModal;