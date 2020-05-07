import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Constants from 'expo-constants';
import Card from './card';
import BackCard from './backcard';
import RightPanel from './right_panel';
import { useRoute } from '@react-navigation/native';
import api from '../../services/api';

export default function Game() {


    const route = useRoute();
    const { nome, gameId, opponentName } = route.params;

    const [cardCount, setCardCount] = useState(0);
    const [opponentCardCount, setOpponnetCardCount] = useState(0);
    const [statusText, setStatusText] = useState('');
    const [statusColor, setStatusColor] = useState('#fff');
    const [idxSelected, setIdxSelected] = useState(0);
    const [showOpponentsCard, setShowOpponentsCard] = useState(false);
    const [opponentCardData, setOpponentCardData] = useState(new CardData('', '', '', '', '', '', ''));
    const [cardData, setCardData] = useState(new CardData('', '', '', '', '', '', ''));
    const [cardResult, setCardResult]=useState(0);
    const [opponentCardResult, setOpponentCardResult]=useState(0);


    function showWinner(winner){

        if (winner == nome) {

            setStatusText('Você ganhou essa rodada!');
            setStatusColor('#ace589');
            setCardResult(1);
            setOpponentCardResult(2);
        } else {
            setStatusText('Você perdeu essa rodada...');
            setStatusColor('#c74b1e');
            setCardResult(2);
            setOpponentCardResult(1);
           
        }
        setTimeout(() => getRoundInfo(), 3000);
    }


   function afterCallApiCard( roundWinner){
     
        console.log("afterCallApiCard, roundWinner = " + roundWinner);
        setShowOpponentsCard(true);
        global.turn = roundWinner;
        setStatusText('Analisando vencedor...');
        setStatusColor('#eff9a5');
        setTimeout( ()=> showWinner( roundWinner), 2000 );
    }

    const cardsOptionClick = (idxClicked, textClicked) => {
   
        if (global.turn != nome)
            return;

        setIdxSelected(idxClicked);
        setStatusText(`Você escolheu ${textClicked}, revelando carta do adversário...`)
        setStatusColor('#cbd7fb');
        api.post('cardPlayed', { gameId, idx_played: idxClicked, player: nome }).then(
            result => {
                const { roundWinner } = result.data;

                setTimeout( () => afterCallApiCard(roundWinner) , 2000);
        });

        
    }

    function opponentHasPlayed(idx_played){

    } 

    function checkIfOpponentHasPlayed() {

        api.get('checkCardPlayed', { params: { gameId } }).then((result) => {

            const { idx_played } = result.data;
            if (idx_played > 0) {

                setShowOpponentsCard(true);
                setIdxSelected(idx_played);

                setTimeout(() => {

                    getRoundInfo();
                }, 2000);


            } else {

                setTimeout(() => {
                    checkIfOpponentHasPlayed()
                }, 2000);
            }
        });
    }

    function getRoundInfo() {

        setIdxSelected(0);
        setShowOpponentsCard(false);
        setCardResult(0);
        setOpponentCardResult(0);

        api.get('getCard', { params: { player: nome, gameId } }).then(result => {

            console.log(result.data);
            const { card, opponentCard, count, opponentCount, player_turn } = result.data;

            if (count > 0) {
                setCardData(new CardData(card.name, card.population, card.area, '0,755 (#75)', '0,1988 (#10)', '23 pessoas/km2', card.url));
            } else {
                setCardData(new CardData('', '', '', '', '', '', ''));
            }

            if (opponentCount > 0) {
                setOpponentCardData(new CardData(opponentCard.name, opponentCard.population, opponentCard.area, '0,755 (#75)', '0,1988 (#10)', '23 pessoas/km2', opponentCard.url));
            } else {
                setOpponentCardData(new CardData('', '', '', '', '', '', ''));
            }

            setCardCount(count);
            setOpponnetCardCount(opponentCount);

            global.turn = player_turn;

            if (global.turn == nome) {

                setStatusText('Sua vez de jogar! Escolha uma opção abaixo!');
                setStatusColor('#8edfa7');
            } else {
                setStatusText(`Aguarde enquanto ${opponentName} faz a jogada!`);
                setStatusColor('#eff9a5');

                setTimeout(() => {
                    checkIfOpponentHasPlayed()
                }, 2000);
            }
        });
    }

    useEffect(() => {

        getRoundInfo();
    }, [])

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, margin: 2, flexDirection: 'row' }}>
                {
                    opponentCardCount > 0 ?
                        (showOpponentsCard ?
                            <Card idxSelected={idxSelected} cardData={opponentCardData} cardResult={opponentCardResult}>
                            </Card> :
                            <BackCard>
                            </BackCard>) : null
                }
                <RightPanel nome={opponentName} cardCount={opponentCardCount}>
                </RightPanel>
            </View>

            <View style={{ backgroundColor: statusColor, borderColor: '#b4b4b4', borderRadius: 5, borderWidth: 1 }}>
                <Text style={{ padding: 10 }}>{statusText}</Text>
            </View>
            <View style={{ flex: 1, margin: 2, flexDirection: 'row' }}>

                {cardCount > 0 ?
                    <Card idxSelected={idxSelected} cardsOptionClick={cardsOptionClick} cardData={cardData} cardResult={cardResult} >
                    </Card> : null
                }
                <RightPanel nome={nome} cardCount={cardCount}>
                </RightPanel>
            </View>
        </View>
    );
}


class CardData {
    constructor(countryName, population, area, hdi, militaryPower, popDensity, flag) {
        this.countryName = countryName;
        this.population = population;
        this.area = area;
        this.hdi = hdi;
        this.militaryPower = militaryPower;
        this.popDensity = popDensity;
        this.flag = flag;
    }
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
