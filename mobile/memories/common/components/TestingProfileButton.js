import { Button, Text, StyleSheet } from "react-native";
import { CurrentUserContext } from '../context/contexts';
import { useContext } from 'react';

// Button for just interim demo to display example profiles
const TestingProfileButton = ({navigation, userId}) => {

    const { setDisplayUser, setTargetUserUID } = useContext(CurrentUserContext);

    return (
        <Button 
            title={''+ userId}
            onPress={() => {
                setTargetUserUID(userId);
                setDisplayUser(true);
            }}/>
    );
}

export default TestingProfileButton;