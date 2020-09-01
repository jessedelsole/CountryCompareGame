import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';

export default function BackCard(props) {


    const {styles} = props;

    return (
      
        <View
         
           style={ [ {alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAEBFF', 
           borderWidth: 1, borderColor: 'gray', borderRadius: 10, flex:1, 
           borderColor: '#707070', padding:10 }]}>
            <Image style={{marginTop:-70, marginBottom:15, width: 50, height: 50, resizeMode: 'contain' }} source={require('../../../assets/icon.png')}>
            </Image>
            <Text style={{fontWeight:'bold', color:'#707070'}}>Country Compare Game</Text>
        </View>
    );


}