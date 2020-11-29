import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity,Button,Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';


export default CameraApp=(props) => {
  let navigation=props.navigation;
  const id=props.route.params.id//id meegegeven vanuit detail om unieke naam te geven gekoppeld aan detail
  const [hasPermission, setHasPermission] = useState(null);
  //camera front en back types (enkel back nodig)
  const [type] = useState(Camera.Constants.Type.back);

  //functie om foto te nemen
  const snap = async () => {
    
    
    //enkel foto nemen als cameraReady=true
    if (this.camera._onCameraReady) {
      let photo = await this.camera.takePictureAsync()
      console.log('from',photo.uri)
      if (photo.uri) {
          try {
            //filesystem die een kopie maakt van de gemaakte foto om deze permanent te kunnen opslaan en in andere componenten te kunnen gebruiken
          await FileSystem.copyAsync({from:photo.uri,to:FileSystem.documentDirectory+id+'.jpg'});
          
            let img=await FileSystem.getInfoAsync(FileSystem.documentDirectory+id+'.jpg')
            console.log('to',img.uri)
            navigation.navigate('ListScreen')
          }
          catch  (error)
          {
              console.log(error);
            }
      }
    }
};
  useEffect(() => {
    // permissie vragen om camera te kunnnen gebruiken (gebeurt eenmalig)
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
//return views voor als camera permission niet in orde is
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    //camera scherm openen standaard code van Expo camera. (bij reloaden van expo app tijdens devolpment werkt camera niet=> volledige app restarten.)
    <View style={{ flex: 1 }}>
      <Camera 
      ref={ref=>{ this.camera=ref;}}
      style={{ flex: 1 }} type={type}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
              <TouchableOpacity title="Foto"
     //lelijke stijl van foto button dit mag nog aangepast naar een normale button         
   style={{
     flex:1,
       borderWidth:1,
       borderColor:'rgba(0,0,0,0.2)',
       alignItems:'center',
       justifyContent:'center',
       width:70,
      position:'absolute',                                  
       bottom: 10,                                                    
       flexDirection:'row',
       height:70,
       backgroundColor:'#fff',
       borderRadius:100,
     }}title="Foto" onPress={()=>{snap()}}><Icon name="plus"  size={30} color="#01a699" /></TouchableOpacity>
            
        </View>
      </Camera>
    </View>
  );
}