import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {useStateIfMounted} from 'use-state-if-mounted';


//import Components
import MapsScreen from './components/MapsScreen';
import ListScreen from './components/ListScreen';
import ListDetail from './components/ListDetails';
import ListFavorite from './components/ListFavorite';

//tab navigation Bottom tab navigator
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';


const Tab = createBottomTabNavigator();

//icons voor de tabs
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons'; 


//stack navigation
import {createStackNavigator} from '@react-navigation/stack';




const Stack = createStackNavigator();

const StackMaps = (props) => {
  let AllData = props.pass2;
  //console.log(props.pass2);
  return(
    <Stack.Navigator>
      <Stack.Screen name="MapsScreen"  >
        {() => <MapsScreen {...props} publicSwimmingPoolData={AllData}/>}
      </Stack.Screen>
      <Stack.Screen name="ListDetails" component={ListDetails} />
    </Stack.Navigator> 
  )
}

const StackList = (props) => {
  let zwembaden2=props.pass2
    
  return(
    <Stack.Navigator>
      <Stack.Screen name="ListScreen">
      {(props)=><ListScreen {...props} apiData={zwembaden2}/>}
      </Stack.Screen>
      <Stack.Screen name="ListDetails" component={ListDetails} />
      <Stack.Screen name="ListFavorite" component={ListFavorite} />
    </Stack.Navigator> 
  )
}

const StackFavorite = (props) => {
  let zwembaden3 = props.favoritesSwimData
  return(
    <Stack.Navigator>
      <Stack.Screen name="ListFavorite" >
      {() => <ListFavorite {...props} publicSwim={zwembaden3}/>}
      </Stack.Screen>
    </Stack.Navigator>
  )
}



//taps
export default function app() {
  const [zwembaden, setZwembaden] = useStateIfMounted([]);
  const loadZwembaden = async() => {
    try{
      let fetchData = await fetch("https://api.jsonbin.io/b/5fae7fca43fc1e2e1b41bca5/1")
    let json = await fetchData.json();
    
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
        <Tab.Screen name="Maps"  options={{tabBarIcon: ({color, size})  =>(<FontAwesome name="list" size={24} color="black" />)}}> 
          {props => <StackMaps {...props} pass2={zwembaden}/>}
        </Tab.Screen> 
        <Tab.Screen name="List"   options={{tabBarIcon: ({color, size})  =>(<Entypo name="map" size={24} color="black"/>)}}>
          {(props)=><StackList {...props} pass2={zwembaden} />}
        </Tab.Screen>
        <Tab.Screen name="Favorites" options={{tabBarIcon: ({color, size}) => <Entypo name="star-outlined" size={24} color="black" />}}>
          {(props) => <StackFavorite {...props} favoritesSwimData={zwembaden}/>}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});
