import React ,{ useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Platform, ClippingRectangle } from 'react-native';
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
    console.log('k zit in de functie')
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
  
  
  
  //console.log('hallo ' + storedData.feature.properties.id);
  //console.log('Hell' + storedData + '\n');


  //AsyncStorage.getItem(item.name);
  //setStoredData(route.params)
  //let dataTest = props.item;
  
  //let addData = props.addFavorite
  //let removeData = props.removeFavorte
  //console.log(storedData);

  useEffect(() => {
    let navigation = props.navigation;
    // tip van SVen CHarleer :)
    navigation.addListener("focus", async() => {
      await id();
    })
  },[]);

    return (
      <View >
        {storedData && <FlatList
        data={storedData}
        keyExtractor={(item) => {
          let result = JSON.parse(item);
          return result.properties.naam;
        }}
        renderItem={(item) => {
          let result = JSON.parse(item.item);
          let navigation = props.navigation;
          console.log(result);
          return (
            <ListItem>
              <ListItem.Content>
              <TouchableOpacity onPress={()=>navigation.navigate('ListDetails',result)}>
              <ListItem.Title>{result.properties.naam}</ListItem.Title>
                <ListItem.Subtitle></ListItem.Subtitle> 
                </TouchableOpacity>
              </ListItem.Content>
            </ListItem>)
        }} />}
        
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