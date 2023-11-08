import { useState, useEffect} from 'react';
import { StyleSheet, View, Text, Button, Pressable } from 'react-native';


export default function Signin() {
    return (
        <View style = {styles.container}>
            <Text>Welcome to</Text>
            <Text > Mini Memory logo</Text>
            <Text> Welcome to the Memories App! 
                Check your email for a verification. Once you've verified
                your email you will have access to your account.
            </Text>
            <Button title = "Continue"></Button>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DEDEC5',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: '100%'
  },
  titleText: {
    height: '15%',
    fontSize: 20,
    fontWeight: 'bold'
  }
}); 
