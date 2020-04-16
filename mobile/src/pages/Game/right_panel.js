import React from 'react';
import { View, Image, Text } from 'react-native';


export default function RightPanel(props) {

    return (
        <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, margin: 2, flexDirection: 'column' }}>
            <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, alignItems:'center', justifyContent:'flex-start', padding:5 }} >
              <Image source={require('../../../assets/user.png')} ></Image>
              <Text>{props.nome}</Text>
            </View>
            <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1 }} >
            </View>
            <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1 }} >
            </View>
        </View>
    );


}