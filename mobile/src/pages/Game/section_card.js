import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class SectionCard extends React.Component {

    render() {
        const cardData = this.props.cardData;
        return (
            <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, flexDirection: 'row' }} >

                <View style={{ flex: 1, paddingLeft: 5, borderColor: 'gray', borderWidth: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                    <Text style={{ fontSize: 16 }}>{this.props.text}</Text>
                </View>

                <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }} >
                    <Text>{this.props.value}</Text>
                </View>
            </View>
        )
    }
}