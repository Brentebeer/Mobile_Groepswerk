import React ,{ useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { navigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

export default Favorite = (props) => {
  const[storedData, setStoredData]=useState([]) //
  
  let allData = []
  allData = props.publicSwim;
  //console.log(allData);

  //setStoredData()
  const id = () => {
    
    allData.forEach( async (location) => {
      const value = await AsyncStorage.getItem(`@${location.properties.naam}`)
      if(value !== null) {
        setStoredData(storedData.push(location))
        //console.log(storedData);
      }
        
        //console.log(value);
    })
    
  }
  
  id(props.publicSwim);
  console.log(storedData);


  //AsyncStorage.getItem(item.name);
  //setStoredData(route.params)
  //let dataTest = props.item;
  
  //let addData = props.addFavorite
  //let removeData = props.removeFavorte
  
    return (
      
      <View style={styles.containerMap}>
        <Text></Text>
        <Text></Text>
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