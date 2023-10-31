import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View, Text, Button } from 'react-native';
import MapScreen from '../screens/MapScreen';
import SignInScreen from '../screens/signInScreen'; // may need to capitalize the import file here


function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to Details"
                onPress={() => navigation.push('Details')}
            />
        </View>
    );
}

const Stack = createNativeStackNavigator();
const NavStack = () => {
    return(
    <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>)
};


export default NavStack;