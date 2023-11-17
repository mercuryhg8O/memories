import { useState, useEffect} from 'react';
import { StyleSheet, View, Text, Button, Pressable, Image } from 'react-native';

export default function Signin() {
    return (
        <View style = {styles.container}>
            <View >
              <Text style = {styles.title}> Settings </Text>
            </View>
            <View style = {{paddingTop: 30}}>
              <Pressable style = {styles.buttonSettings}> 
              <Text> Privacy Settings </Text>
              </Pressable>
            </View>
            <View style = {{paddingTop: 30}}>
              <Pressable style = {styles.buttonFeedback}> 
              <Text> Send Feedback </Text>
              </Pressable>
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
    textAlign: 'center',
    paddingBottom: 200,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  buttonSettings: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 42,
    borderRadius: 7,
    elevation: 3,
    backgroundColor: "#CC00CC",
    },
  buttonFeedback: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 45,
    borderRadius: 7,
    elevation: 3,
    backgroundColor: "#9577CA",
    },
}); 
