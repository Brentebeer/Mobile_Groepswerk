import React ,{ useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Platform, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
import {ListItem} from 'react-native-elements'

//Pagina List
export default ListDetails = (props) => {
  const[favs,setFav]=useState()
  
  
  const storeFav = async (value) => {
    try {
    await AsyncStorage.setItem(value.properties.naam, JSON.stringify(value))
    } catch (e) {
    // saving error
    }
    }

    const deleteFav=async (value) => {
      try {
        await AsyncStorage.removeItem(value.properties.naam)
      } catch(e) {

      }
    }

    const getFavs = async (value) => {
      try {
      const loaded = JSON.parse(await AsyncStorage.getItem(value.properties.naam))
      if(loaded !== null) {
      setFav(loaded)
      }
      
      } catch(e) {
      // error reading value
      }
      }
      useEffect(() => {
        getFavs(props.route.params);
        
        }, [favs]);
    

        const FavFunction=()=> {
          if(favs) {
            deleteFav(props.route.params)
            

          }
          if (!favs) {
            storeFav(props.route.params)
            
          }
        }
    return (
      <View style={styles.container}>
        <View style={styles.card}>
        <Text style={styles.htext}>Naam:</Text>
        <Text style={styles.text}>{props.route.params.properties.naam}</Text>
        <Text style={styles.htext}>Type:</Text>
        <Text style={styles.text}>{props.route.params.properties.type}</Text>
        <Text style={styles.htext}>Publiek:</Text>
        <Text style={styles.text}>{props.route.params.properties.publiek}</Text>
        
        <Button title={favs?"verwijderen uit favorieten":"toevoegen aan favorieten"} onPress={()=>{FavFunction(),getFavs(props.route.params)}}></Button>
    
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