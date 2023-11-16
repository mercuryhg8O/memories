import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView, Image, SafeAreaView, FlatList, TextInput, Dimensions } from "react-native";
import { CurrentUserContext } from '../context/contexts';
import { useContext } from 'react';
import SearchButton from '../components/SearchButton';
import { goTo } from '../helpers/helpers'

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

const placeMockData = {
    places: [
        {
            title: 'Troy',
            latitude: 42.0,
            longitude: 42.0,
            latitudeDelta: 1.00,
            longitudeDelta: 1.0421,
        },
        {
            title: 'Cali',
            latitude: 100.0,
            longitude: 10.2,
            latitudeDelta: 1.00,
            longitudeDelta: 1.0421,
        },
        {
            title: 'France',
            latitude: 10.2,
            longitude: 42.2,
            latitudeDelta: 1.00,
            longitudeDelta: 1.0421,
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

export const SearchCriteria = {
    name: 'people by name',
    id: 'people by id',
    place: 'places',
    tag: 'tags'
}

const SearchScreen = ({ navigation }) => {

    // CONTEXTS:
    const { mapView, setDisplayUser, setTargetUserUID } = useContext(CurrentUserContext);

    const [searchCriteria, setSearchCriteria] = useState(SearchCriteria.name);
    const [searchText, setSearchText] = useState('');

    // USE EFFECTS    
    useEffect(() => {
        console.log('update query: ' + searchText)
    }, [searchText]);


    // COMPONENTS

    // A button for selecting a search criteria
    const SelectFocusButton = ({criteriaName}) => {
        return (
            <TouchableOpacity style={styles.btnContainer}
            onPress={() => {setSearchCriteria(criteriaName)}}>
                <Text>{criteriaName}</Text>
            </TouchableOpacity>
        )
    }

    // returns an instance of a user to be displayed as a search option
    const userDetails = (username, userId) => { // TODO request info based on id
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => {
                    setTargetUserUID(userId);
                    setDisplayUser(true);
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

    // returns a list of user instances to select to be displayed
    const SearchUsersView = () => {
        return (
            <View style={styles.criteria_view}>
                <FlatList
                    data={userMockData.users}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        userDetails(item.username, item.userid)
                    )}>
                </FlatList>
    
            </View>);
    };

    // returns an instance of a place to be displayed as a search option
    const placeDetails = (lat, long, latDelta = 0, longDelta = 0) => { // TODO request info based on id
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => {
                    setDisplayUser(false);
                    console.log(lat, long)
                    goTo(mapView, lat, long);
                    // setCurrentLocation()
                    navigation.navigate('MainScreen');
                }}>
                <Image style={styles.icon} />
                <Text style={styles.itemtext}>
                    Place 
                </Text>
            </TouchableOpacity>
        );
    }

    // returns a list of places instances to select to be displayed
    const SearchPlacesView = () => {
        return (
            <View style={styles.criteria_view}>
                <FlatList
                    data={placeMockData.places}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        placeDetails(item.latitude, item.longitude)
                    )}>
                </FlatList>
    
            </View>);
    };

    // returns an instance of a user to be displayed as a search option
    const tagDetails = (tagTitle) => { // TODO request info based on id
        return (
            <TouchableOpacity
                style={styles.item}
                onPress={() => {
                    setDisplayUser(false);
                    navigation.navigate('MainScreen');
                }}>
                <Image style={styles.icon} />
                <Text
                    style={styles.itemtext}
                >
                    {tagTitle}
                </Text>
            </TouchableOpacity>
        );
    }

    // returns a list of user instances to select to be displayed
    const SearchTagsView = () => {
        return (
            <View style={styles.criteria_view}>
                <FlatList
                    data={tagMockData.tags}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => (
                        tagDetails(item.title)
                    )}>
                </FlatList>
    
            </View>);
    };

    const DisplayBasedOnCriteria = () => {

        switch (searchCriteria) {
            case SearchCriteria.name:
                return (<SearchUsersView/>);
            case SearchCriteria.id:
                return (<SearchUsersView/>);
            case SearchCriteria.place:
                return (<SearchPlacesView/>);
            case SearchCriteria.tag:
                return (<SearchTagsView/>);
            default:
                return (<SearchUsersView/>);
        }
    };


    return (

        <SafeAreaView style={styles.modal}>
            {/* Search View*/}
            <View style={{ height: '10%', width: '100%' }}>
                <TextInput
                    style={styles.input_alt}
                    placeholder='What are you looking for?'
                    onChangeText={newText => setSearchText(newText)}
                    onSubmitEditing={() => {
                        // elephant
                        // send request to search for stuff
                        console.log('HI!');
                    }} />
            </View>

            {/* view to select what should be searched (e.g. user, place, tag*/}
            <View style={{ height: '7%', width: '100%' }}>
                    <Text>Search By: {searchCriteria}</Text>
                    <ScrollView horizontal={true} >
                        {/* Set all the following to change the search criteria 
                        (use an on effect to create a request for back-end contents)
                        Must be a valid criteria */}
                        <SelectFocusButton criteriaName={SearchCriteria.name}/>
                        <SelectFocusButton criteriaName={SearchCriteria.id}/>
                        <SelectFocusButton criteriaName={SearchCriteria.place}/>
                        <SelectFocusButton criteriaName={SearchCriteria.tag}/>
                    </ScrollView>
            </View>


            <View style={styles.content}>
                {/* set view to be conditional set by searchCriteria*/}
                {/* <SearchPlacesView/> */}
                <DisplayBasedOnCriteria/>
            </View>

        </SafeAreaView>
    );
}


const vw = Dimensions.get('window').width;

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
        backgroundColor: 'white'
    },
    content: {
        top: 10,
        left: '10%',
        width: '80%',
        display: 'flex',
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
        width: 40, height: 40, // make sure these values are the same
        borderRadius: 50,
    },
    tag: {
        fontSize: 50
    },
    input_alt: {
        flex: 1,
        margin: 12,
        borderWidth: 1,
        borderRadius: 12 / 1.25,
        padding: 10,
    },
    select_area_view: {
        flex: 1,
        flexDirection: 'row',
    },
    btnContainer: {
        flex:1,
        width: vw / 4,
        backgroundColor: "#dba7c3",
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    criteria_view: {
        height: '83%',
    }

});

export default SearchScreen;