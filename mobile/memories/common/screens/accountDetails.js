import { useState, useEffect} from 'react';
import { StyleSheet, View, Text, Button, Pressable, Image } from 'react-native';
//import { Dropdown } from 'react-native-element-dropdown';

export default function Signin() {
    return (
        <View style = {styles.container}>
            <View >
              <Text style = {styles.title}> My Account </Text>
            </View>
            <View style = {{paddingTop: 30}}>
              <Pressable style = {styles.buttonFollowerTypes}> 
                Groups 
              </Pressable>
              <Pressable style = {styles.buttonFollowerTypes}> 
                Followers 
              </Pressable>
              <Pressable style = {styles.buttonFollowerTypes}> 
                 Following 
              </Pressable>
            </View>
            <View style = {styles.accountTypeChoose}>
              <Text>Account Type:</Text>
              <Pressable> Personal </Pressable>
              <Pressable> Blog </Pressable>
            </View>
            <View> 
              <Text>Default Visibility:</Text>
            </View>
            <Pressable styles = {styles.deleteAccount}> Delete Account </Pressable>
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
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'italic'
  },
  buttonFollowerTypes: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor : 'rgba(255, 0, 127, 0.3)',
    borderRadius: 5,
    paddingHorizontal: 112,
    paddingVertical: 10,
    elevation: 3,
    fontSize: 20,
    fontStyle: 'italic',
  },
  accountTypeChoose: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  accountTypeOps: {
    marginLeft: 30,
  },
  deleteAccount: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor : 'rgba(255, 0, 127, 1)',
    borderRadius: 5,
    paddingHorizontal: 112,
    paddingVertical: 10,
    elevation: 3,
    fontSize: 20,
  }
}); 
