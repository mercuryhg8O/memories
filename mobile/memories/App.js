import { useState, useEffect, createContext, useContext, } from 'react';
import MapView from 'react-native-maps';
import MyMap from './common/components/myMap.component';
import ParseMemoriesDetails from './common/helpers';
import { StyleSheet, View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './common/navigation/AuthStack';
import AppStack from './common/navigation/AppStack';
import {CurrentUserContext, AuthContextProvider} from './common/context/contexts';
import NavStack from './common/navigation/NavStack';


export default function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <NavStack/>
      </NavigationContainer>
    </AuthContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});