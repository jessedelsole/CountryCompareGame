import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import Constants from 'expo-constants';
import Card from './card';
import BackCard from './backcard';
import RightPanel from './right_panel';
import { useRoute, useNavigation } from '@react-navigation/native';
import api from '../../services/api';

export default function Game() {


    const navigation = useNavigation();
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
    const [statusTextBold, setStatusTextBold]=useState(false);


    function showWinner(winner){
      
        setStatusTextBold(true);
        setStatusColor('#e7e7e7');
        if (winner == nome) {

            setStatusText('Você ganhou essa rodada!');
            setCardResult(1);
            setOpponentCardResult(2);
        } else {
            setStatusText('Você perdeu essa rodada...');
            setCardResult(2);
            setOpponentCardResult(1);
        }
        setTimeout(() => getRoundInfo(), 3000);
    }


   function afterCallApiCard( roundWinner){
     
      
        setShowOpponentsCard(true);
        global.turn = roundWinner;
        setStatusText('Analisando vencedor...');
        setStatusTextBold(true);
        setStatusColor('#e7e7e7');
        setTimeout( ()=> showWinner( roundWinner), 2000 );
    }

    const cardsOptionClick = (idxClicked, textClicked) => {
   
        if (global.turn != nome)
            return;

        setIdxSelected(idxClicked);
        setStatusText(`Você escolheu ${textClicked}, revelando carta do adversário...`);
        setStatusTextBold(true);
        setStatusColor('#e7e7e7');
        api.post('cardPlayed', { gameId, idx_played: idxClicked, player: nome }).then(
            result => {
                const { roundWinner } = result.data;

                setTimeout( () => afterCallApiCard(roundWinner) , 2000);
        });  
    }

    function opponentHasPlayed( player_turn){
       
        setShowOpponentsCard(true);
        setStatusText('Analisando vencedor...');
        setTimeout( () => showWinner(player_turn) , 2000);
    }

    function checkIfOpponentHasPlayed() {

        
        api.get('checkCardPlayed', { params: { gameId } }).then((result) => {

            const { idx_played, player_turn } = result.data;
            if (idx_played > 0) {

                console.log('idxPLayed = ' + idx_played);
                setIdxSelected(idx_played);

                let opcaoJogada;
                switch( idx_played){
                    case 1 : opcaoJogada = 'População'
                    break;
                    case 2 : opcaoJogada = 'Área';
                    break;
                    case 3 : opcaoJogada = 'IDH';
                    break;
                    case 4 : opcaoJogada = 'Índice de segurança';
                    break;
                    case 5 : opcaoJogada = 'Densidade pop.';
                    break;
                }
                
                setStatusText(`${opponentName} escolheu: '${opcaoJogada}', revelando a carta... `);
                setStatusColor('#e7e7e7');
                
                setStatusTextBold(true);

                setTimeout( () => opponentHasPlayed(player_turn) , 2000);


            } else {

                setTimeout(() => {
                    checkIfOpponentHasPlayed()
                }, 2000);
            }
        });
    }

    function backToMainScreen(){

         setTimeout( () => { global.gameId=0; navigation.goBack(); },2000)
    }

    function getRoundInfo() {

        setIdxSelected(0);
        setShowOpponentsCard(false);
        setStatusTextBold(false);
        setCardResult(0);
        setOpponentCardResult(0);

        api.get('getCard', { params: { player: nome, gameId } }).then(result => {

            
           
            const { card, opponentCard, count, opponentCount, player_turn } = result.data;

            console.log(card);

            if (count > 0) {
                setCardData(new CardData(card.name, card.population, card.area, card.hdi , card.safety_index, card.pop_density, card.url));
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

            //Noruega, Suiça    

            if (count==0){

                setStatusText('Você perdeu o jogo!');
                setStatusColor('#fb5454');
                setStatusTextBold(false);
                backToMainScreen();

            } else 
            if (opponentCount==0){

                setStatusText('Você ganhou!!');
                setStatusColor('#ace589');
                setStatusTextBold(false);
                backToMainScreen();
            }else

            if (global.turn == nome) {
 
                setStatusText('Sua vez de jogar! Escolha uma opção abaixo:');
                setStatusColor('#8edfa7');
                setStatusTextBold(false);
            } else {
                setStatusText(`Aguarde enquanto ${opponentName} faz a jogada...`);
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
        <SafeAreaView style={styles.container}>
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

            <View style={{  backgroundColor: statusColor, borderColor: '#b4b4b4', borderRadius: 5, borderWidth: 1 }}>
                <Text style={{ fontWeight: statusTextBold?'bold':'normal', padding: 10 }}>{statusText}</Text>
            </View>
            <View style={{ flex: 1, margin: 2, flexDirection: 'row' }}>

                {cardCount > 0 ?
                    <Card idxSelected={idxSelected} cardsOptionClick={cardsOptionClick} cardData={cardData} cardResult={cardResult} >
                    </Card> : null
                }
                <RightPanel nome={nome} cardCount={cardCount}>
                </RightPanel>
            </View>
        </SafeAreaView>
    );
}


class CardData {
    constructor(countryName, population, area, hdi, safety_index, popDensity, flag) {
        this.countryName = countryName;
        this.population = population;
        this.area = area;
        this.hdi = hdi;
        this.safety_index = safety_index;
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
        
    },
});
