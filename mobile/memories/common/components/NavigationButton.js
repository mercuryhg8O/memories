import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';


const NavigationButton = ({ navigation, navigateTo }) => {
    return <View style={styles.container}>
        <TouchableOpacity style={styles.btnContainer}
            // replace with help screen
            onPress={() => navigation.navigate(navigateTo)}> 
            <Text style={{ padding: 10 }}>{navigateTo}</Text>
        </TouchableOpacity>
    </View>
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    btnContainer: {

        flex:1,
        backgroundColor: "#dba7c3",
        borderRadius: 100,
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
    },
});


export default NavigationButton;