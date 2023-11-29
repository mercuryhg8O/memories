import { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, SafeAreaView, View, Linking } from 'react-native';
import { CurrentUserContext } from '../context/contexts.js';
import { Image, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomInput from '../components/CustomInput.js';
import CustomButton from '../components/CustomButton.js';
import { getUserData } from '../helpers/requestHelpers.js';


// Home page for settings with form for changing user information
function SettingsHomeScreen({ navigation }) {

    const { currentUserId } = useContext(CurrentUserContext);

    const [userIcon, setUserIcon] = useState('https://cdn-icons-png.flaticon.com/512/3177/3177440.png');
    const [userName, setUserName] = useState('Cheetah');
    const [bio, setBio] = useState('rawr xD');

    useEffect(() => {
        const getUserProfileData = async () => {
            const { found_user, username, bio } = await getUserData(currentUserId);

            if (!found_user) {
                console.log('error parsing response from request for profile with id: ' + currentUserId);
            } else {
                // response was valid, so parse and save the output
                console.log(currentUserId);
                console.log('found current user id:' + found_user);
                console.log(username);
                console.log(bio);
                setUserName(username);
                setBio(bio);
            }
        }
        getUserProfileData();
    }, [currentUserId]);

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

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Me</Text>
            <TouchableOpacity onPress={pickImageAsync}>
                <Image
                    style={styles.logo}
                    source={{
                        uri: userIcon,
                    }}
                />
            </TouchableOpacity>
            <CustomInput
                placeholder={userName}
                defaultValue={userName}
                setValue={setUserName}
                label={'Username input field'}
            />
            <CustomInput
                placeholder={bio.length == 0 ? '(optional) Bio  ' : bio}
                defaultValue={bio.length == 0 ? '' : bio}
                setValue={setBio}
                isMultiLine={true}
                label={'Bio input field'}
            />
            <CustomButton
                button_type={styles.btn}
                placeholder={"Settings"}
                onPress={() => {
                    navigation.navigate('Settings');
                }}
            />
            <CustomButton
                button_type={styles.btn}
                placeholder={"Send Feedback"}
                onPress={() => {
                    Linking.openURL("https://github.com/mercuryhg31/memories/issues");
                }}
            />
        </SafeAreaView>
    );
}

const vh = Dimensions.get('window').height;

const styles = StyleSheet.create({
    logo: {
        width: .25 * vh, height: .25 * vh,
        borderRadius: 100,
    },
    heading: {
        fontSize: 30,
        marginTop: .05 * vh,
        color: 'white',
    },
    container: {
        alignItems: 'center',
        gap: .03 * vh,
        backgroundColor: '#dba7c3',
        height: '100%'
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

export default SettingsHomeScreen;