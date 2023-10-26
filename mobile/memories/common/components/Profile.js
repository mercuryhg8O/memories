import React, { Component } from 'react';
import { Text, View, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';

export class Profile extends Component {
  constructor(props, userid) { // need to display information for user with userid
    super(props);
    this.state = {
      visible: true,
    };
  }

  setVisible(v) {
    this.setState({visible: v});
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
        <TouchableOpacity
          style={styles.tO}
          onPress={() => {
            this.setVisible(!this.state.visible);
          }}>
        </TouchableOpacity>
        <View style={styles.modal}>
          <View style={styles.content}>
            <Image
              style={styles.icon}/>
          </View>
        </View>
      </Modal>
    );
  }
};


const styles = StyleSheet.create({
  tO: {
    opacity: 0,
    backgroundColor: 'white',
    height: '100%',
  },
  modal: {
    height: '50%',
    marginTop: 'auto',
    backgroundColor:'white'
  },
  content: {
    marginTop: 10
  },
  icon: {
    backgroundColor: 'purple',
    width: 75, height: 75, // make sure these values are the same
    borderRadius: 50,
    margin: 15
  }
});

export default Profile;