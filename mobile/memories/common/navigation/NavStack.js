import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen.js'; // may need to capitalize the import file here
import SignUpScreen from '../screens/SignUpScreen.js';
import MainScreen from '../screens/MainScreen.js';
import SearchScreen from '../screens/SearchScreen.js';

const Stack = createNativeStackNavigator();
const NavStack = () => {
    return(
    <Stack.Navigator initialRouteName="MainScreen">
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
    </Stack.Navigator>)
};


export default NavStack;