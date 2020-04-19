import React,{useState} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Constants from 'expo-constants';
import {Feather} from '@expo/vector-icons';

export default function Login () {

   const navigation = useNavigation();   
   const [nome, setNome] = useState('');

   function onBtnClick(){
      
       navigation.navigate('Game',{nome});
  
   }


    return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
   

      
     
      <Text style={{color:'white', fontSize:25, fontWeight:'bold'}}>Digite o seu nome</Text>
      
      
         <TextInput style={{ }} placeHolder="Digite o nome do usuário" 
         style={ { width:'100%', height:60, borderColor:'gray',borderWidth:1, backgroundColor:'white' ,
          fontSize: 20} }
          onChangeText ={ (text)=>  setNome(text) }
          >
       </TextInput>
      
       
    

      
      <TouchableOpacity style={{ backgroundColor: '#AD4545' ,height:60, width:'100%',flexDirection: 'row',borderRadius:50,
        justifyContent: 'center', alignItems:'center'}}
        onPress={onBtnClick}>
        
        <Feather name="play" size={16} color="white"  style={{flex:1, paddingLeft:30}}></Feather>
        <Text style ={{color:'#ffffff', fontSize:18, flex:9, textAlign: 'center', paddingRight:60 }}>Jogar</Text>
      
      
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
    paddingLeft:5,
    paddingRight:5
  },
});