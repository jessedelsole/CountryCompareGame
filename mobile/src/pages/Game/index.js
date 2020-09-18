import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Image, TouchableOpacity, BackHandler, Alert, Easing, Animated } from 'react-native';
import Constants from 'expo-constants';
import Card from './card';
import BackCard from './backcard';
import { useRoute, useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import Toast from 'react-native-tiny-toast';
import FlipCard from 'react-native-flip-card';
import Drawer from 'react-native-drawer-menu';
import { Feather } from '@expo/vector-icons';
import getAvatar from './../Game/avatars';

export default function Game() {


    const navigation = useNavigation();
    const route = useRoute();
    const { name, gameId, opponentName, opponentAvatarId, avatarId } = route.params;

    const [cardCount, setCardCount] = useState(0);
    const [opponentCardCount, setOpponnetCardCount] = useState(0);
    const [idxSelected, setIdxSelected] = useState(0);
    const [showOpponentsCard, setShowOpponentsCard] = useState(false);
    const [showCard, setShowCard]= useState(false);
    const [opponentCardData, setOpponentCardData] = useState(new CardData('', '', '', '', '', '', ''));
    const [cardData, setCardData] = useState(new CardData('', '', '', '', '', '', ''));
    const [cardResult, setCardResult] = useState(0);
    const [opponentCardResult, setOpponentCardResult] = useState(0);
    const [indicatorOpponentColor, setIndicatorOpponentColor] = useState('#707070');
    const [indicatorColor, setIndicatorColor] = useState('#ace589');
    const [touchableClickable, setTouchableClickable] = useState(true);
    const [startValueCardX, setStartValueCardX] = useState(new Animated.Value(0));
    const [startValueCardY, setStartValueCardY] = useState(new Animated.Value(0));
    const [startValueOpponentCardX, setStartValueOpponentCardX] = useState(new Animated.Value(0));
    const [startValueOpponentCardY, setStartValueOpponentCardY] = useState(new Animated.Value(0));
    const [cardsVisible, setCardsVisible] = useState(false);


    const drawerRef = useRef(null);

    useEffect(() => {

        _log('*** use Effect *** ');

        global.count = 0;
        global.timeOutCheckIfOpponentHasPlayed = 0;
        global.secondsOnYourTurn = 0;

        _log('settubg efeitoInicial = true');
        global.efeitoInicial = true;

        getRoundInfo();

        const backAction = () => { 
            
            if (global.drawerOpen){
                drawerRef.current.closeDrawer();
            }else
              msgDesejaSar(); return true;
        
        };
        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        return () => backHandler.remove();

    }, []);


    function Animacoes(tipo, toastMsg, end=false) {


        setTimeout(() => {

            const efeito1_abaixa =
                Animated.stagger(250, [
                    Animated.timing(
                        startValueCardY,
                        {
                            toValue: 700,
                            duration: 850,
                            useNativeDriver: true
                        }
                    ),
                    Animated.timing(
                        startValueOpponentCardY,
                        {
                            toValue: 700,
                            duration: 850,
                            useNativeDriver: true
                        }
                    )
                ]);


            const efeito1_desliza_acima =
                Animated.stagger(250, [

                    Animated.timing(
                        startValueOpponentCardY,
                        {
                            toValue: -700,
                            duration: 850,
                            useNativeDriver: true
                        }
                    ),
                    Animated.timing(
                        startValueCardY,
                        {
                            toValue: -700,
                            duration: 850,
                            useNativeDriver: true
                        }
                    )
                ]);

            const efeito2_voltaProLado =

                Animated.parallel([
                    Animated.timing(
                        startValueCardY,
                        {
                            toValue: 0,
                            duration: 0,
                            useNativeDriver: true
                        }
                    ),
                    Animated.timing(
                        startValueOpponentCardY,
                        {
                            toValue: 0,
                            duration: 0,
                            useNativeDriver: true
                        }
                    ),
                    Animated.timing(
                        startValueCardX,
                        {
                            toValue: -500,
                            duration: 0,
                            useNativeDriver: true
                        }
                    ),
                    Animated.timing(
                        startValueOpponentCardX,
                        {
                            toValue: -500,
                            duration: 0,
                            useNativeDriver: true
                        }
                    ),

                ]);


            const efeito3_desliza_direita =
                Animated.stagger(250, [


                    Animated.timing(
                        startValueOpponentCardX,
                        {
                            toValue: 0,
                            duration: 500,
                            useNativeDriver: true
                        }
                    ),
                    Animated.timing(
                        startValueCardX,
                        {
                            toValue: 0,
                            duration: 500,
                            useNativeDriver: true
                        }
                    )
                ]);



            let efeito1;

            if (tipo == 1) //winner
                efeito1 = efeito1_abaixa; else
                if (tipo == 2) //looser
                    efeito1 = efeito1_desliza_acima;

            if (tipo == 0) {//initial effect

                efeito2_voltaProLado.start(() => {
                    setCardsVisible(true);
                    efeito3_desliza_direita.start( ()=>{ if (toastMsg) toastMsg(); setShowCard(true) }  );
                });

            } else 
            if (end){
                Animated.sequence([

                    efeito1,
                    efeito2_voltaProLado
                ]).start(() => { if (toastMsg) toastMsg(); setShowCard(true) });
            
            } else {

                Animated.sequence([

                    efeito1,
                    efeito2_voltaProLado,
                    efeito3_desliza_direita

                ]).start(() => { if (toastMsg) toastMsg(); setShowCard(true) });

            }
        }, 100);
    }

    function getRoundInfo() {

        _log('>getRoundInfo');

        setIdxSelected(0);
        setShowOpponentsCard(false);
        
        setShowCard(false);
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
                setCardData(new CardData(card.card_code, card.name, card.population, card.area, card.hdi,
                    card.safety_index, card.pop_density, card.language, card.currency));
            } else {
                setCardData(new CardData(0, '', '', '', '', '', '', '', ''));
            }

            if (opponentCount > 0) {
                setOpponentCardData(new CardData(opponentCard.card_code, opponentCard.name, opponentCard.population, opponentCard.area, opponentCard.hdi,
                    opponentCard.safety_index, opponentCard.pop_density, opponentCard.language, opponentCard.currency));
            } else {
                setOpponentCardData(new CardData(0, '', '', '', '', '', '', '', ''));
            }

            setCardCount(count);
            setOpponnetCardCount(opponentCount);

            if (count == 0) {

                Animacoes(2, ()=>{ toast(`Não foi dessa vez${name}, você perdeu o jogo!`, 'rgba(252, 186, 156, 0.9)', 3500, require('./../../../assets/medal.png'), true); }, true );
                setTimeout( ()=>{backToMainScreen();},3700)    

            } else
                if (opponentCount == 0) {

                    Animacoes(1, ()=>{ toast(`Parabéns ${name}, você ganhou o jogo!`, 'rgba(173, 229, 138, 0.9)', 3500, require('./../../../assets/trophy.png'), true) }, true );
                    setTimeout( ()=>{backToMainScreen();},3700)    
      
                } else

                    if (global.turn == name) {

                        setIndicatorColor('#ace589');
                        setIndicatorOpponentColor('#707070');
                        
                        setTouchableClickable(true);
                        countSecondsOnYourTurn(true);

                        if (global.efeitoInicial) {
                            _log('efeito inicial  = true');
                            Animacoes(0, ()=>{toast(`Você começa jogando, ${name}! Escolha uma opção abaixo:`, 'rgba(144, 224, 169, 0.9)', 2500); });
                            global.efeitoInicial = false;
                        } else {
                            Animacoes(1, ()=>{toast(`Sua vez de jogar, ${name}! Escolha uma opção abaixo:`, 'rgba(144, 224, 169, 0.9)', 2500);} );
                            _log('efeito inicial  = false');
                        }

                    } else {
                        
                        setIndicatorColor('#707070');
                        setIndicatorOpponentColor('#ace589');
                        setTimeout(() => {
                            checkIfOpponentHasPlayed()
                        }, 2000);


                        if (global.efeitoInicial) {
                            _log('efeito inicial  = true');
                            Animacoes(0, ()=>{ toast(` ${opponentName} começa jogando. Aguarde a jogada do seu oponente...`, 'rgba(239, 249, 164, 0.9)', 2500); });
                            global.efeitoInicial = false;
                        } else {
                            Animacoes(2, ()=>{ toast(`Aguarde enquanto ${opponentName} faz a jogada...`, 'rgba(239, 249, 164, 0.9)', 2500); });
                            _log('efeito inicial  = false');
                        }
                    }
        }).catch(error => {
            Alert.alert('Ops...', `Ocorreu um erro : ${error}`);
        });
    }


    function countSecondsOnYourTurn(initialCall) {

        if (global.turn == undefined) {
            return
        }

        _log(`countSecondsOnYourTurn... ${global.secondsOnYourTurn}, global.turn = ${global.turn}`);

        if (global.secondsOnYourTurn == 30) {
            global.secondsOnYourTurn = 0;
            Alert.alert('Confirmação', `${name}, ainda quer continuar jogando?`, [
                { text: 'Não', onPress: () => goBack(), style: 'cancel' },
                { text: 'Sim', onPress: () => countSecondsOnYourTurn(true) }
            ]);
            return;
        }


        if (initialCall || (!initialCall && global.secondsOnYourTurn > 0)) {

            if (global.secondsOnYourTurn > 0 && global.secondsOnYourTurn % 10 == 0) {
                toast(`É sua vez de jogar, ${name}... Escolha uma opção abaixo!`, 'rgba(144, 224, 169, 0.9)', 2500);
            }

            global.secondsOnYourTurn++;
            setTimeout(() => {
                countSecondsOnYourTurn(false);


            }, 2000);
        }
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

        if (global.turn != name) {
            toast(`É a vez de ${opponentName} jogar!`, 'rgba(239, 249, 164, 0.9)', 2500);
            return;
        }

        global.secondsOnYourTurn = 0;

        setTouchableClickable(false);
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
            }).catch(error => {


                _log(error.reponse);

                if (error.response && error.response.status == 410) {

                    Alert.alert('Ops...', 'Seu adversário saiu do jogo', [
                        { text: 'Ok', onPress: () => goBack() }
                    ]);

                } else {

                    Alert.alert('Ops...', `Ocorreu um erro ${error} tente de novo `);
                    setTouchableClickable(true);
                    setIdxSelected(0);
                }
            });
    }

    function opponentHasPlayed(player_turn) {

        setShowOpponentsCard(true);
        toast('Analisando vencedor...', 'rgba(232, 232, 232, 0.9)');
        setTimeout(() => showWinner(player_turn), 2000);
    }

    function checkIfOpponentHasPlayed() {

        _log(`checkIfOpponentHasPlayed${gameId}[${global.timeOutCheckIfOpponentHasPlayed}/30]`);

        global.timeOutCheckIfOpponentHasPlayed++;


        if (global.timeOutCheckIfOpponentHasPlayed == 10 ||
            global.timeOutCheckIfOpponentHasPlayed == 20) {
            toast(`${opponentName} ainda está pensando..., aguarde`, 'rgba(239, 249, 164, 0.9)', 2500);
        }

        if (global.timeOutCheckIfOpponentHasPlayed == 30) {

            global.timeOutCheckIfOpponentHasPlayed = 0;

            Alert.alert('Confirmação', `${opponentName} está demorando muito para jogar.\nDeseja continuar aguardando?`, [
                { text: 'Não', onPress: () => goBack(), style: 'cancel' },
                { text: 'Sim', onPress: () => checkIfOpponentHasPlayed() }
            ]);
            return;
        }


        if (global.turn == undefined) {
            return;
        }

        api.get('checkCardPlayed', { params: { gameId } }).then((result) => {

            const { idx_played, player_turn } = result.data;

            if (global.turn != undefined) //undefined here means game aborted
                global.turn = player_turn;

            _log('índice clicado = ' + idx_played);

            if (idx_played > 0) {

                //opponent has played 

                global.timeOutCheckIfOpponentHasPlayed = 0;

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


                //opponent has not played yet

                if (global.turn != undefined) {
                    setTimeout(() => {
                        checkIfOpponentHasPlayed();
                    }, 2000);
                }
            }

        }).catch((error) => {


            _log(error.reponse);

            if (error.response && error.response.status == 410) {

                Alert.alert('Ops...', 'Seu adversário saiu do jogo', [
                    { text: 'Ok', onPress: () => goBack() }
                ]);

            } else {


                Alert.alert('Ops...', `Ocorreu um erro : ${error}`, [
                    { text: 'Tentar novamente', onPress: () => checkIfOpponentHasPlayed() }
                ]);


            }


        });
    }

    function goBack() {

        global.turn = undefined;
        navigation.navigate('Login');
        global.timeOutCheckIfOpponentHasPlayed = 0;
        global.secondsOnYourTurn = 0;

        //delete game when users go back to login screen
        api.post('abortGame', { gameId }).then(result => { console.log(result.status) });

    }

    function backToMainScreen() {

        setTimeout(() => {
            goBack();
        }, 2000)
    }


    function toast(msg, color, duration = 2000, img = null, mask = false, maskColor = null) {

        _log('toast:' + msg);

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

    function msgDesejaSar() {

        Alert.alert('Confirmação', 'Deseja mesmo encerrar esta partida?', [
            { text: 'Não', onPress: () => null, style: 'cancel' },
            { text: 'Sim', onPress: () => goBack() }
        ]);
    }


    var drawerContent = (
        <SafeAreaView style={{ backgroundColor: '#FAEBFF', flex: 1 }}>
            <View style={{ alignItems: 'center' }}>
                <Text style={{ marginTop: 18, width: '100%', textAlign: 'center', fontWeight: 'bold', fontSize: 18, color: '#333D79' }}>Country Comparison Game</Text>
                <Image style={{ width: 60, height: 120, resizeMode: 'contain' }} source={require('../../../assets/icon.png')}>
                </Image>
                <TouchableOpacity style={{
                    height: 60, width: '100%', flexDirection: 'row', borderRadius: 0,
                    justifyContent: 'center', alignItems: 'center'
                }}
                    onPress={msgDesejaSar}>
                    <Feather name="arrow-left" size={16} color='#333D79' style={{ flex: 1, paddingLeft: 30 }}></Feather>
                    <Text style={{ color: '#333D79', fontSize: 18, flex: 9, textAlign: 'left', paddingRight: 60 }}>Encerrar jogo</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>);


    return (

        <Drawer
            ref={drawerRef}
            style={styles.container}
            drawerWidth={300}
            drawerContent={drawerContent}
            type={Drawer.types.Overlay}
            onDrawerOpen={() => {global.drawerOpen = true;}}
            onDrawerClose={() => {global.drawerOpen = false; }}
            
            customStyles={{
                drawer: {
                    shadowColor: '#000',
                    shadowOpacity: 0.4,
                    shadowRadius: 10
                },
                mask: {},
                main: {}
            }}
            drawerPosition={Drawer.positions.Right}
            easingFunc={Easing.ease}>

            <SafeAreaView style={styles.container}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 2, marginRight: 10 }}>
                        <Image style={{
                            backgroundColor: 'white', borderRadius: 100, marginLeft: 20, marginBottom: 5,
                            marginTop: 5, width: 42, height: 5, flex: 2, resizeMode: 'cover', borderColor: indicatorOpponentColor, borderWidth: 2
                        }}
                            source={getAvatar(opponentAvatarId) }>
                        </Image>
                    </View>
                    <View style={{ flex: 8, flexDirection: 'column', justifyContent: 'space-around', padding: 5 }}>
                        <Text style={{ color: '#FAEBFF', fontWeight: 'bold', fontSize: 18 }}>{opponentName}</Text>
                        <Text style={{ color: '#FAEBFF', fontSize: 18 }}>{`${opponentCardCount} Cartas`}</Text>
                    </View>
                    <View style={{ flex: 2 }}>
                        <TouchableOpacity onPress={() => { drawerRef.current.openDrawer() }}>
                            <Image style={{ marginRight: 5, marginTop: 12 }}
                                source={require('../../../assets/menu_icon.png')}>
                            </Image>
                        </TouchableOpacity>
                    </View>
                </View>

                {cardsVisible ?
                    <Animated.View style={[{ flex: 5, marginLeft: 10, marginRight: 10, marginBottom: 4 },
                    { transform: [{ translateY: startValueOpponentCardY }, { translateX: startValueOpponentCardX }] }]}>
                        <FlipCard
                            style={{ flex: 1 }}
                            friction={6}
                            perspective={1000}
                            flipHorizontal={true}
                            flipVertical={false}
                            flip={showOpponentsCard}
                            clickable={false}>
                            {/* Face Side */}
                            <BackCard styles={{}}>
                            </BackCard>
                            {/* Back Side */}
                            <Card idxSelected={idxSelected} cardData={opponentCardData} cardResult={opponentCardResult} touchableClickable={false}>
                            </Card>
                        </FlipCard>
                    </Animated.View> : null}


                {cardsVisible ?
                    <Animated.View style={[{ flex: 5, marginLeft: 10, marginRight: 10, marginBottom: 4 },
                    { transform: [{ translateY: startValueCardY }, { translateX: startValueCardX }] }]}>
                       
                       
                       <FlipCard
                            style={{ flex: 1 }}
                            friction={6}
                            perspective={1000}
                            flipHorizontal={true}
                            flipVertical={false}
                            flip={showCard}
                            clickable={false}>
                            {/* Face Side */}
                            <BackCard styles={{}}>
                            </BackCard>
                            {/* Back Side */}
                            <Card
                              idxSelected={idxSelected} cardsOptionClick={cardsOptionClick} cardData={cardData} cardResult={cardResult}
                              touchableClickable={touchableClickable}>
                             </Card>
                        </FlipCard>
                    </Animated.View> : null
                }

                {cardsVisible ? null : <View style={{ flex: 10 }}></View>}


                <View

                    style={{ flex: 1, flexDirection: 'row' }}>
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
                            source={getAvatar(avatarId) }>
                        </Image>
                    </View>
                </View>
            </SafeAreaView>
        </Drawer>
    );
}

class CardData {
    constructor(card_code, countryName, population, area, hdi, safety_index, popDensity, language, currency) {
        this.card_code = card_code;
        this.countryName = countryName;
        this.population = population;
        this.area = area;
        this.hdi = hdi;
        this.safety_index = safety_index;
        this.popDensity = popDensity;
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
