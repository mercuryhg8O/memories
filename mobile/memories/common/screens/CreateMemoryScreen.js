import { useState, useEffect, createContext, useContext, } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Alert, Image, TouchableOpacity, Dimensions } from 'react-native';
import CustomInput from '../components/customInput.component';
import CustomButton from '../components/customButton.component';
import Dropdown from '../components/Dropdown';
import { CurrentUserContext } from '../context/contexts';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { createMemorySuccessful } from '../helpers/requestHelpers';
import {setCurrentLocation} from '../helpers/helpers';

import * as ImagePicker from 'expo-image-picker';

const Visibility = {
    PRIVATE: 'Private',
    MUTUALS: 'Mutuals',
    PUBLIC: 'Public'
}

const CreateMemoryScreen = ({ navigation }) => {
    const { currentUserID, mapView } = useContext(CurrentUserContext);

    // the information required for creating a post
    const [memoryDescription, setMemoryDescription] = useState('');
    const [memoryVisibility, setMemoryVisibility] = useState(Visibility.PUBLIC);
    const [memoryImage, setMemoryImage] = useState('https://cdn-icons-png.flaticon.com/512/3177/3177440.png');
    const [memoryTags, setMemoryTags] = useState('');
    

    const attemptMemoryCreation = async () => {
        console.log('attempting to create a memory')

        if (memoryDescription === '') {
            // memory did not include a description - let the user know that it's required.
            Alert.alert('Enter memory description', 'creating a memory requires memory description', [
                { text: 'OK' },
            ]);
        } else {

            // create request to back end to create a memory
            const created_memory = await createMemorySuccessful();
            if(created_memory){
                // created a memory, should move the mapview to the 
                // users current location (aka where the memory was made)
                await setCurrentLocation(mapView);
                console.log('created a memory');
                
            }else{
                console.log('could not create a memory - please check the logs.');
            }
        }
    }

    

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1
        });

        if (!result.canceled) {
            setMemoryImage(result.assets[0].uri);
        } else {
            alert("pick an image dude");
        }
    };

    const data = [
        {label: Visibility.PRIVATE, value: Visibility.PRIVATE},
        {label: Visibility.MUTUALS, value: Visibility.MUTUALS},
        {label: Visibility.PUBLIC, value: Visibility.PUBLIC},
    ];

    return <View style={styles.container}>

        <SafeAreaView >
            <View /* memory description container */ style={styles.inputContainer}>
                <CustomInput
                    placeholder={'memory description goes here'}
                    setValue={setMemoryDescription}
                    isMuliLine={true}
                    label={'memory description input field'}/>
            </View>


            <View /* image selector container */ style={styles.logo_container}>
                <TouchableOpacity onPress={pickImageAsync}>
                    <Image
                        style={styles.logo}
                        source={{
                            uri: memoryImage,
                        }}/>
                </TouchableOpacity>
            </View>


            <View /* visibility, tag & create memory button container */ style={styles.inputContainer}>
                {/* TODO: replace with drop down */}
                <Dropdown label="Select visibility" data={data} onSelect={setMemoryVisibility}/>
                <CustomInput
                    placeholder={'tags'}
                    setValue={setMemoryTags}
                    label={'tags input field'}
                />
                <CustomButton
                    placeholder={'Create Memory'}
                    onPress={() => { attemptMemoryCreation() }}
                    button_type={styles.createAccountBtn}
                    label={'Create Memory button'}
                />
            </View>

        </SafeAreaView>
    </View>
};

const vh = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#c5effc',
    },
    safe_container: {
        flex: 1,
        flexDirection: 'column',
    },
    logo_container: {
        alignItems: "center",
        paddingTop: .05 * vh,
    },
    logo: {
        width: .25 * vh, height: .25 * vh,
        borderRadius: 35
    },
    inputContainer: {
        paddingTop: .05 * vh,
        alignItems: "center",
        gap: 0.025 * vh,
    },

    createAccountBtn: {
        backgroundColor: '#45d9a8',
        width: '80%',
        borderColor: '#57ab8f',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: "center",
    },
});

export default CreateMemoryScreen;