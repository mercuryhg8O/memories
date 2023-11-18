import { useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, FlatList, TouchableOpacity, SafeAreaView, ScrollView, View } from 'react-native';
import { CurrentUserContext } from '../context/contexts.js';
import { Image, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomInput from '../components/customInput.component.js';
import CustomButton from '../components/customButton.component.js';
import {getUserData } from '../helpers/requestHelpers.js';
import Accordion from 'react-native-collapsible/Accordion'


// https://blog.logrocket.com/building-react-native-collapsible-accordions/
// ctrl+f "Now, add the following code to your App.tsx file:" to zoom to the section we're looking at
function SettingsScreen({ navigation }) {

    const [activeSections, setActiveSections] = useState([]);
    const { setDisplayMemoryDetails, setDisplayUser, setTargetUserUID } = useContext(CurrentUserContext);
    
    const userMockData = {
        users: [
            {
                username: 'Cheeta',
                userid: '1234'
            },
            {
                username: 'Dratini',
                userid: '3542'
            },
            {
                username: 'ShawnMendez',
                userid: '9999'
            },
        ]
    }
    
    // returns an instance of a user to be displayed as a search option
    const userDetails = (username, userId) => { // TODO request info based on id
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => {
                    setTargetUserUID(userId);
                    setDisplayUser(true);
                    setDisplayMemoryDetails(false);
                    navigation.navigate('MainScreen');
                }}
            >
                <Image style={styles.icon} />
                <Text
                    style={styles.itemtext}
                >
                    {username}#{userId}
                </Text>
            </TouchableOpacity>
        );
    }

    const sectionContent = (data) => {
        return (
            <Text style={styles.textFollowType}>
                <FlatList
                    data={data}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        userDetails(item.username, item.userid)
                    )}
                >
                </FlatList>

            </Text>
        );
    }

    const sections = [
        {
            title: 'Mutuals',
            content: sectionContent(userMockData.users)
        },
        {
            title: 'Followers',
            content: sectionContent(userMockData.users)
        },
        {
            title: 'Following',
            content: sectionContent(userMockData.users)
        }
    ];

    const renderHeader = (section, _, isActive) => {
        return (
            <View style={styles.accordHeader}>
                <Text style={styles.aHeadText}>{section.title}</Text>
            </View>
        );
    }

    const renderContent = (section, _, isActive) => {
        return (
            <View style={styles.accordCtnt}>
                {section.content}
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>My Account</Text>
            <View style={styles.container}>
                <Accordion
                    align='bottom'
                    sections={sections}
                    activeSections={activeSections}
                    renderHeader={renderHeader}
                    renderContent={renderContent}
                    onChange={(sections) => {
                        setActiveSections(sections);
                    }}
                    sectionContainerStyle={styles.accordCtnr}
                    underlayColor='#dba7c3'
                />
            </View>
        </SafeAreaView>
    );
}

const vh = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        gap: 0.01*vh,
        width: '100%',
        backgroundColor: '#dba7c3'
    },
    heading: {
        fontSize: 30,
        marginTop: .05*vh,
        marginBottom: .01*vh,
        alignSelf: 'center',
        color: 'white',
    },
    accordCtnr: {
        paddingBottom: 4
    },
    accordHeader: {
        left: '10%',
        width: '80%',
        padding: 10,
        height: 'auto',
        borderRadius: 100,
        backgroundColor: '#c5effc'
    },
    aHeadText: {
        fontSize: 20,
        alignSelf: 'center',
    },
    accordCtnt: {
        width: '80%',
        left: '10%',
    },
    item: {
        
    },
    textFollowType: {
        fontSize: 20,
    },
    item: {
        flexDirection: 'row',
        margin: 8,
        borderRadius: 12 / 1.25,
        backgroundColor: '#ededed'
    },
    itemtext: {
        fontSize: 15,
    },
    icon: {
        backgroundColor: 'purple',
        width: 40, height: 40, 
        borderRadius: 50,
    },
    
});

export default SettingsScreen;