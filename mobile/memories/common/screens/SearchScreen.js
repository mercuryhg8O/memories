import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, SafeAreaView, FlatList, TextInput } from "react-native";
import axios from 'axios';


const userMockData = {
    users: [
        {
            name: 'Cheeta'
        },
        {
            name: 'Cheata'
        },
        {
            name: 'Chetata'
        },
    ]
}

const placeMockData = {
    places: [
        {
            title: 'Troy'
        },
        {
            title: 'Cali'
        },
        {
            title: 'France'
        },
    ]
}


const tagMockData = {
    tags: [
        {
            title: '#tag1'
        },
        {
            title: '#tag2'
        },
        {
            title: '#tag3'
        },
    ]
}



function SearchScreen({ route, navigation }) {


    const [searchText, setSearchText] = useState('');
    const [buildingNames, setBuildingNames] = useState([]);


    useEffect(() => { console.log('update the search details')
    }, []);

    const renderUserDetails = (username) => {
        console.log(username)
        if (username === '' || username.toLowerCase().includes(searchText.toLowerCase())) {
            return (
            <View >
                <TouchableOpacity
                    onPress={() => {  navigation.navigate('MainScreen')}}
                    delayPressIn={100}
                    style={styles.itemContainer}>
                    <Text>
                        {username}
                    </Text>
                </TouchableOpacity>
            </View>)
        }
    }



    return (
        <SafeAreaView>
            <View style={{ height: '8%', width:'100%' }}>
                <TextInput 
                    style={styles.input}
                    placeholder="search person, place, or tag"
                    onChangeText={newText => SetBuildingText(newText)}/>
            </View>
            <View style={{ height: '92%', width:'100%' }}>
                {/* Person */}
                <Text>Person</Text>
                <FlatList
                    data={userMockData}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        renderUserDetails(item.name)
                    )}>
                </FlatList>
            </View>
        </SafeAreaView>
    );
}
export default SearchScreen;