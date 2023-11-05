import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

const CustomInput = ({value, setValue, placeholder, isMuliLine}) => {
    return (
        <View style={isMuliLine ? styles.multiline_container: styles.singleline_container}>
            <TextInput 
                value={value}
                onChangeText={setValue}
                placeholder={placeholder} 
                style={styles.input} 
                />
        </View>
    );
};

const styles = StyleSheet.create({
    singleline_container: {
        backgroundColor: 'white',
        width: '80%',

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        height: 40,

        paddingHorizontal: 10,
        paddingVertical: 10,
    },

    multiline_container: {
        backgroundColor: 'white',
        width: '80%',

        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        height: 110,

        paddingHorizontal: 10,
        paddingVertical: 10,
    },

    input: {},
});

export default CustomInput;