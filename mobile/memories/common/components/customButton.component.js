import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const CustomButton = ({onPress, placeholder, button_type, text_type}) => {
    return (
            <TouchableOpacity style={button_type} onPressIn={onPress}>
                <Text style={text_type}>{placeholder}</Text>
            </TouchableOpacity>
    );
};

const styles  = StyleSheet.create({


});

export default CustomButton;