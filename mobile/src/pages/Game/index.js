import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Constants from 'expo-constants';
import Card from './card';
import BackCard from './backcard';
import RightPanel from './right_panel';
import { useRoute } from '@react-navigation/native';
import api from '../../services/api';

export default function Game() {

    let turn = '';

    const route = useRoute();
   
    console.log(route.params)
    const { nome, gameId, opponentName } = route.params;

    
    const [cardCount        , setCardCount        ] = useState(0);
    const [opponentCardCount, setOpponnetCardCount] = useState(0);
    const [statusText       , setStatusText       ] = useState('');
    const [statusColor      , setStatusColor      ] = useState('#fff');
    const [idxSelected      , setIdxSelected      ] = useState(0);
    const [showOpponentsCard, setShowOpponentsCard] = useState(false);

    const [opponentCardData, setOpponentCardData]   = useState({
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


    const cardsOptionClick= (idxClicked)=> {
       
        setIdxSelected(idxClicked);

        console.log('cardsOptionClick');
        
        api.post('cardPlayed', {gameId, idx_played:idxClicked, player:nome } ).then(  
             result=>{ 
                
                const { roundWinner } = result.data;
                console.log('roundWinner: ' + roundWinner);
                setShowOpponentsCard(true);

                turn = roundWinner;

                if (turn == nome){

                    setStatusText('Sua vez de jogar! Escolha uma opção abaixo!');
                    setStatusColor('#8edfa7');
                } else {
                    setStatusText(`Aguarde enquanto ${opponentName} faz a jogada!`);
                    setStatusColor('#eff9a5');
                }

                setTimeout( () => getRoundInfo(), 2000);



            });
    }

    function getRoundInfo(){
       
        setIdxSelected(0);
        setShowOpponentsCard(false);

        api.get('getCard', { params: { player: nome, gameId } }).then(result => {

            console.log(result.data);
            const {card, opponentCard, count, opponentCount, player_turn}= result.data;

            if (count>0){
              setCardData({
                  name: card.name,
                  population: card.population,
                  area: card.area,
                  hdi: '0,755 (#75)',
                  militaryPower: '0,1988 (#10)',
                  popDensity: '23 pessoas/km2',
                  flag: card.url
              });
            } else {
                setCardData({
                    name: '',
                    population: 0,
                    area: 0,
                    hdi: '',
                    militaryPower: '',
                    popDensity: '',
                    flag: ''}); 
            }

            if (opponentCount>0){
              setOpponentCardData({
                  name: opponentCard.name,
                  population: opponentCard.population,
                  area: opponentCard.area,
                  hdi: '0,755 (#75)',
                  militaryPower: '0,1988 (#10)',
                  popDensity: '23 pessoas/km2',
                  flag: opponentCard.url
               });
            } else {
                setOpponentCardData({
                    name: '',
                    population: 0,
                    area: 0,
                    hdi: '',
                    militaryPower: '',
                    popDensity: '',
                    flag: ''
                });   
            }

            setCardCount(count);
            setOpponnetCardCount(opponentCount);

            turn = player_turn;   

            if (turn == nome){

                setStatusText('Sua vez de jogar! Escolha uma opção abaixo!');
                setStatusColor('#8edfa7');
            } else {
                setStatusText(`Aguarde enquanto ${opponentName} faz a jogada!`);
                setStatusColor('#eff9a5');
            }
        });
    }

    useEffect( () => {

       getRoundInfo();
       
    }, [])

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, margin: 2, flexDirection: 'row' }}>
                
                
                { 
                 opponentCardCount>0?
                    (showOpponentsCard ?
                    <Card idxSelected={idxSelected} cardData={opponentCardData}>
                    </Card>:
                    <BackCard>
                    </BackCard>): null
                }
                <RightPanel nome={opponentName} cardCount={opponentCardCount}>
                </RightPanel>
            </View>

            <View style={{backgroundColor: statusColor, borderColor: '#b4b4b4', borderRadius:5, borderWidth:1}}>
                 <Text style={{padding:10}}>{statusText}</Text>
            </View>
            <View  style={{ flex: 1, margin: 2,  flexDirection: 'row' }}>
                
                {cardCount>0?
                <Card idxSelected={idxSelected} cardsOptionClick = {cardsOptionClick}  cardData={cardData}>
                </Card> : null
                }
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
