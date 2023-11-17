import { useState, useEffect} from 'react';
import { StyleSheet, View, Text, TextInput, Button, Pressable, Image } from 'react-native';

export default function Signin() {
    return (
        <View style = {styles.container}>
            <Image
              style = {{ width: 100, height: 100 }}
              source={require('../assets/user-icon.png')} />
          <View>
              <Text style = {styles.userid}> UserName#ID </Text> 
          </View>
          <View style = {styles.Bio}>
            <TextInput defaultValue = "BIO...." />
          </View>
          <View style = {{paddingTop: 30}}>
            <Pressable style = {styles.buttonAccount}> 
              <Text style = {{fontWeight: 'bold', color: 'white',}}> My Account </Text>
            </Pressable>
          </View>
          <View style = {{paddingTop: 30}}>
            <Pressable style = {styles.buttonSettings}> 
              <Text style =  {{fontWeight: 'bold', color: 'white',}}> Settings </Text>
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
  },
  userid: {
    borderColor: '#000000',
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 50,
    borderRadius: 5,
    textAlign: 'left',
  },
  Bio: {
    height: 100,
    width: 200,
    marginTop: 12,
    padding: 12,
    borderRadius: 8,
    color: '#666',
    backgroundColor: '#eaeaea',
    textAlign: 'left',
  },
  buttonAccount: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 48,
    borderRadius: 7,
    elevation: 3,
    backgroundColor: "#9577CA",
  },
  buttonSettings: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 60,
    borderRadius: 7,
    elevation: 3,
    backgroundColor: "#9577CA",
  },
}); 
