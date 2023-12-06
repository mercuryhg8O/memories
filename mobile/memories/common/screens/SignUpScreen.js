import { useState, useEffect, createContext, useContext, } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView, Alert, Image, TouchableOpacity, Dimensions } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { CurrentUserContext } from '../context/contexts';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { createUserSuccessful } from '../helpers/requestHelpers';

import * as ImagePicker from 'expo-image-picker';

// Screen for signing up for an account
const SignUpScreen = ({ navigation }) => {
    const { setCurrentUser, setTargetUserUID } = useContext(CurrentUserContext);

    // handle log in functionality and only pass up the user name
    [userName, setUserName] = useState('');
    [password, SetPassword] = useState('');
    [email, SetEmail] = useState('');
    [bio, setBio] = useState('');

    const attemptSignUp = () => {

        if (userName === '') {
            Alert.alert('Enter userName', 'login requires userName', [
                { text: 'OK' },
            ]);
        } else if (email === '') {
            Alert.alert('Enter email', 'login requires email', [
                { text: 'OK' },
            ]);
        } else if (password === '') {
            Alert.alert('Enter password', 'login requires password', [
                { text: 'OK' },
            ]);
        } else {

            // create and login user if possible
            console.log('attempting to call createUserSuccessful with the username of: ', userName)

            createUserSuccessful(userName, email, password, bio).then((userLoginStatus) => {


                console.log('createUserSuccessful:', userLoginStatus)
                if (userLoginStatus.created_account && userLoginStatus.userId !== undefined) { // valid login

                    // should parse request for userid to make future requests
                    console.log('setting current user to: ', userLoginStatus.userId);
                    setCurrentUser(userLoginStatus.userId);
                    setTargetUserUID(userLoginStatus.userId);

                    navigation.navigate('MainScreen'); // navigate to map
                } else {
                    console.warn('could not create an account with that email & password.');
                }
            }).catch(
                (err) => { console.log(err) });

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
            <ScrollView>

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

                <View /* Registration container */ style={styles.inputContainer}>
                    <CustomInput
                        placeholder={'username'}
                        setValue={setUserName}
                        label={'Username input field'}
                    />
                    <CustomInput
                        placeholder={'email'}
                        setValue={SetEmail}
                        label={'Email input field'}
                    />
                    <CustomInput
                        placeholder={'password'}
                        setValue={SetPassword}
                        label={'Password input field'}
                    />
                    <CustomInput
                        placeholder={'[optional]Bio  '}
                        setValue={setBio}
                        isMultiLine={true}
                        label={'Bio input field'}
                        selectTextOnFocus={true}
                    />
                    <CustomButton
                        placeholder={'Create Account'}
                        onPress={() => attemptSignUp()}
                        button_type={styles.createAccountBtn}
                        label={'Create account button'}

                    />

                </View>


                <View style={{ height: 200 }} />

            </ScrollView>

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
        borderRadius: 100
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

export default SignUpScreen;