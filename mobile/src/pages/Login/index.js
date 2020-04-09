import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';



export default function Login() {
 

  const navigation = useNavigation();  

   function onPress(){
       navigation.navigate('Game'); 
   }



    return (
    <View style={styles.container}>
      <TouchableOpacity
         onPress = {onPress}>
         
         <Text>Tela de Login</Text>
      
      
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});