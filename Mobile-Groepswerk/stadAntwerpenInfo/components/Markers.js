import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { Marker } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';


export default Markers = ({data}) => {
    return(
      data.map((report, index) => (
        <Marker
          key={index}
          coordinate={{latitude: report.geometry.coordinates[1], longitude: report.geometry.coordinates[0]}}
          title={report.attributes.naam}
        />
      ))
        
    );
}


const styles = StyleSheet.create({
    
  });