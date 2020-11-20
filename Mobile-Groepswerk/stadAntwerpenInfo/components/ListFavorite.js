import React ,{ useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import {ListItem} from 'react-native-elements'
import { navigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

export default Favorite = (props) => {
  const[storedData, setStoredData]=useState() //
  let favoriteArray = [];
  let allData = []
  allData = props.publicSwim;
  //console.log(allData);

  //setStoredData()
  const id = async () =>  {
    let arraytest = [];
    //let favoriteArray = []; 
    allData.forEach( async (location) => {
      const value = await AsyncStorage.getItem(`@${location.properties.naam}`) // We matche de waarde tot de naam overeenkomt als die overeenkomt wilt het zeggen dat we die saved hebben
      //console.log('value ' + value)
      if(value !== null) { // als de value groter is dan null word 
        //setStoredData(value)
        arraytest.push(value);
        setStoredData([...arraytest])
        //console.log('waarde in de if ' + value + '\n') // dit is juist geeft twee waarden
        //favoriteArray.push(value)
        //console.log('value is not null = ' + storedData);
      }
        
    });
      
        //console.log('test2' + favoriteArray);
        //setStoredData([...arraytest]);
  }
  
  id();
  
  //console.log('hallo ' + storedData.feature.properties.id);
  //console.log('Hell' + storedData + '\n');


  //AsyncStorage.getItem(item.name);
  //setStoredData(route.params)
  //let dataTest = props.item;
  
  //let addData = props.addFavorite
  //let removeData = props.removeFavorte
  //console.log(storedData);
    return (
      <View >
        <FlatList
        data={storedData != undefined}
        //key={item => item.OBJECTID}
        //keyExtractor={properties.id}
        renderItem={item=>(
        <ListItem >
          <ListItem.Content >
        <ListItem.Title >{item.naam}</ListItem.Title>
            <ListItem.Subtitle ></ListItem.Subtitle> 
          </ListItem.Content>
        </ListItem>)}>

        </FlatList>
        
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