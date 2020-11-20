import React ,{ useEffect, useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Platform, Button,TouchableOpacity,Image} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-community/async-storage';
import {ListItem} from 'react-native-elements'
import { Camera } from 'expo-camera';
import { navigation} from '@react-navigation/native';
import CameraApp from './Camera';
import * as FileSystem from 'expo-file-system';
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens';
//Pagina List
export default ListDetails = (props) => {
  let id=props.route.params.properties.OBJECTID
  let navigation=props.navigation;
  const[jpg,setImg]=useState();
  

    const getImg=async()=>{
      try {
        let img=await FileSystem.getInfoAsync(FileSystem.documentDirectory+id+'.jpg')

        if(img!==null) {
          console.log('test',img.uri)
          setImg(img.uri)
        }
      }
       catch(e) {

      }
    }

    
      useEffect(() => {
        
        getImg();
        }, [jpg]);
    





        
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri:jpg}} key={Date.now()}></Image>
        <View style={styles.card}>
        <Text style={styles.htext}>Naam:</Text>
        <Text style={styles.text}>{props.route.params.properties.naam}</Text>
        <Text style={styles.htext}>Type:</Text>
        <Text style={styles.text}>{props.route.params.properties.type}</Text>
        <Text style={styles.htext}>Publiek:</Text>
        <Text style={styles.text}>{props.route.params.properties.publiek}</Text>
        
        
        <Button title="Take a picture!"   onPress={()=> {navigation.navigate('Camera',{id:props.route.params.properties.OBJECTID})}}  ></Button>
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
      width:undefined,
      height:undefined,

    }

  });