import React, { useState } from 'react';
import { StyleSheet, Text, Image, TextInput, KeyboardAvoidingView, View, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';


export default function Login() {

  const navigation = useNavigation();
  const [name, setName] = useState('');


  

  function onBtnClick() {

    console.log('Login -> onBtnCLick');
    if (name == '') {
      Alert.alert('Erro', 'Por favor informe um nome!');
      return;
    }

    navigation.navigate('SelectCaracter', { name });
  }





  return (
    <KeyboardAvoidingView behavior='height' style={styles.container}>

      <Text style={{ width: '100%', textAlign: 'center', fontWeight: 'bold', fontSize: 25, color: '#333D79' }}>Country Comparison Game</Text>
      <Image style={{ width: '100%', height: 120, resizeMode: 'contain' }} source={require('../../../assets/icon.png')}>
      </Image>

      <View style={{ width: '100%' }}>
        <Text style={{ marginBottom: 10, color: '#333D79', fontSize: 20 }}>Digite seu nome para começar: </Text>


        <TextInput
          style={{ width: '100%' }}

          style={{
            width: '100%', height: 60, borderColor: '#707070', borderWidth: 1, backgroundColor: 'white',
            fontSize: 22, color: '#707070', justifyContent: 'flex-end', borderRadius: 10
          }}
          onChangeText={(text) => setName(text)}>
        </TextInput>
      </View>

      <TouchableOpacity style={{width:'100%'}} onPress ={onBtnClick} >
          <View style={{width:'100%', alignItems:'center', flexDirection:'row', justifyContent:'center' }} >
            <Text style={{color:'#333D79', fontSize: 20 }}>Continuar</Text>
            <Feather name="arrow-right" size={20} color='#333D79' style={{  paddingLeft: 5 }}></Feather>
          </View>
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