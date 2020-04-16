import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function SectionCard(props) {

  
      
        return (
            <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, flexDirection: 'row' }} >

                <View style={{ flex: 1, paddingLeft: 5, borderColor: 'gray', borderWidth: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                    <Text style={{ fontSize: 16 }}>{props.text}</Text>
                </View>

                <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }} >
                    <Text>{props.value}</Text>
                </View>
            </View>
        )
    
}