import { useState, useEffect} from 'react';
import { StyleSheet, View, Text, Button, Pressable } from 'react-native';


export default function Signin() {
    return (
        <View style = {styles.container}>
          <View style = {styles.logotitle}>
            <Text> Mini Memory logo</Text>
          </View>
          <View style = {styles.titleText}>
            <Text style = {{fontWeight: 'bold',  fontSize: 25,}}> Welcome to the Memories App! 
                Check your email for a verification. Once you've verified
                your email you will have access to your account.
            </Text>
          </View>
          <View style = {{paddingTop: 30}}>
            <Button title = "Continue" color = "#9577CA"></Button>
          </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c5effc',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  titleText: {
    height: 270,
    width: 260,
  },
  logotitle: {
  },
}); 
