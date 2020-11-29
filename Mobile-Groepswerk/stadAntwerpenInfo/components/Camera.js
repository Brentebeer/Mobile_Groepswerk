import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity,Button,Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';


export default CameraApp=(props) => {
  let navigation=props.navigation;
  const id=props.route.params.id
  const [hasPermission, setHasPermission] = useState(null);
  const [type] = useState(Camera.Constants.Type.back);

  const snap = async () => {
    
    

    if (this.camera._onCameraReady) {
      let photo = await this.camera.takePictureAsync()
      console.log('from',photo.uri)
      if (photo.uri) {
          try {
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
    
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    
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