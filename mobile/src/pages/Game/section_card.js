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
       case 2 : backGroundColor = '#c74b1e'; //red
       break;
     }
  

  } else {
     backgroundColor='white';
  }

  return (
    <View style={{
      paddingLeft: 10, paddingRight: 10, flex: 1,
      borderColor: 'gray', borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
      backgroundColor: backGroundColor}}>
      <Text style={{ fontSize: 16 }}>{text}</Text>
      <Text> {value}</Text>
    </View>
  )
}