import React ,{ useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Platform, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
import {ListItem} from 'react-native-elements'
import { navigation} from '@react-navigation/native';

//Pagina List
export default ListDetails = (props) => {
  const [buttonText, setButtonText] = useState("Voeg toe aan favorieten");
  const[favs,setFav]=useState(false) //
  const[saveId, setSaveId] = useState()
  
  
  const storeFav = async (value) => { //saved the value
    try {
      await AsyncStorage.setItem(`@${value.properties.naam}`, JSON.stringify(value))
      console.log('saved ' + value.properties.naam)

      setButtonText("Verwijder uit favorieten")
    } catch (e) {
        // saving error
      }
    }

    const deleteFav = async (value) => { // delete the value
      try {
        console.log('ik ga verwijderen')
        await AsyncStorage.removeItem(`@${value.properties.naam}`)
        console.log('delete ' + value.properties.naam)
        setButtonText("Voeg toe aan favorieten")
      } catch(e) {

      }
    }

    //storeFav(props.route.params);
    //deleteFav(props.route.params);


    
    const getFavs = async (value) => {
      try {
  
        const loaded = await AsyncStorage.getItem(`@${value.properties.naam}`)
        console.log(loaded)
        if(loaded !== null) {
          setButtonText("Verwijder uit favorieten")
          setFav(true)
      }
      
      } catch(e) {
      // error reading value
      }
      }
      
      useEffect(() => {
        getFavs(props.route.params);
        }, []);
    
    return (
      <View style={styles.container}>
        <View style={styles.card}>
        <Text style={styles.htext}>Naam:</Text>
        <Text style={styles.text}>{props.route.params.properties.naam}</Text>
        <Text style={styles.htext}>Type:</Text>
        <Text style={styles.text}>{props.route.params.properties.type}</Text>
        <Text style={styles.htext}>Publiek:</Text>
        <Text style={styles.text}>{props.route.params.properties.publiek}</Text>
        
        <Button title={buttonText} onPress={()=>{ favs ? deleteFav(props.route.params) : storeFav(props.route.params); setFav(!favs)}}/>
    
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