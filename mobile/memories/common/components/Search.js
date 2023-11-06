import React, { Component } from 'react';
import { Text, View, StyleSheet, Modal, TouchableOpacity, Image, TextInput } from 'react-native';
import SearchButton from './SearchButton';

export class Search extends Component {
  constructor(props) { // need to display information for user with userid
    super(props);
    this.state = {
      visible: false,
    };
  }

  setVisible(v) {
    this.setState({visible: v});
  }

  createPerson() {
    return (
      <TouchableOpacity
        style={styles.item}
        // onPress={}
        >
        <Image style={styles.icon}/>
        <Text
          style={styles.itemtext}
          >
          Cheetah
        </Text>
      </TouchableOpacity>
    );
  }

  createPlace() {
    return (
      <TouchableOpacity
        style={styles.item}
        // onPress={}
        >
        <Image style={styles.icon}/>
        {/* this needs to be a lil pin svg or something that we create/source from elsewhere */}
        <Text
          style={styles.itemtext}
          >
          RPI Union
        </Text>
      </TouchableOpacity>
    );
  }

  createTag() {
    return (
      <TouchableOpacity
        style={styles.item}
        // onPress={}
        >
        <Text style={styles.tag}>#</Text>
        <Text
          style={styles.itemtext}
          >
          all nighterrr
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.visible}
        onRequestClose={() => {
          this.setVisible(false);
        }}>

        <View style={styles.modal}>
          <SearchButton/>
          <TextInput
            style={styles.input}
            placeholder='What are you looking for?'
            
          />
          <View style={styles.content}>
            {this.createPerson()}
            {this.createPlace()}
            {this.createTag()}
          </View>
        </View>
      </Modal>
    );
  }
};

const styles = StyleSheet.create({
  modal: {
    height: '100%',
    marginTop: 'auto',
    backgroundColor:'white'
  },
  content: {
    top: 100,
    left: '10%',
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    top: 75,
    left: '10%',
    // borderWidth: 1,
    width: '70%',
    fontSize: 15
  },
  item:{
    flexDirection: 'row'
  },
  itemtext: {
    fontSize: 15,
  },
  icon: {
    backgroundColor: 'purple',
    width: 40, height: 40, // make sure these values are the same
    borderRadius: 50,
  },
  tag: {
    fontSize: 50
  }
});

export default Search;