import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default Favorite = () => {

    return (
      <View style={styles.containerMap}>
        <View style={styles.card}>
        <Text style={styles.htext}>Naam:</Text>
        <Text style={styles.text}>{}</Text>
        <Text style={styles.htext}>Type:</Text>
        <Text style={styles.text}>{}</Text>
        <Text style={styles.htext}>Publiek:</Text>
        <Text style={styles.text}>{}</Text>
        </View>
      </View>
    )
    
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    margin:5,
    
    
  },
  card:{
    padding:10,
    backgroundColor:'white',
  },
  text:{
    fontSize:16,

  },
  htext:{
    fontSize:18,
    fontWeight:"bold"
  }
  });