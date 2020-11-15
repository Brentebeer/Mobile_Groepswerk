import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { navigation} from '@react-navigation/native';

//Pagina List
export default List = (props) => {
  let navigation = props.navigation;
  let zwembaddata=props.apiData
  
    return (
      
      <View>
        <FlatList
        data={zwembaddata}
        renderItem={({item})=>(
          <TouchableOpacity onPress={()=>navigation.navigate('ListDetails',item)}>
            <Text>{item.attributes.naam}</Text>
            <Text>{item.attributes.straat} {item.attributes.huisnummer}</Text>
          </TouchableOpacity>

        )}
        >

        </FlatList>
      </View>
    )
}



  const styles = StyleSheet.create({
    
    
  });