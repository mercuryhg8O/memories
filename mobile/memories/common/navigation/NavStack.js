import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from '../screens/MapScreen';
import SignInScreen from '../screens/signInScreen'; // may need to capitalize the import file here
import SignUpScreen from '../screens/SignUpScreen';

const Stack = createNativeStackNavigator();
const NavStack = () => {
    return(
    <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="MapScreen" component={MapScreen} />
    </Stack.Navigator>)
};


export default NavStack;