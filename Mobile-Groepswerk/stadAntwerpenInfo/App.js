import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

//import Components
import Header from './components/Header';
//import List from './components/List';

//tab navigation Bottom tab navigator
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import MapView from 'react-native-maps';

const Tab = createBottomTabNavigator();

//icons voor de tabs
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 
//  />
// pagina maps
const Maps = () => {
  return (
    <View style={styles.containerMap}>
      <Header/>
      <MapView style={styles.mapStyle} >

      </MapView>
    </View>
  )
  
}

//Pagina List
const List = () => {
  return (
    <View>
      <Header/>
    </View>
  )
}

//taps
export default () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Maps" component={Maps} options={{tabBarIcon: ({color, size})  =>(<Entypo name="map" size={24} color="black"/>)}}/>
        <Tab.Screen name="list" component={List} options={{tabBarIcon: ({color, size})  =>(<FontAwesome name="list" size={24} color="black" />)}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
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
