import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default Header = () => {
    return(
        <SafeAreaView style={styles.headerStyle}>
            <Text style={styles.headerText}>AppName</Text>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: 'white',
        alignItems: 'flex-start',
        //justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeigt : 0
    },
    headerText:{
        fontWeight: 'bold',
        paddingBottom: 15,
        paddingLeft: 10
    }
  });