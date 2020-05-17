import React, { useState } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';

export default function Login() {

  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [carregando, setCarregando] = useState(false);
  let gameId = 0;
  let opponentName = '';


  function onBtnClick() {

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
      setCarregando(false);
      navigation.navigate('Game', { name, gameId, opponentName });
    } else {

      console.log('chamando setTimeOut');
      setTimeout(() => postLookForOpponent(), 2000)
    }
  }

  return (
    <KeyboardAvoidingView behavior='height' style={styles.container}>
      
      <Text style={{width:'100%', textAlign:'center', fontWeight: 'bold', fontSize:28, color: '#333D79'}}>Country Compare Game</Text>
      <Image style={{width:'100%',height:120, resizeMode:'contain'}}  source={require('../../../assets/icon.png')}> 

      </Image>

      <TouchableOpacity onPress={() => gameId = 0}>
        <Text style={{ color: '#333D79', fontSize: 24, fontWeight: 'bold' }}>Informe seu nome:</Text>
      </TouchableOpacity>

      <TextInput style={{}} 
        style={{
          width: '100%', height: 60, borderColor: '#707070', borderWidth:1 , backgroundColor: 'white',
          fontSize: 22, color:'#707070', justifyContent:'flex-end'
        }}
        onChangeText={(text) => setName(text)}
      >
      </TextInput>

      {carregando ? <Text style={{color:'#333D79',fontStyle:'italic'}}>Aguarde, procurando um oponente...</Text> : null}

      <TouchableOpacity style={{
        backgroundColor: '#333D79', height: 60, width: '100%', flexDirection: 'row', borderRadius: 0,
        justifyContent: 'center', alignItems: 'center'
      }}
        onPress={onBtnClick}>

        <Feather name="play" size={16} color="white" style={{ flex: 1, paddingLeft: 30 }}></Feather>
        <Text style={{ color: '#ffffff', fontSize: 18, flex: 9, textAlign: 'center', paddingRight: 60 }}>Jogar</Text>
      </TouchableOpacity>
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