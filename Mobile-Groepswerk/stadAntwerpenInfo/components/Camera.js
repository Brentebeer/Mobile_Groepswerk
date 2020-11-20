import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity,Button,Image } from 'react-native';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-community/async-storage';



export default CameraApp=(props) => {
  
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
              <Button title="picca" onPress={()=>{snap()}}></Button>
            
        </View>
      </Camera>
    </View>
  );
}