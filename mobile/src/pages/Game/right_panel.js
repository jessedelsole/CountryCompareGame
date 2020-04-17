import React from 'react';
import { View, Image, Text } from 'react-native';


export default function RightPanel(props) {

    return (
        <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, margin: 2, flexDirection: 'column' }}>
            <View style={{ flex: 1, alignItems:'center', justifyContent:'space-evenly', padding:5 }} >
              <Image style={{}} source={require('../../../assets/user.png')} ></Image>
              <Text style={{}} > {props.nome}</Text>
              <Text style={ { fontSize:25,fontWeight:'bold',textAlign:'center'}} >15</Text>
            </View>
            <View style={{ flex: 1}} >
            </View>
            <View style={{ flex: 1 }} >
            </View>
        </View>
    );


}