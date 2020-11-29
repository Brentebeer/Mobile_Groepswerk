import React ,{ useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Platform, Button,Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
import {ListItem} from 'react-native-elements'
import { navigation} from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
//Pagina List: Stijn Pas op als je hier iets aanpast dit was egt iritant om te maken laat alleen fixen
export default ListDetails = (props) => {
  let id=props.route.params.properties.OBJECTID;//de id die we gebruiken om elke detail een andere afbeelding te geven.
  let navigation=props.navigation;
  const [buttonText, setButtonText] = useState("Voeg toe aan favorieten"); // Voor de text op de knop te tonen van favorieten
  const[favs,setFav]=useState(false) // om van true naar false te gaan false is als het niet gesaven is true als het wel gesavend is. Standard false dit om als je het programma zou opstarten nog niks gesaved is
  const[jpg,setImg]=useState();
  
  
  const storeFav = async (value) => { //saved the value
    try {
      await AsyncStorage.setItem(`@${value.properties.naam}`, JSON.stringify(value)) // als key geven de de naam van het zwembad mee en geven we als data de heele api zwambad data
      console.log('saved ' + value.properties.naam) // om te kijken of dat hij saven

      setButtonText("Verwijderen uit favorieten") // voor de button te zetten op verijder uit favorieten
    } catch (e) {
        // saving error
      }
    }

    const deleteFav = async (value) => { // delete the value
      try {
        console.log('ik ga verwijderen')
        await AsyncStorage.removeItem(`@${value.properties.naam}`) //als key gebruiken we de naam
        console.log('delete ' + value.properties.naam)
        setButtonText("toevoegen") // hier veranderen we de text van de button op toevoegen
      } catch(e) {

      }
    }
   
    const getFavs = async (value) => {
      try {
  
        const loaded = await AsyncStorage.getItem(`@${value.properties.naam}`)
        
        if(loaded !== null) { //Als loaded niet null is dan verwijder favorieten
          setButtonText("Verwijder uit favorieten") //Zet de text naar verwijder favorieten
          setFav(true) // zet state setFav naar true=DeleteFav
      }
      
      } catch(e) {
      // error reading value
      }
      }
      // de img state updaten 
      const getImg=async()=>{
        try {
          let img=await FileSystem.getInfoAsync(FileSystem.documentDirectory+id+'.jpg')//filesystem die de opgeslagen img vanuit camera component aanroept met ID van huidige detail
        //als 
        if(img!==null) {
          console.log('test',img.uri)
          setImg(img.uri)//state updaten van jpg
        }
      }
        catch(e) {
          console.log(e)
        }

      }
      
      useEffect(() => {
        getImg();
        getFavs(props.route.params);
        }, []);
    
        //? + new date om een random component toe te voegen aan de img uri zodat de state wordt geupdate vanwege image caching op android wat niet geforced kan worden
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri:jpg + '?' + new Date()}}></Image>
        <View style={styles.card}>
        <Text style={styles.htext}>Naam:</Text>
        <Text style={styles.text}>{props.route.params.properties.naam}</Text>
        <Text style={styles.htext}>Type:</Text>
        <Text style={styles.text}>{props.route.params.properties.type}</Text>
        <Text style={styles.htext}>Publiek:</Text>
        <Text style={styles.text}>{props.route.params.properties.publiek}</Text>
        <Button title="neem een foto!" onPress={()=>{navigation.navigate('Camera',{id:props.route.params.properties.OBJECTID})}}/> 
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
    },

    image:{
      flex:1,
      width:undefined,//beide op undefined zodat via flex ruimte gevult wordt, zonder width en height laden images niet
      height:undefined,
    }

  });