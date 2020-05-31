import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, View, Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';
import Btn from 'react-native-micro-animated-button';

export default function Login() {

  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [carregando, setCarregando] = useState(false);

  const loginButtonRef = useRef(null);

  let gameId = 0;
  let opponentName = '';

  useEffect(() => {

    global.timeOutCount = 0;

  }, []);

  function onBtnClick() {

    if (name == '') {
      Alert.alert('Erro', 'Por favor informe um nome!');
      loginButtonRef.current.reset();
      return;
    }

    postLookForOpponent();
  }

  function postLookForOpponent() {

    setCarregando(true);
    api.post('lookForOpponent', { player: name, gameId }).then(result => trataResultadoPost(result));
  }

  function trataResultadoPost(result) {

    gameId = result.data.return_gameId;
    opponentName = result.data.opponentName;

    if (result.data.return_status == 2) {
      loginButtonRef.current.reset();
      setCarregando(false);
      navigation.navigate('Game', { name, gameId, opponentName });
    } else {

      global.timeOutCount++;
      if (global.timeOutCount >= 15) {

        loginButtonRef.current.reset();
        setCarregando(false);
        Alert.alert('Sem jogares online', 'No momento não há jogadores online. Tente convidar algum amigo para jogar também.');
        global.timeOutCount = 0;

        api.post('abortGame', { gameId }).then(result => { console.log(result.data) });

      } else {

        console.log('chamando setTimeOut');
        setTimeout(() => postLookForOpponent(), 2000);
      }
    }
  }

  return (
    <KeyboardAvoidingView behavior='height' style={styles.container}>

      <Text style={{ width: '100%', textAlign: 'center', fontWeight: 'bold', fontSize: 28, color: '#333D79' }}>Country Compare Game</Text>
      <Image style={{ width: '100%', height: 120, resizeMode: 'contain' }} source={require('../../../assets/icon.png')}>
      </Image>

      <View style={{width:'100%'}}>
        <Text style={{ marginBottom:10, color: '#333D79', fontSize: 20 }}>Digite seu nome para começar: </Text>


        <TextInput style={{width:'100%'}}
          editable={!carregando}
          style={{
            width: '100%', height: 60, borderColor: '#707070', borderWidth: 1, backgroundColor: 'white',
            fontSize: 22, color: '#707070', justifyContent: 'flex-end', borderRadius:10
          }}
          onChangeText={(text) => setName(text)}>
        </TextInput>
      </View>

      {carregando ? <Text style={{ width: '100%', textAlign: 'center', color: '#333D79', fontStyle: 'italic' }}>Aguarde, procurando um oponente online...</Text> : null}



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