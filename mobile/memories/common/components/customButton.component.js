import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const CustomButton = ({onPress, placeholder, button_type, text_type, label}) => {
    return (
            <TouchableOpacity style={button_type} onPressIn={onPress} accessibilityLabel={label}>
                <Text style={text_type}>{placeholder}</Text>
            </TouchableOpacity>
    );
};

export default CustomButton;