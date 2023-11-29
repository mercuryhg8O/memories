import { useState, useEffect, createContext, useContext, } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, Alert, Dimensions, ScrollView } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { CurrentUserContext } from '../context/contexts';
import axios from 'axios';
import { isValidUser } from '../helpers/requestHelpers';

// Screen for login
const SignInScreen = ({ navigation }) => {
    const { setCurrentUser } = useContext(CurrentUserContext);

    // handle log in functionality and only pass up the user name
    [email, setemail] = useState('');
    [password, SetPassword] = useState('');
    [loginInValid, setLoginValid] = useState(false);

    // attempt to log in function that creates back-end request
    const attemptLogin = () => {
        if(email === ''){
            Alert.alert('Enter email', 'login requires email', [
                {text: 'OK'},                
              ]);
        } else if(password === ''){
            Alert.alert('Enter password', 'login requires password', [
                {text: 'OK'},                
              ]);
        } else{
            
            // if the user exists, then they should be loggedin
            isValidUser(email, password).then((userLoginStatus) => {
                if(userLoginStatus.signed_in_worked){ // valid login

                    // should parse request for userid to make future requests
                    // setCurrentUser(email); // save email for future requests (temporary solution)
                    console.log('id set:', userLoginStatus.userId);
                    setCurrentUser(userLoginStatus.userId); // set user context to MongoDB user ids instead
                    navigation.navigate('MainScreen'); // navigate to map
                } else {
                    console.warn('no account exists with that email & password.');
                }
            }).catch(
                (err) => {console.log(err)});
        }
    }

    //this function encapsulates error messages for bad attempts
    const AlertHelper = ( message) => {
        Alert.alert('Alert', message, [
            {text: 'OK'},                
          ]);
    }

    return <View style={styles.container}>
        <ScrollView>
        <SafeAreaView >
            <View /* Logo container */ style={styles.logo_container}>
                <Image
                    style={styles.logo}
                    source={{
                        uri: 'https://as1.ftcdn.net/v2/jpg/01/04/73/84/1000_F_104738464_uK24Z5qUllReax2nCDZ0HQiVINOf1k7m.jpg',
                    }}
                />
                <View style={styles.logo_text}>
                    <Text style={{ fontSize: 20 }}>
                        Welcome to
                    </Text>
                    <Text style={{ fontSize: 40 }}>
                        Memories
                    </Text>
                </View>
            </View>

            <View /* Registration container */ style={styles.inputContainer}>
                <CustomInput placeholder={'email'} setValue={setemail} label={'Email input field'} />
                <CustomInput placeholder={'password'} setValue={SetPassword} label={'Password input field'} />
                <CustomButton placeholder={'Forgot Password'}  onPress={() => AlertHelper('forgot password, not implemented yet')} text_type={{ color: '#858585' }} label={'Forgot password button'} />
                <CustomButton placeholder={'Login'} onPress={() => attemptLogin()} button_type={styles.loginBtn} label={'Login button'} />
                <CustomButton placeholder={'Sign Up'} onPress={() => navigation.navigate('SignUp')} button_type={styles.signUpBtn} label={'Sign up button'} />
            </View>
        </SafeAreaView>
        </ScrollView>
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
        justifyContent: 'center'
    },
    logo_container: {
        alignItems: "center",
        paddingTop: .1*vh,
    },
    logo: {
        width: .15*vh, height: .15*vh,
        borderRadius: 100,
    },
    logo_text: {
        alignItems: "center",
        top: .03*vh,
    },
    inputContainer: {
        top: 0.05*vh,
        alignItems: "center",
        gap: .03*vh,
    },

    loginBtn: { // login button
        backgroundColor: '#45d9a8',
        width: '80%',
        borderColor: '#57ab8f',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: "center",
    },

    signUpBtn: { // sign up button
        backgroundColor: '#5ba1e3',
        width: '80%',
        borderColor: '#57ab8f',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: "center",
    },
});

export default SignInScreen;