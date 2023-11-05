import { useState, useEffect, createContext, useContext, } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image } from 'react-native';
import CustomInput from '../components/customInput.component';
import CustomButton from '../components/customButton.component';
import { CurrentUserContext } from '../context/contexts';
import axios from 'axios';

const SignUpScreen = ({ navigation }) => {
    const { setCurrentUser } = useContext(CurrentUserContext);

    // handle log in functionality and only pass up the user name
    [userName, setUserName] = useState('');
    [password, SetPassword] = useState('');
    [email, SetEmail] = useState('');
    [bio, setBio] = useState('');

    const attemptSignUp = () => {

        if (userName === '' || password === '') {
            console.warn('enter username and password.');
        }else{
            if(true){ // valid login (replace with request)
                navigation.navigate('MapScreen'); // navigate to map
                setCurrentUser(userName); // save username for future requests
            }else{
                console.warn('cannot create an account with that information.')
                // TODO: parse to provide informative error of why account creation didn't succeed
            }
        }
    }



    return <View style={styles.container}>

        <SafeAreaView >
            <View /* Logo container */ style={styles.logo_container}>
                <Image
                    style={styles.logo}
                    source={{
                        uri: 'https://cdn-icons-png.flaticon.com/512/3177/3177440.png',
                    }}/>
            </View>

            <View /* Registration container */ style={styles.input_fields}>
                <CustomInput placeholder={'username'} setValue={setUserName} />
                <CustomInput placeholder={'email'} setValue={SetEmail} />
                <CustomInput placeholder={'password'} setValue={SetPassword} />
                <CustomInput placeholder={'Bio'} setValue={SetPassword} isMuliLine={true}/>
                <CustomButton placeholder={'Create Account'} onPress={() => attemptSignUp()} button_type={styles.button_type1} />

            </View>

        </SafeAreaView>
    </View>
};

export default SignUpScreen;

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
        justifyContent: 'center',
        alignItems: "center",
        paddingTop: 80,
    },
    logo: {
        padding: 80,
        width: 100,
        height: 100,
        borderRadius: 100,
    },
    logo_text: {
        justifyContent: 'center',
        alignItems: "center",
        paddingTop: 20,
    },
    input_fields: {
        paddingTop: 50,
        justifyContent: 'center',
        alignItems: "center",
        gap: 40,
    },

    button_type1: { // login button
        backgroundColor: '#45d9a8',
        width: '80%',

        borderColor: '#57ab8f',
        borderWidth: 1,
        borderRadius: 5,
        height: 40,

        paddingHorizontal: 10,
        paddingVertical: 10,

        justifyContent: 'center',
        alignItems: "center",
    },

    button_type2: { // sign up button
        backgroundColor: '#5ba1e3',
        width: '80%',

        borderColor: '#57ab8f',
        borderWidth: 1,
        borderRadius: 5,
        height: 40,

        paddingHorizontal: 10,
        paddingVertical: 10,

        justifyContent: 'center',
        alignItems: "center",
    },

    button_type3: { // forgot password button
        width: '80%',
        height: 40,

        paddingHorizontal: 10,
        paddingVertical: 10,

        justifyContent: 'center',
        alignItems: "center",
    },
});