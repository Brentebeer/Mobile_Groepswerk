import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Voor de map
import MapView from 'react-native-maps';

// pagina maps
export default MapsScreen = ({navigation}) => {

    return (
      <View style={styles.containerMap}>
        <MapView style={styles.mapStyle} region={{latitude:51.228493,
           longitude:4.404578,
           longitudeDelta:0.12874,
           latitudeDelta:0.04888}} >
  
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