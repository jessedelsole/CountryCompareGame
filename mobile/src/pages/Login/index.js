import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import api from '../../services/api';

export default function Login() {

  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [carregando, setCarregando] = useState(false);

  global.game_id = 0;
  

  function postLookForOpponent(){

     const player = nome;
     const gameId = global.game_id;

     setCarregando(true);

     api.post('lookForOpponent', { player, gameId }).then(result =>  trataResultadoPost(result) );

  }


  function trataResultadoPost(result) {

    global.game_id = result.data.return_gameId;

    console.log('gameid=' + result.data.return_gameId);
    console.log('status' + result.data.return_status);
    console.log(result.data.return_operation)

    if (result.data.return_status == 2) {
         setCarregando(false);
         navigation.navigate('Game', { nome });
    } else {

      console.log('chamando setTimeOut');
      setTimeout( () =>  postLookForOpponent() , 2000)
    }

  }


  function onBtnClick() {

    postLookForOpponent();
      
  }

  return (
    <KeyboardAvoidingView behavior='height' style={styles.container}>
      <TouchableOpacity onPress={() => global.game_id = 0}>
        <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>Digite o seu nome</Text>
      </TouchableOpacity>

      <TextInput style={{}} placeHolder="Digite o nome do usuário"
        style={{
          width: '100%', height: 60, borderColor: 'gray', borderWidth: 1, backgroundColor: 'white',
          fontSize: 20
        }}
        onChangeText={(text) => setNome(text)}
      >
      </TextInput>

       {carregando? <Text>Aguarde, procurando um oponente...</Text> : null }
       

      <TouchableOpacity style={{
        backgroundColor: '#AD4545', height: 60, width: '100%', flexDirection: 'row', borderRadius: 50, 
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
    backgroundColor: '#6EA4B8',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    paddingTop: Constants.statusBarHeight + 20,
    paddingLeft: 5,
    paddingRight: 5
  },
});