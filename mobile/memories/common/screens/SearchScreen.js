import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Image, SafeAreaView, FlatList, TextInput } from "react-native";
import { CurrentUserContext } from '../context/contexts';
import { useContext } from 'react';
import SearchButton from '../components/SearchButton';

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



function SearchScreen({ route /* elephant */, navigation }) {

    const [searchText, setSearchText] = useState('');

    useEffect(() => { console.log('update query: ' + searchText)
    }, [searchText]);

    // const renderUserDetails = (username) => {
    //     console.log(username)
    //     if (username === '' || username.toLowerCase().includes(searchText.toLowerCase())) {
    //         return (
    //         <View >
    //             <TouchableOpacity
    //                 onPress={() => {  navigation.navigate('MainScreen')}}
    //                 delayPressIn={100}
    //                 // style={styles.itemContainer}
    //                 >
    //                 <Text>
    //                     {username}
    //                 </Text>
    //             </TouchableOpacity>
    //         </View>)
    //     }
    // }

    const { setDisplayUser, setTargetUserUID } = useContext(CurrentUserContext);

    const createPerson = (userId) => { // TODO request info based on id
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => {
                    setTargetUserUID(userId);
                    setDisplayUser(true);
                    navigation.navigate('MainScreen');
                }}
                >
                <Image style={styles.icon}/>
                <Text
                    style={styles.itemtext}
                    >
                    Cheetah
                </Text>
            </TouchableOpacity>
        );
    }

    const createPlace = (lat, long, latDelta = 0, longDelta = 0) => {
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => {
                    // elephant
                    setDisplayUser(false);
                    navigation.navigate('MainScreen');
                }}
                >
                <Image style={styles.icon}/>
                {/* this needs to be a lil pin svg or something that we create/source from elsewhere */}
                <Text
                    style={styles.itemtext}
                    >
                    RPI Union
                </Text>
            </TouchableOpacity>
        );
    }

    const createTag = (string) => {
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => {
                    // elephant
                    setDisplayUser(false);
                    navigation.navigate('MainScreen');
                }}
                >
                <Text style={styles.tag}>#</Text>
                <Text
                    style={styles.itemtext}
                    >
                    all nighterrr
                </Text>
            </TouchableOpacity>
        );
    }

    return (
        // <SafeAreaView>
        //     <View style={{ height: '8%', width:'100%' }}>
        //         <TextInput
        //             // style={styles.input}
        //             placeholder="search person, place, or tag"
        //             onChangeText={newText => SetBuildingText(newText)}/>
        //     </View>
        //     <View style={{ height: '92%', width:'100%' }}>
        //         {/* Person */}
        //         <Text>Person</Text>
        //         <FlatList
        //             data={userMockData}
        //             showsVerticalScrollIndicator={false}
        //             renderItem={({ item, index }) => (
        //                 renderUserDetails(item.name)
        //             )}>
        //         </FlatList>
        //     </View>
        // </SafeAreaView>

        <SafeAreaView style={styles.modal}>
                {/* <SearchButton navigation={navigation}/> */}
                {/* button to navigate back to main screen */}
                <View style={styles.searchingLine}>
                    <TextInput
                        style={styles.input}
                        placeholder='What are you looking for?'
                        onChangeText={(text) => {setSearchText(text)}}
                        onSubmitEditing={() => {
                            // elephant
                            // send request to search for stuff
                            console.log('HI!');
                        }}
                    />
                    <TouchableOpacity style={styles.btn}>
                        <Text>Back</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.content}>
                    {createPerson(1234)}
                    {createPlace()}
                    {createTag()}
                </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    searchingLine: {
        flexDirection: 'row',
        left: '10%',
        width: '80%',
        top: 75,
        backgroundColor: 'cyan',
    },
    btn: {
        backgroundColor: 'lime',
        left: 10
    },
    input: {
        // borderWidth: 1,
        width: '70%',
        fontSize: 15,
        backgroundColor: 'azure',
        left: 0
    },
    modal: {
        height: '100%',
        width: '100%',
        backgroundColor:'white'
    },
    content: {
        top: 100,
        left: '10%',
        width: '80%',
        display: 'flex',
        flexDirection: 'column'
    },
    item:{
        flexDirection: 'row',
    },
    itemtext: {
        fontSize: 15,
    },
    icon: {
        backgroundColor: 'purple',
        width: 40, height: 40, // make sure these values are the same
        borderRadius: 50,
    },
    tag: {
        fontSize: 50
    }
});

export default SearchScreen;