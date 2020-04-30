import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import Card from './card';
import BackCard from './backcard';
import RightPanel from './right_panel';
import { useRoute } from '@react-navigation/native';
import api from '../../services/api';

export default function Game() {


    const route = useRoute();
    console.log(route.params)
    const { nome, gameId, opponentName } = route.params;

    const [cardCount,setCardCount ]= useState(0);
    const [opponentCardCount, setOpponnetCardCount]=useState(0);

    const [opponentCardData, setOpponentCardData] = useState({
        name: '',
        population: '',
        area: '',
        hdi: '',
        militaryPower: '',
        popDensity: '',
        flag: ''
    });

    const [cardData, setCardData] = useState({
        name: '',
        population: '',
        area: '',
        hdi: '',
        militaryPower: '',
        popDensity: '',
        flag: ''
    });


    useEffect(() => {

        api.get('getCard', { params: { player: nome, gameId } }).then(result => {

            console.log(result.data);

            setCardData({
                name: result.data.card.name,
                population: result.data.card.population,
                area: result.data.card.area,
                hdi: '0,755 (#75)',
                militaryPower: '0,1988 (#10)',
                popDensity: '23 pessoas/km2',
                flag: result.data.card.url
            });

            setOpponentCardData({
                name: result.data.opponentCard.name,
                population: result.data.opponentCard.population,
                area: result.data.opponentCard.area,
                hdi: '0,755 (#75)',
                militaryPower: '0,1988 (#10)',
                popDensity: '23 pessoas/km2',
                flag: result.data.opponentCard.url
            });

            setCardCount(result.data.count);
            setOpponnetCardCount(result.data.opponentCount);


        });
    }, [])

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, margin: 2, flexDirection: 'row' }}>
            
                <BackCard>
                </BackCard>
                <RightPanel nome={opponentName} cardCount={opponentCardCount}>
                </RightPanel>
            </View>
            <View style={{ flex: 1, margin: 2, flexDirection: 'row' }}>
                <Card cardData={cardData}>
                </Card>
                <RightPanel nome={nome} cardCount={cardCount}>
                </RightPanel>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 1,
        marginBottom: 30
    },
});
