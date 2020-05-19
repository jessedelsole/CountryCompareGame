import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

export default function SectionCard(props) {

  const { selected, text, value, cardResult } = props;

  let backGroundColor;
  if (selected){

     switch (cardResult){
       case 0 : backGroundColor = '#a5d5f9'; //blue
       break;
       case 1 : backGroundColor = '#ace589'; //green
       break;
       case 2 : backGroundColor = '#fb5454'; //red
       break;
     }
  

  } else {
    backGroundColor='white';
  }


  return (
    <View style={{
      paddingLeft: 10, paddingRight: 10, flex: 1,
      borderColor: 'gray', borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
      backgroundColor: backGroundColor, borderRadius: 8, marginBottom:4}}>
      <Text style={{color:'#707070', fontSize: 16, fontWeight:'bold' }}>{text}</Text>
      <Text style={{color:'#707070', fontSize: 16 }}>{value}</Text>
    </View>
  )
}