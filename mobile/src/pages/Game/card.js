import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableHightLight } from 'react-native';
import SectionCard from './section_card';
import 'intl';
import 'intl/locale-data/jsonp/en';



export default function Card(props) {

  const { cardData, cardsOptionClick, idxSelected, cardResult } = props;


  return (
    <View style={{
      backgroundColor: '#FAEBFF', flex: 5, borderColor: '#707070', borderWidth: 1, marginLeft:10,marginRight: 10,marginBottom:4,
      borderRadius: 10, padding: 10,
    }}>

      <View style={{ padding: 5, flex: 2, flexDirection: 'row' }}>

        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View style={{ flex: 2, flexDirection: 'row' }} >
            {cardData.flag ? <Image source={{ uri: cardData.flag }} style={{ flex: 2, resizeMode: 'stretch', marginRight: 6 }} ></Image> : null}
            <Text style={{flexWrap:'wrap', marginTop: 6, color: '#707070', fontWeight: 'bold', flex: 4 }}>{cardData.countryName}</Text>
          </View>
          <View style={{ flex: 1, marginTop: 3 }} >
            <Text style={{ color: '#707070', fontStyle: 'italic' }}>{`Idioma: ${cardData.language}`}</Text>
          </View>
          <View style={{ flex: 1 }} >
            <Text style={{ color: '#707070', fontStyle: 'italic' }}>{`Moeda: ${cardData.currency}`}</Text >
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {cardData.map ? <Image source={{ uri: cardData.map }} style={{marginTop:-8, flex: 2, marginRight: 6 }} ></Image> : null}
        
        </View>
      </View>

      <View style={{ flex: 6, flexDirection: 'column' }}>
        <TouchableOpacity style={{ flex: 1 }}
          onPress={() => { cardsOptionClick(1, 'População') }}>
          <SectionCard selected={idxSelected == 1} text={'Polulação'} value={Intl.NumberFormat('pt-BR', { style: 'decimal' }).format(cardData.population) + ' hab'}
            cardResult={cardResult} >
          </SectionCard>
        </TouchableOpacity>

        <TouchableOpacity style={{ flex: 1 }}
          onPress={() => { cardsOptionClick(2, 'Área') }}>
          <SectionCard selected={idxSelected == 2} text={'Área'} value={Intl.NumberFormat('pt-BR', { style: 'decimal' }).format(cardData.area) + ' km²'} cardResult={cardResult}>
          </SectionCard>
        </TouchableOpacity>

        <TouchableOpacity style={{ flex: 1 }}
          onPress={() => { cardsOptionClick(3, 'IDH') }}>
          <SectionCard selected={idxSelected == 3} text={'IDH'} value={Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 3 }).format(cardData.hdi)} cardResult={cardResult} >
          </SectionCard>
        </TouchableOpacity>

        <TouchableOpacity style={{ flex: 1 }}
          onPress={() => { cardsOptionClick(4, 'Índice de segurança') }}>
          <SectionCard selected={idxSelected == 4} text={'Índice de segurança'} value={Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(cardData.safety_index)} cardResult={cardResult} >
          </SectionCard>
        </TouchableOpacity>

        <TouchableOpacity style={{ flex: 1 }}
          onPress={() => { cardsOptionClick(5, 'Densidade pop.') }}>
          <SectionCard selected={idxSelected == 5} text={'Densidade pop.'} value={Intl.NumberFormat('pt-BR', { style: 'decimal' }).format(cardData.popDensity) + ' Pessoas/ Km²'} cardResult={cardResult} >
          </SectionCard>
        </TouchableOpacity>
      </View>
    </View>
  );
}