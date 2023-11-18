import { useState, useEffect, useContext} from 'react';
import { StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { CurrentUserContext } from '../context/contexts.js';
import { Image, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomInput from '../components/customInput.component.js';
import CustomButton from '../components/customButton.component.js';
import {getUserData } from '../helpers/requestHelpers.js';
import Accordion from 'react-native-collapsible/Accordion'


// https://blog.logrocket.com/building-react-native-collapsible-accordions/
function SettingsScreen({ navigation }) {    

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>My Account</Text>
            <Accordion
                align='bottom'

            />
        </SafeAreaView>
    );
}

const vh = Dimensions.get('window').height;

const styles = StyleSheet.create({
    logo: {
        width: .25*vh, height: .25*vh,
        borderRadius: 100,
    },
    heading: {
        fontSize: 30,
        marginTop: .05*vh,
    },
    container: {
        alignItems: 'center',
        gap: .03*vh
    },
    btn: {
        backgroundColor: '#c5effc',
        width: '80%',
        borderColor: '#57ab8f',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 10,
        alignItems: "center",
    },
});

export default SettingsScreen;