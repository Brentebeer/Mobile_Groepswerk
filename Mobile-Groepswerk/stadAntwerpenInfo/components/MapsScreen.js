import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Platform, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';



// Voor de map
import MapView, { Marker } from 'react-native-maps';
import Markers from './Markers';
import { createNativeWrapper } from 'react-native-gesture-handler';

// pagina maps
export default MapsScreen = (props) => {
  //let data = []
    // useEffect(() => {
    //   setArray(props.publicSwimmingPoolData);
    // }, [props.publicSwimmingPoolData])
    //console.log(swimmingPoolData);
    // if(props.publicSwimmingPooldata > 0 && ){
    //    swimmingPoolData += props.publicSwimmingPooldata;
    // }
    
    let data = props.publicSwimmingPoolData;
    console.log(data);
    //console.log(props.publicSwimmingPoolData.length);

    
    return (
      <View style={styles.containerMap}>
        <MapView style={styles.mapStyle} initialRegion={{latitude:51.228493,
           longitude:4.404578,
           longitudeDelta:0.12874,
           latitudeDelta:0.04888}}>
          
          {props.publicSwimmingPoolData.length > 0 && props.publicSwimmingPoolData.map((report,index) => {
            return (<MapView.Marker
            key={index}
            coordinate={{latitude: report.geometry.coordinates[1], longitude: report.geometry.coordinates[0]}}
            title={report.attributes.naam}
            description={report.attributes.straat}
            />
              
          )})}
          
        
        
        </MapView>
      </View>
    )
    
}



  const styles = StyleSheet.create({
    containerMap: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
      },
      mapStyle: {
        flex: 1
      },
  });