import {CreateStackNavigator} from 'react-navigation-stack';
import { CreateAppContainer} from 'react-navigation';
import business from '../common/screens/businessAccount';
import usagesignin from '../common/screens/usagesignup';
import signin from '../common/screens/signin';

const screens = {
    signin:{
        screen:  signin
    },
    usage: {
        screen: usagesignin
    },
    businessAccount: {
        screen: business
    }
}


const Homestack = CreateStackNavigator(screens);

export default CreateAppContainer(Homestack);
