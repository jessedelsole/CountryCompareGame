import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';

export default function SectionCard(props) {

        return (
           
          
            <View  style={{ paddingLeft: 10, paddingRight:10, flex: 1,
              borderColor: 'gray', borderWidth: 1, flexDirection: 'row', justifyContent: 'space-between' ,alignItems: 'center',
              backgroundColor : props.selected?'#a5d5f9':'white'}}>
              
               <Text style={{ fontSize: 16 }}>{props.text}</Text>
               <Text> { props.value}</Text>

          
            </View>
          
           
        )
    
}