import { useState, useEffect} from 'react';
import { StyleSheet, View, Text, Button, Pressable } from 'react-native';


export default function Signin() {
    return (
        <View style = {styles.container}>
            <View >
                <Text style = {styles.titleText}>How would you like to use      memories?</Text>
                <Text> Select one: </Text>
            </View>
            <View>
                <Text>Personal</Text>
                <Text>For users looking to explore the app but plan to keep their posts to friends and family.</Text>
            </View>
            <View>
                <Text>Blog</Text>
                <Text>For users looking to epxlore the app and share their memories with a lot of people.</Text>
            </View>
            <Text style = {styles.underline}>Are you a business?</Text>
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
    fontSize: 20,
    fontWeight: 'bold'
  },
  underline: {textDecorationLine: 'underline'}
}); 
