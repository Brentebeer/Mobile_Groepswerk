import React from 'react';
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


//Pagina List
export default ListDetails = (props) => {

    return (
      <View>
        <Text>Naam:</Text>
        <Text>{props.route.params.attributes.naam}</Text>
        <Text>Type:</Text>
        <Text>{props.route.params.attributes.type}</Text>
        <Text>Publiek:</Text>
        <Text>{props.route.params.attributes.publiek}</Text>
      </View>
    )
}



  const styles = StyleSheet.create({

  });