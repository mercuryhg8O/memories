import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignInScreen from '../screens/signInScreen';


const Stack = createNativeStackNavigator();

const AuthStack = () => {
    return (
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Sign In" component={SignInScreen} />
    </Stack.Navigator>
)};


export default AuthStack;