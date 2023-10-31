import { useState, useEffect, createContext, useContext, } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image } from 'react-native';
import CustomInput from '../components/customInput.component';
import CustomButton from '../components/customButton.component';
import {CurrentUserContext} from '../context/contexts'

const SignInScreen = ({ navigation }) => {
    const { setIsLoggedIn, isLoggedIn } = useContext(CurrentUserContext);


    // handle log in functionality and only pass up the user name
    [userNameAttempt, setUserNameAttempt] = useState('');
    [passwordAttempt, SetPasswordAttempt] = useState('');



    return <View style={styles.container}>

        <SafeAreaView >
            <View /* Logo container */ style={styles.logo_container}>
                <Image
                    style={styles.logo}
                    source={{
                        uri: 'https://as1.ftcdn.net/v2/jpg/01/04/73/84/1000_F_104738464_uK24Z5qUllReax2nCDZ0HQiVINOf1k7m.jpg',
                    }}
                />
                <View style={styles.logo_text}>
                    <Text style={{fontSize: 20}}>
                        Welcome to
                    </Text>
                    <Text style={{fontSize: 40}}>
                        Memories
                    </Text>
                </View>
                
            </View>
            {console.log(isLoggedIn)}

            <View /* Registration container */ style={styles.input_fields}>
                <CustomInput placeholder={'username'} setValue={setUserNameAttempt}/>
                <CustomInput placeholder={'password'} setValue={SetPasswordAttempt}/>
                <CustomButton placeholder={'Forgot Password'} button_type={styles.button_type3} text_type={{color: '#858585'}}/>
                <CustomButton placeholder={'Login'} onPress={() => navigation.navigate('MapScreen')} button_type={styles.button_type1}/>
                <CustomButton placeholder={'Sign Up'} button_type={styles.button_type2} />
                
            </View>
            
        </SafeAreaView>
    </View>
};

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
        paddingTop: 50,
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

export default SignInScreen;