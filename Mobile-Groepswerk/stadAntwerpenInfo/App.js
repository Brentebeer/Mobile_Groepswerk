import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

//import Components
import Header from './components/Header';
import MapsScreen from './components/MapsScreen';
import MapsDetail from './components/MapsDetails';
import ListScreen from './components/ListScreen';
import listDetail from './components/ListDetails';

//tab navigation Bottom tab navigator
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';


const Tab = createBottomTabNavigator();

//icons voor de tabs
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 

//stack navigation
import {createStackNavigator} from '@react-navigation/stack';
import ListDetails from './components/ListDetails';

const Stack = createStackNavigator();



const allZwembadData = []
/*
const zwembadData = async () =>{
  let fetchData = await fetch("https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek6/MapServer/644/query?where=1%3D1&outFields=*&outSR=4326&f=json")
  let alldata = await fetchData.json();
  //console.log(alldata.features[0].attributes);
  let zwembadenData = alldata;
  for(let i = 0; i <= zwembadenData.length; i++){
    return allZwembadData.push(zwembadenData.features[i].attributes);
  }
}
console.log(zwembadData())
*/


const StackMaps = (props) => {
  
    
  
  return(
    <Stack.Navigator>
      <Stack.Screen name="MapsScreen" component={MapsScreen} />
      <Stack.Screen name="MapsDetail" component={MapsDetail} />
    </Stack.Navigator> 
  )
}

const StackList = (props) => {
  
    
  
  return(
    <Stack.Navigator>
      <Stack.Screen name="ListScreen" component={ListScreen} />
      <Stack.Screen name="ListDetails" component={ListDetails} />
    </Stack.Navigator> 
  )
}


//taps
export default function app() {
  const [zwembaden, setZwembaden] = useState([]);
  const loadZwembaden = async() => {
    try{
      let fetchData = await fetch("https://geodata.antwerpen.be/arcgissql/rest/services/P_Portal/portal_publiek6/MapServer/644/query?where=1%3D1&outFields=*&outSR=4326&f=json")
    let json = await fetchData.json();
    //console.log(json)
    setZwembaden(json.features)
    }
    catch(error){

    }
  }

  useEffect(() => {
    loadZwembaden();
  },[]);
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Maps" component={StackMaps} options={{tabBarIcon: ({color, size})  =>(<FontAwesome name="list" size={24} color="black" />)}}/> 
        <Tab.Screen name="List" component={StackList} options={{tabBarIcon: ({color, size})  =>(<Entypo name="map" size={24} color="black"/>)}}/>         
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});
