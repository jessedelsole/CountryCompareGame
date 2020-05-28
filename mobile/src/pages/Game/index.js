import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import Card from './card';
import BackCard from './backcard';
import { useRoute, useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import Toast from 'react-native-tiny-toast';
import FlipCard from 'react-native-flip-card';



export default function Game() {


    const navigation = useNavigation();
    const route = useRoute();
    const { name, gameId, opponentName } = route.params;

    const [cardCount, setCardCount] = useState(0);
    const [opponentCardCount, setOpponnetCardCount] = useState(0);
    const [idxSelected, setIdxSelected] = useState(0);
    const [showOpponentsCard, setShowOpponentsCard] = useState(false);
    const [opponentCardData, setOpponentCardData] = useState(new CardData('', '', '', '', '', '', ''));
    const [cardData, setCardData] = useState(new CardData('', '', '', '', '', '', ''));
    const [cardResult, setCardResult] = useState(0);
    const [opponentCardResult, setOpponentCardResult] = useState(0);
    const [indicatorOpponentColor, setIndicatorOpponentColor] = useState('#707070');
    const [indicatorColor, setIndicatorColor] = useState('#ace589');

    function toast(msg, color, duration = 2000, img = null, mask = false, maskColor = null) {

        Toast.show(msg, {
            position: Toast.position.CENTER,
            containerStyle: { backgroundColor: color },
            textStyle: {},
            imgStyle: {},
            mask: mask,
            maskColor: maskColor,
            maskStyle: {},
            textColor: 'rgba(112, 112, 112, 0.9)',
            duration: duration,
            imgSource: img
        });
    }

    const showtime = () => {

        var min = new Date().getMinutes();
        var sec = new Date().getSeconds();

        return min + ':' + sec
    }

    function _log(log) {
        console.log(`[Mobile]${showtime()} (${name}): ${log}`);

    }

    function showWinner(winner) {

        _log('winner = ' + winner);

        if (winner == name) {

            toast('Você ganhou essa rodada!', 'rgba(173, 229, 138, 0.9)');
            setCardResult(1);
            setOpponentCardResult(2);

        } else {

            toast('Você perdeu essa rodada...', 'rgba(251, 86, 86, 0.9)');
            setCardResult(2);
            setOpponentCardResult(1);
        }
        setTimeout(() => getRoundInfo(), 3000);
    }


    function afterCallApiCard(roundWinner) {

        setShowOpponentsCard(true);
        toast('Analisando vencedor...', 'rgba(232, 232, 232, 0.9)');
        setTimeout(() => showWinner(roundWinner), 2000);
    }

    const cardsOptionClick = (idxClicked, textClicked) => {

        if (global.turn != name)
            return;

        setIdxSelected(idxClicked);

        toast(`Você escolheu ${textClicked}, revelando carta do adversário...`, 'rgba(232, 232, 232, 0.9)');

        _log('cardOptionClick:' + idxClicked);
        api.post('cardPlayed', { gameId, idx_played: idxClicked, player: name }).then(
            result => {
                const { roundWinner, status_other_player } = result.data;

                if (status_other_player == 0) {
                    global.turn = roundWinner;
                    setTimeout(() => afterCallApiCard(roundWinner), 2000);
                } else { //other player not ready yet, wait a bit more
                    _log('other player not ready yet...');
                    setTimeout(() => cardsOptionClick(idxClicked, textClicked), 1000);
                }
            });
    }

    function opponentHasPlayed(player_turn) {

        setShowOpponentsCard(true);
        toast('Analisando vencedor...', 'rgba(232, 232, 232, 0.9)');
        setTimeout(() => showWinner(player_turn), 2000);
    }

    function checkIfOpponentHasPlayed() {

        _log('checkIfOpponentHasPlayed...');

        api.get('checkCardPlayed', { params: { gameId } }).then((result) => {

            const { idx_played, player_turn } = result.data;

            global.turn = player_turn;

            _log('índice clicado = ' + idx_played);

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

                toast(`${opponentName} escolheu: '${opcaoJogada}', revelando a carta... `, 'rgba(232, 232, 232, 0.9)');
                setTimeout(() => opponentHasPlayed(player_turn), 2000);


            } else {

                setTimeout(() => {
                    checkIfOpponentHasPlayed()
                }, 2000);
            }
        });
    }

    function backToMainScreen() {

        setTimeout(() => {
            global.turn = undefined;
            global.gameId = 0;
            navigation.goBack();
        }, 2000)
    }

    function getRoundInfo() {

        _log('>getRoundInfo');

        setIdxSelected(0);
        setShowOpponentsCard(false);
        setCardResult(0);
        setOpponentCardResult(0);

        api.get('getCard', { params: { player: name, gameId } }).then(result => {

            const { card, opponentCard, count, opponentCount, player_turn, idx_played } = result.data;


            _log('<getRoundInfo, idx_played atual =  ' + idx_played);

            if (global.turn === undefined) {
                global.turn = player_turn;
                _log('assumindo vez pela primeira vez : ' + global.turn);
            }

            if (count > 0) {
                setCardData(new CardData(card.name, card.population, card.area, card.hdi,
                    card.safety_index, card.pop_density, card.url, card.map, card.language, card.currency));
            } else {
                setCardData(new CardData('', '', '', '', '', '', ''));
            }

            if (opponentCount > 0) {
                setOpponentCardData(new CardData(opponentCard.name, opponentCard.population, opponentCard.area, opponentCard.hdi,
                    opponentCard.safety_index, opponentCard.pop_density, opponentCard.url, opponentCard.map, opponentCard.language, opponentCard.currency));
            } else {
                setOpponentCardData(new CardData('', '', '', '', '', '', ''));
            }

            setCardCount(count);
            setOpponnetCardCount(opponentCount);



            if (count == 0) {


                toast(`Não foi dessa vez${name}, você perdeu o jogo!`, 'rgba(252, 186, 156, 0.9)', 3500, require('./../../../assets/medal.png'), true,
                    'rgba(252, 238, 156, 0.9)');

                backToMainScreen();

            } else
                if (opponentCount == 0) {


                    toast(`Parabéns ${name}, você ganhou o jogo!`, 'rgba(173, 229, 138, 0.9)', 3500, require('./../../../assets/trophy.png'), true,
                        'rgba(138, 174, 229, 0.9)');

                    backToMainScreen();
                } else

                    if (global.turn == name) {

                        setIndicatorColor('#ace589');
                        setIndicatorOpponentColor('#707070');
                        toast(`Sua vez de jogar, ${name}! Escolha uma opção abaixo:`, 'rgba(144, 224, 169, 0.9)', 2500);

                    } else {
                        toast(`Aguarde enquanto ${opponentName} faz a jogada...`, 'rgba(239, 249, 164, 0.9)', 2500)
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
                    <Image style={{
                        backgroundColor: 'white', borderRadius: 100, marginLeft: 20, marginBottom: 5,
                        marginTop: 5, width: 42, height: 5, flex: 2, resizeMode: 'cover', borderColor: indicatorOpponentColor, borderWidth: 2
                    }}
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


         

            <FlipCard
                style={{flex:5}}
                friction={6}
                perspective={0}
                flipHorizontal={true}
                flipVertical={false}
                flip={showOpponentsCard}
                clickable={false}
                onFlipEnd={(isFlipEnd) => { console.log('isFlipEnd', isFlipEnd) }}
            >
                {/* Face Side */}
                <BackCard>
                </BackCard>
                {/* Back Side */}
                <Card idxSelected={idxSelected} cardData={opponentCardData} cardResult={opponentCardResult}>
                </Card> 
            </FlipCard>

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

                    <Image style={{
                        backgroundColor: 'white', borderRadius: 100, marginRight: 20, marginBottom: 5,
                        marginTop: 5, width: 42, height: 5, flex: 2, resizeMode: 'cover', borderColor: indicatorColor, borderWidth: 2
                    }}
                        source={require('../../../assets/avatar_2.png')}>
                    </Image>
                </View>
            </View>

        </SafeAreaView>

    );
}


class CardData {
    constructor(countryName, population, area, hdi, safety_index, popDensity, flag, map, language, currency) {
        this.countryName = countryName;
        this.population = population;
        this.area = area;
        this.hdi = hdi;
        this.safety_index = safety_index;
        this.popDensity = popDensity;
        this.flag = flag;
        this.map = map;
        this.language = language;
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
