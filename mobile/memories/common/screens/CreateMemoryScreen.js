import { useState, useEffect, createContext, useContext, } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Alert, Image, TouchableOpacity, Dimensions } from 'react-native';
import CustomInput from '../components/customInput.component';
import CustomButton from '../components/customButton.component';
import { CurrentUserContext } from '../context/contexts';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { createUserSuccessful } from '../helpers/requestHelpers';

import * as ImagePicker from 'expo-image-picker';

const CreateMemoryScreen = ({ navigation }) => {
    const { setCurrentUser } = useContext(CurrentUserContext);

    // handle log in functionality and only pass up the user name
    [userName, setUserName] = useState('');
    [password, SetPassword] = useState('');
    [email, SetEmail] = useState('');
    [bio, setBio] = useState('');

    const attemptSignUp = () => {

        if(userName === ''){
            Alert.alert('Enter userName', 'login requires userName', [
                {text: 'OK'},
              ]);
        } else if(email === ''){
            Alert.alert('Enter email', 'login requires email', [
                {text: 'OK'},
              ]);
        } else if(password === ''){
            Alert.alert('Enter password', 'login requires password', [
                {text: 'OK'},
              ]);
        } else{

            // create and login user if possible
            createUserSuccessful(userName, email, password, bio).then((userLoginStatus) => {
                if(userLoginStatus){ // valid login

                    // should parse request for userid to make future requests
                    setCurrentUser(email); // save email for future requests (temporary solution)
                    navigation.navigate('MainScreen'); // navigate to map
                }else{
                    console.warn('no account exists with that email & password.');
                }
            }).catch(
                (err) => {console.log(err)});

            if (true){ // valid login (replace with request)
                navigation.navigate('MainScreen'); // navigate to map
                setCurrentUser(userName); // save username for future requests
            } else{
                console.warn('cannot create an account with that information.')
                // TODO: parse to provide informative error of why account creation didn't succeed
            }
        }
    }

    const [userIcon, setUserIcon] = useState('https://cdn-icons-png.flaticon.com/512/3177/3177440.png');

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1
        });

        if (!result.canceled) {
            setUserIcon(result.assets[0].uri);
        } else {
            alert("pick an image dude");
        }
    };

    return <View style={styles.container}>

        <SafeAreaView >

            
        <View /* memory description container */ style={styles.inputContainer}>
                <CustomInput
                    placeholder={'memory description goes here'}
                    setValue={setUserName}
                    isMuliLine={true}
                    label={'memory description input field'}
                    />
            </View>

            <View /* Logo container */ style={styles.logo_container}>
                <TouchableOpacity onPress={pickImageAsync}>
                    <Image
                        style={styles.logo}
                        source={{
                            uri: userIcon,
                        }}
                    />
                </TouchableOpacity>
            </View>




            <View /* Tag & create memory container */ style={styles.inputContainer}>
                <CustomInput
                    placeholder={'tags'}
                    setValue={setUserName}
                    label={'tags input field'}
                    />
                <CustomButton
                    placeholder={'Create Memory'}
                    onPress={() => {console.log('should create a memory')}}
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
        paddingTop: .05*vh,
    },
    logo: {
        width: .25*vh, height: .25*vh,
        borderRadius: 100
    },
    inputContainer: {
        paddingTop: .05*vh,
        alignItems: "center",
        gap: 0.025*vh,
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