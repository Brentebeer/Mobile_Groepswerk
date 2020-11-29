import React ,{ useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Platform, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
import {ListItem} from 'react-native-elements'
import { navigation} from '@react-navigation/native';

//Pagina List: Stijn Pas op als je hier iets aanpast dit was egt iritant om te maken laat alleen fixen
export default ListDetails = (props) => {
  const [buttonText, setButtonText] = useState("Voeg toe aan favorieten"); // Voor de text op de knop te tonen van favorieten
  const[favs,setFav]=useState(false) // om van true naar false te gaan false is als het niet gesaven is true als het wel gesavend is. Standard false dit om als je het programma zou opstarten nog niks gesaved is
  //const[saveId, setSaveId] = useState()
  
  
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
        console.log(loaded)
        if(loaded !== null) { //Als loaded niet null is dan verwijder favorieten
          setButtonText("Verwijder uit favorieten") //Zet de text naar verwijder favorieten
          setFav(true) // zet state setFav naar true=DeleteFav
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