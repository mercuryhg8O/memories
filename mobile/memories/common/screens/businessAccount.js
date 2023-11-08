import { useState, useEffect} from 'react';
import { StyleSheet, View, Text, Button, Pressable } from 'react-native';


export default function Signin() {
    return (
        <View style = {styles.container}>
            <Text style = {styles.titleText}> Welcome </Text>
            <Text> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
                ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
            <Button title = "I Understand"></Button>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DEDEC5',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  titleText: {
    fontSize: 30,
    fontWeight: 'bold'
  }
}); 
