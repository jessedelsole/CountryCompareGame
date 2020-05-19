import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';

export default function BackCard() {

    return (
        <View
         
           style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAEBFF', flex: 5, 
           borderWidth: 1, borderColor: 'gray', marginLeft:10,marginRight: 10,marginBottom:4, borderRadius: 10, 
           borderColor: '#707070', padding:10 }}>
            <Image style={{marginTop:-70, marginBottom:15, width: 50, height: 50, resizeMode: 'contain' }} source={require('../../../assets/icon.png')}>
            </Image>
            <Text style={{fontWeight:'bold', color:'#707070'}}>Country Compare Game</Text>
        </View>
    );


}