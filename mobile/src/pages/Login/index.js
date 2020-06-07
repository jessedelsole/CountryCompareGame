import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, Image, TextInput, KeyboardAvoidingView, View, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import api from '../../services/api';
import Btn from 'react-native-micro-animated-button';


export default function Login() {

  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [waitingText, setWaitingText]= useState('');
  const loginButtonRef = useRef(null);


  useEffect(() => {

    global.timeOutLoginCount = 0;

  }, []);

  function onBtnClick() {

    console.log('Login -> onBtnCLick');
    if (name == '') {
      Alert.alert('Erro', 'Por favor informe um nome!');
      loginButtonRef.current.reset();
      return;
    }

    setWaitingText('Aguarde, procurando um oponente online...');
    postLookForOpponent(0);
  }

  function postLookForOpponent(gameId) {

    setCarregando(true);

    console.log(`post(LookForOpponent(${name}, ${gameId} [${global.timeOutLoginCount}/20])`);
    api.post('lookForOpponent', { player: name, gameId }).then(result => trataResultadoPost(result))
      .catch(error => {
        Alert.alert('Erro', `Ocorreu um erro : ${error}`);
        loginButtonRef.current.reset();
        setCarregando(false);
      });
  }

  function trataResultadoPost(result) {

    const { opponentName, return_gameId } = result.data;

    if (result.data.return_status == 2) {
      
      //everything ready to start:

      loginButtonRef.current.reset();
      setCarregando(false);
      global.timeOutLoginCount = 0;
      navigation.navigate('Game', { name, gameId:return_gameId, opponentName });
    
    } else {

      global.timeOutLoginCount++;
      
      if (global.timeOutLoginCount==10){
        setWaitingText('Ainda aguardando oponente....');
      }
      
      if (global.timeOutLoginCount >= 20) {

        loginButtonRef.current.reset();
        setCarregando(false);
        Alert.alert('Sem jogares online', 'No momento não há jogadores online. Tente convidar algum amigo para jogar também.');
        global.timeOutLoginCount = 0;

        api.post('abortGame', { gameId:return_gameId }).then(result => { console.log(result.data) });

      } else {
       
        setTimeout( () => postLookForOpponent( return_gameId ), 2000);
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior='height' style={styles.container}>

      <Text style={{ width: '100%', textAlign: 'center', fontWeight: 'bold', fontSize: 28, color: '#333D79' }}>Country Compare Game</Text>
      <Image style={{ width: '100%', height: 120, resizeMode: 'contain' }} source={require('../../../assets/icon.png')}>
      </Image>

      <View style={{ width: '100%' }}>
        <Text style={{ marginBottom: 10, color: '#333D79', fontSize: 20 }}>Digite seu nome para começar: </Text>


        <TextInput style={{ width: '100%' }}
          editable={!carregando}
          style={{
            width: '100%', height: 60, borderColor: '#707070', borderWidth: 1, backgroundColor: 'white',
            fontSize: 22, color: '#707070', justifyContent: 'flex-end', borderRadius: 10
          }}
          onChangeText={(text) => setName(text)}>
        </TextInput>
      </View>

      {carregando ? <Text style={{ width: '100%', textAlign: 'center', color: '#333D79', fontStyle: 'italic' }}>{waitingText}</Text> : null}



      <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Btn style={{ height: 50 }}
          ref={loginButtonRef}
          label="Jogar"
          onPress={onBtnClick}
          successIcon="check"
          backgroundColor='#333D79'
          color='white'
          foregroundColor='#707070'
          maxWidth={Math.round(Dimensions.get('window').width - 10)}
          minWidth={50}
          labelStyle={{ color: '#FAEBFF', fontWeight: 'bold' }}

        />
      </View>



    </KeyboardAvoidingView>

  );
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: '#FAEBFF',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    paddingTop: Constants.statusBarHeight + 20,
    paddingLeft: 5,
    paddingRight: 5
  },
});