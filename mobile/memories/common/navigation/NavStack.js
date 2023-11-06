import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen'; // may need to capitalize the import file here
import SignUpScreen from '../screens/SignUpScreen';
import MainScreen from '../screens/MainScreen';

const Stack = createNativeStackNavigator();
const NavStack = () => {
    return(
    <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>)
};


export default NavStack;