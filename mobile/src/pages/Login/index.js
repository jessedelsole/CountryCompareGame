import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, Image, TextInput, KeyboardAvoidingView, View, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { Feather } from '@expo/vector-icons';
import * as Localization from 'expo-localization';
import getString from './../../../assets/strings'
import * as Device from 'expo-device';


export default function Login() {



  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [isTablet, setIsTablet] = useState(false);

  global.englishLanguage = (Localization.locale !== "pt-BR");

  useEffect(() => {

    async function deviceInfo() {

      deviceInfo = await Device.getDeviceTypeAsync();
      if (deviceInfo === Device.DeviceType.TABLET) {

        setIsTablet(true);
      }
    }

    deviceInfo();



  }, []);



  function onBtnClick() {

    console.log('Login -> onBtnCLick');
    if (name == '') {
      Alert.alert(getString("error"), getString("informAName"));
      return;
    }

    navigation.navigate('SelectCaracter', { name, isTablet });
  }


  return (
    <View style={styles.container}>


      <View style={{ flex: 1 }}>

        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

          <Image style={{ marginLeft: 20, width: isTablet ? 60 : 40, height: isTablet ? 60 : 40, resizeMode: 'contain' }} source={require('../../../assets/icon.png')}>
          </Image>
          <Text style={{ marginLeft: 15, textAlign: 'center', fontWeight: 'bold', fontSize: isTablet ? 35 : 20, color: '#333D79' }}>Country Comparison Game</Text>

        </View>


      </View>

      <View style={{ flex: 1 }}>


        <Text style={{ marginBottom: 10, color: '#333D79', fontSize: isTablet?25:20 }}>{getString("typeYourName")} </Text>
        <TextInput
          style={{ width: '100%' }}

          style={{
            width: '100%', height: 60, borderColor: '#707070', borderWidth: 1, backgroundColor: 'white',
            fontSize: isTablet?25:22, color: '#707070', justifyContent: 'flex-end', borderRadius: 10
          }}
          onChangeText={(text) => setName(text)}>
        </TextInput>
      </View>

      <View style={{ flex: 1 }}>
        <TouchableOpacity style={{}} onPress={onBtnClick} >
          <View style={{ width: '100%', alignItems: 'center', flexDirection: 'row', justifyContent: 'center' }} >
            <Text style={{ color: '#333D79', fontSize: isTablet ? 30 : 20 }}>{getString("continue")}</Text>
            <Feather name="arrow-right" size={20} color='#333D79' style={{ paddingLeft: 5 }}></Feather>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1.5 }}>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {

    flex: 1,
    backgroundColor: '#FAEBFF',
    // alignItems: 'flex-start',
    // justifyContent: 'flex-start',
    paddingTop: Constants.statusBarHeight + 20,
    paddingLeft: 5,
    paddingRight: 5
  },
});