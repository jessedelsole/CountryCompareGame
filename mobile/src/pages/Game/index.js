import React from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import Card from './card';
import RightPanel from './right_panel';
import {useRoute} from '@react-navigation/native';

export default function Game (){

   const cardData = {
        name: 'Brasil',
        population: '209.3 milhões',
        area: '8.511.000 km2',
        hdi: '0,755 (#75)',
        militaryPower: '0,1988 (#10)',
        popDensity: '23 pessoas/km2',
        flag: 'http://www.flags.net/images/largeflags/BRAZ0001.GIF'
    }

    const route = useRoute();

    const nome = route.params.nome;
    


        return (
            <View style={styles.container}>
                <View style={{ flex: 1, margin: 2, flexDirection: 'row' }}>
                    <Card cardData={cardData}>
                    </Card>
                    <RightPanel nome = {'adversário'}>
                    </RightPanel>
                </View>
                <View style={{ flex: 1, margin: 2, flexDirection: 'row' }}>
                    <Card cardData={cardData}>
                    </Card>
                    <RightPanel nome = {nome}>
                    </RightPanel>
                </View>
            </View>
        );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight + 30,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 1,
        marginBottom: 30



    },
});