import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen.js'; // may need to capitalize the import file here
import SignUpScreen from '../screens/SignUpScreen.js';
import MainScreen from '../screens/MainScreen.js';
import SearchScreen from '../screens/SearchScreen.js';
import UserScreen from '../screens/UserScreen.js';
import CreateMemoryScreen from '../screens/CreateMemoryScreen.js';

const Stack = createNativeStackNavigator();
const NavStack = () => {
    return(
    <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="UserScreen" component={UserScreen} />
        <Stack.Screen name="CreateMemory" component={CreateMemoryScreen} />
    </Stack.Navigator>)
};


export default NavStack;