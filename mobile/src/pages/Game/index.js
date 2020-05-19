import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import Card from './card';
import BackCard from './backcard';
import RightPanel from './right_panel';
import { useRoute, useNavigation } from '@react-navigation/native';
import api from '../../services/api';


export default function Game() {


    const navigation = useNavigation();
    const route = useRoute();
    const { name, gameId, opponentName } = route.params;

    const [cardCount, setCardCount] = useState(0);
    const [opponentCardCount, setOpponnetCardCount] = useState(0);
    const [statusText, setStatusText] = useState('');
    const [statusColor, setStatusColor] = useState('#fff');
    const [idxSelected, setIdxSelected] = useState(0);
    const [showOpponentsCard, setShowOpponentsCard] = useState(false);
    const [opponentCardData, setOpponentCardData] = useState(new CardData('', '', '', '', '', '', ''));
    const [cardData, setCardData] = useState(new CardData('', '', '', '', '', '', ''));
    const [cardResult, setCardResult] = useState(0);
    const [opponentCardResult, setOpponentCardResult] = useState(0);
    const [statusTextBold, setStatusTextBold] = useState(false);
    const [indicatorOpponentColor, setIndicatorOpponentColor] = useState('#707070');
    const [indicatorColor, setIndicatorColor] = useState('#ace589');


    function showWinner(winner) {

        console.log('winner = '+ winner);
        console.log('name = '+ name);

        setStatusTextBold(true);
        setStatusColor('#e7e7e7');
 
        if (winner == name) {

           // setStatusText('Você ganhou essa rodada!');
            setCardResult(1);
            setOpponentCardResult(2);
            console.log('winner');
            

        } else {
           // setStatusText('Você perdeu essa rodada...');
            setCardResult(2);
            setOpponentCardResult(1);
            console.log('looser');
       
        }
        setTimeout(() => getRoundInfo(), 3000);
    }


    function afterCallApiCard(roundWinner) {


        setShowOpponentsCard(true);
        global.turn = roundWinner;
        setStatusText('Analisando vencedor...');
        setStatusTextBold(true);
        setStatusColor('#e7e7e7');
        setTimeout(() => showWinner(roundWinner), 2000);
    }

    const cardsOptionClick = (idxClicked, textClicked) => {

        if (global.turn != name)
            return;

        setIdxSelected(idxClicked);
        setStatusText(`Você escolheu ${textClicked}, revelando carta do adversário...`);
        setStatusTextBold(true);
        setStatusColor('#e7e7e7');
        api.post('cardPlayed', { gameId, idx_played: idxClicked, player: name }).then(
            result => {
                const { roundWinner } = result.data;

                setTimeout(() => afterCallApiCard(roundWinner), 2000);
            });
    }

    function opponentHasPlayed(player_turn) {

        setShowOpponentsCard(true);
        setStatusText('Analisando vencedor...');
        setTimeout(() => showWinner(player_turn), 2000);
    }

    function checkIfOpponentHasPlayed() {


        api.get('checkCardPlayed', { params: { gameId } }).then((result) => {

            const { idx_played, player_turn } = result.data;
            if (idx_played > 0) {

               
                setIdxSelected(idx_played);

                let opcaoJogada;
                switch (idx_played) {
                    case 1: opcaoJogada = 'População'
                        break;
                    case 2: opcaoJogada = 'Área';
                        break;
                    case 3: opcaoJogada = 'IDH';
                        break;
                    case 4: opcaoJogada = 'Índice de segurança';
                        break;
                    case 5: opcaoJogada = 'Densidade pop.';
                        break;
                }

                setStatusText(`${opponentName} escolheu: '${opcaoJogada}', revelando a carta... `);
                setStatusColor('#e7e7e7');

                setStatusTextBold(true);

                setTimeout(() => opponentHasPlayed(player_turn), 2000);


            } else {

                setTimeout(() => {
                    checkIfOpponentHasPlayed()
                }, 2000);
            }
        });
    }

    function backToMainScreen() {

        setTimeout(() => { global.gameId = 0; navigation.goBack(); }, 2000)
    }

    function getRoundInfo() {

        setIdxSelected(0);
        setShowOpponentsCard(false);
        setStatusTextBold(false);
        setCardResult(0);
        setOpponentCardResult(0);

        api.get('getCard', { params: { player: name, gameId } }).then(result => {

            const { card, opponentCard, count, opponentCount, player_turn } = result.data;

       
            if (count > 0) {
                setCardData(new CardData(card.name, card.population, card.area, card.hdi, card.safety_index, card.pop_density, card.url));
            } else {
                setCardData(new CardData('', '', '', '', '', '', ''));
            }

            if (opponentCount > 0) {
                setOpponentCardData(new CardData(opponentCard.name, opponentCard.population, opponentCard.area, opponentCard.hdi, opponentCard.safety_index, opponentCard.pop_density, opponentCard.url));
            } else {
                setOpponentCardData(new CardData('', '', '', '', '', '', ''));
            }

            setCardCount(count);
            setOpponnetCardCount(opponentCount);

            global.turn = player_turn;

            if (count == 0) {

                setStatusText('Você perdeu o jogo!');
                setStatusColor('#fb5454');
                setStatusTextBold(false);
                backToMainScreen();

            } else
                if (opponentCount == 0) {

                    setStatusText('Você ganhou!!');
                    setStatusColor('#ace589');
                    setStatusTextBold(false);
                    backToMainScreen();
                } else

                    if (global.turn == name) {

                        setIndicatorColor('#ace589');
                        setIndicatorOpponentColor('#707070');
                        setStatusText('Sua vez de jogar! Escolha uma opção abaixo:');
                        setStatusColor('#8edfa7');
                        setStatusTextBold(false);
                    } else {
                        setStatusText(`Aguarde enquanto ${opponentName} faz a jogada...`);
                        setStatusColor('#eff9a5');
                        setIndicatorColor('#707070');
                        setIndicatorOpponentColor('#ace589');

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
       
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 2, marginRight: 10 }}>
                    <Image style={{ backgroundColor: 'white', borderRadius: 100, marginLeft: 20, marginBottom: 5, 
                      marginTop: 5, width: 42, height: 5, flex: 2, resizeMode: 'cover', borderColor:indicatorOpponentColor,borderWidth:2}}
                        source={require('../../../assets/avatar_1.png')}>
                    </Image>
                </View>
                <View style={{ flex: 8, flexDirection: 'column', justifyContent: 'space-around', padding: 5 }}>
                    <Text style={{ color: '#FAEBFF', fontWeight: 'bold', fontSize: 18 }}>{opponentName}</Text>
                    <Text style={{ color: '#FAEBFF', fontSize: 18 }}>{`${opponentCardCount} Cartas`}</Text>
                </View>
                <View style={{ flex: 2 }}>
                    <TouchableOpacity>
                        <Image style={{ marginRight: 5, marginTop: 12 }}
                            source={require('../../../assets/menu_icon.png')}>
                        </Image>
                    </TouchableOpacity>
                </View>
            </View>

            {opponentCardCount > 0 ?
                (showOpponentsCard ?
                    <Card idxSelected={idxSelected} cardData={opponentCardData} cardResult={opponentCardResult}>
                    </Card> :
                    <BackCard>
                    </BackCard>) : null
            }

           

            <Card idxSelected={idxSelected} cardsOptionClick={cardsOptionClick} cardData={cardData} cardResult={cardResult} >
            </Card>

            <View style={{ flex: 1, flexDirection: 'row' }}>

                <View style={{ flex: 2, marginRight: 10 }}>

                </View>

                <View style={{ flex: 8, flexDirection: 'column', justifyContent: 'flex-end', padding: 5, marginRight: 10 }}>
                    <Text style={{ color: '#FAEBFF', fontWeight: 'bold', fontSize: 18, textAlign: 'right' }}>{name}</Text>
                    <Text style={{ color: '#FAEBFF', fontSize: 18, textAlign: 'right' }}>{`${cardCount} Cartas`}</Text>
                </View>
                <View style={{ flex: 2 }}>

                    <Image style={{ backgroundColor: 'white', borderRadius: 100, marginRight: 20, marginBottom: 5,
                      marginTop: 5, width: 42, height: 5, flex: 2, resizeMode: 'cover',borderColor:indicatorColor,borderWidth:2 }}
                        source={require('../../../assets/avatar_2.png')}>
                    </Image>
                </View>
            </View>
           
        </SafeAreaView>
      
    );
}


class CardData {
    constructor(countryName, population, area, hdi, safety_index, popDensity, flag, map, idiom, currency) {
        this.countryName = countryName;
        this.population = population;
        this.area = area;
        this.hdi = hdi;
        this.safety_index = safety_index;
        this.popDensity = popDensity;
        this.flag = flag;
        this.map = map;
        this.idiom = idiom;
        this.currency = currency;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333D79',
        paddingTop: Constants.statusBarHeight,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 1,

    },
});
