import { NavigationContainer } from '@react-navigation/native';

import {CurrentUserContextProvider} from './common/context/contexts';
import NavStack from './common/navigation/NavStack';

import { StyleSheet } from 'react-native';


export default function App() {
  return (
    <CurrentUserContextProvider>
      <NavigationContainer>
        <NavStack/>
      </NavigationContainer>
    </CurrentUserContextProvider>
  );
}

