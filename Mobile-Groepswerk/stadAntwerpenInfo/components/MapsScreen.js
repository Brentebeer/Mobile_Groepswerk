import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Platform, Button, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
import { navigation} from '@react-navigation/native';

// Voor de map
import MapView, { Callout, Marker } from 'react-native-maps';
import { createNativeWrapper } from 'react-native-gesture-handler';

// pagina maps
export default MapsScreen = (props) => {
  const [venster, setVenster] = useState(false); /*Dit is HEEL BELANGRIJK HEEF MIJ UREN GEDUURD OM ERMEE TE SPELEN zorgt dat we het venster kunnen openen en sluiten*/
  const [detailvenster, setDetailvenster] = useState([]); /*OOK HEEL BELANGRIJK NO JOKE zorg dat we informatie opslaan om die later te presenteren LANGE LEVEN YOUTUBE*/
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);
  let navigation = props.navigation;
  let text = 'Loading location...';
  if (errorMsg) {
    text=errorMsg;
    return(<View style={styles.container}><Text style={styles.WaitingTxt} >{text}</Text></View>)
  } else if (location) {
    
    return(
    <View style={styles.containerMap}>
    <MapView style={styles.mapStyle} initialRegion={{latitude:location.coords.latitude,
       longitude:location.coords.longitude,
       longitudeDelta:0.12874,
       latitudeDelta:0.04888}}>
      
      {props.publicSwimmingPoolData.length > 0 && props.publicSwimmingPoolData.map((report,index) => {
        return (<Marker
        key={index}
        coordinate={{latitude: report.geometry.coordinates[1], longitude: report.geometry.coordinates[0]}}
        //title={report.properties.naam}
        //description={report.properties.straat}
        onPress={() => { //Zeer belangrijk heeft mij eeuwen geduurd om te ontdekken om met states te werken jaar nooit eerder ontdekt egt triest dat ik er zoveel tijd aan ben kwijtgraakt
          setVenster(true); //Van het moment je op de marker druk open je het venster
          setDetailvenster({ // nodig wegens ik fuking de zelfde informatie nodig heb op de view als het moment dat je op de marker klikt
            title: report.properties.naam, /*Fukking grote ontdenkking na dagen zoeken kan ik via states waarde geven hoe de fuk moets ik dat weten*/
            description: report.properties.straat, //Geeft je de straat terug
            huisnummer: report.properties.huisnummer, // Geeft je het huisnummer terug
            postcode: report.properties.postcode, // geeft je de postcode terug
            district: report.properties.district, // Feef je het district terug
            item: report.properties.OBJECTID,
            all: report //Geef je alldata terug is nodig voor de knop details om je zo te verwijzen naar ListDetails
          })
        }}
        /> 
      )})}
    </MapView>
    {
      venster && //Stijn dit heeft mij een heel woensdag genomen om te ontdekken. Dit zorgt ervoor om alles wat hier achter staat te tonen vanaf het moment de de persoon drukt op de marker ik zat op youtube te zoeken en plots dee die Indier dit ineens.
      <View style={styles.bubble}>
        <TouchableOpacity style={{ flexDirection: 'row-reverse' }} onPress={() => {setVenster(false)}}>
          <Text style={{fontSize: 20, padding: 0}}>X</Text></TouchableOpacity>
        <View style={styles.bubbleText}>
        
            <Text style={styles.titleStyle}>Title: {detailvenster.title}</Text> 
    <Text style={styles.descriptionStyle}>Description: {detailvenster.district} {detailvenster.description} {detailvenster.huisnummer} </Text>
          
        
            
        </View>
        <Button title="details" color='red' onPress={()=>navigation.navigate('ListDetails', detailvenster.all)}/>
      </View>
    }
    
  </View>)
    
  
  }
  else {
    return(<View style={[styles.container, styles.horizontal]}><ActivityIndicator size="large"color="red" ></ActivityIndicator></View>)
  }
  
  //let data = []
    // useEffect(() => {
    //   setArray(props.publicSwimmingPoolData);
    // }, [props.publicSwimmingPoolData])
    //console.log(swimmingPoolData);
    // if(props.publicSwimmingPooldata > 0 && ){
    //    swimmingPoolData += props.publicSwimmingPooldata;
    // }
    

    //let data = props.publicSwimmingPoolData;
    
    
    //let data = props.publicSwimmingPoolData; /*word gebruikt om de data te testen NIET VERWIJDEREN*/
    //console.log(data); /*word gebruikt om de data te testen NIET VERWIJDEREN*/
    //console.log(props.publicSwimmingPoolData.length);

}
   



  const styles = StyleSheet.create({
    bubble:{
      backgroundColor: 'white',
      position: 'absolute',
      height: 104,
      width: 360,
      alignSelf: 'center', /*Zorgt dat bubble/venster in het midden komt te staan*/ 
      bottom: 30 /*Nog een ontdekking na een half uur prutsen om deze buble zoals ik noem of venster van onder te zetten moet je bottom gebruiker*/

    },
    bubbleText:{
      flex: 1, /*Ik geef eerlijk toe dit staat hier omdat de button dan in de bubble/venster staat*/
      height: 100,
      width: 300,
      bottom: 20 /*zorgt dat de text 20 pixels afstand van de onderkant nemen*/
    },
    titleStyle:{
      paddingBottom: 5, /*Geeft een padding aan de onderkant van de titel*/
      paddingLeft: 5 /*Geeft een padding aan de linkerkant van de titel*/
    },
    descriptionStyle:{
      paddingBottom: 5,
      paddingLeft: 5
    },
    containerMap: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch', /*zorgt dat de map gestrecht wordt en de heele ruimte inneemt*/
        justifyContent: 'flex-start', /*zort dan die links boven start*/
      },
      mapStyle: {
        flex: 1
      },
      container: {
        flex: 1,
        justifyContent: "center"
      },
      horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
      }
  });