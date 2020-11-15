import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { navigation} from '@react-navigation/native';
import {ListItem} from 'react-native-elements'
//Pagina List
export default List = (props) => {
  let navigation = props.navigation;
  let zwembaddata=props.apiData
  
  
    return (
      
      <View>
        <FlatList
        data={zwembaddata}
        keyExtractor={item=>JSON.stringify(item.properties.OBJECTID)}
        renderItem={({item})=>(
        <ListItem key={item.properties.OBJECTID} bottomDivider>
          <ListItem.Content>
          <TouchableOpacity onPress={()=>navigation.navigate('ListDetails',item)}><ListItem.Title>{item.properties.naam}</ListItem.Title>
        <ListItem.Subtitle>{item.properties.straat} {item.properties.huisnummer}</ListItem.Subtitle>
        </TouchableOpacity> 
        </ListItem.Content>
        </ListItem>)}>

        </FlatList>
      </View>
    )
}





