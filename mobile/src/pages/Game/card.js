import React from 'react';
import {  Text, View, Image, TouchableOpacity } from 'react-native';
import SectionCard from './section_card';
import 'intl';
import 'intl/locale-data/jsonp/en';
import getFlagAndMap from './flags_and_maps';
import getString from './../../../assets/strings';



export default function Card(props) {

  const { cardData, cardsOptionClick, idxSelected, cardResult, touchableClickable } = props;


  return (
    <View style={{
      backgroundColor: '#FAEBFF', flex: 1, borderColor: '#707070', borderWidth: 1,
      borderRadius: 10, padding: 10,
    }}>

      <View style={{ padding: 5, flex: 2, flexDirection: 'row' }}>

        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View style={{ flex: 2, flexDirection: 'row' }} >
            {cardData.card_code>0 ? <Image source={getFlagAndMap(cardData.card_code).flag} style={{ flex: 2, height: 35, resizeMode: 'stretch', marginRight: 6 }} ></Image> : null}
            <Text style={{flexWrap:'wrap', marginTop: 6, color: '#707070', fontWeight: 'bold', flex: 4 }}>{cardData.countryName}</Text>
          </View>
          <View style={{ flex: 1, marginTop: 3 }} >
            <Text style={{ color: '#707070', fontStyle: 'italic' }}>{`${getString("language")}: ${cardData.language}`}</Text>
          </View>
          <View style={{ flex: 1 }} >
            <Text style={{ color: '#707070', fontStyle: 'italic' }}>{`${getString("currency") }: ${cardData.currency}`}</Text >
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {cardData.card_code>0 ? <Image source={getFlagAndMap(cardData.card_code).map} style={{height:100, marginLeft:10, width:150, marginTop:-8, flex: 2, marginRight: 6 }} ></Image> : null}
        
        </View>
      </View>

      <View style={{ flex: 6, flexDirection: 'column' }}>
        <TouchableOpacity style={{ flex: 1 }} disabled = {!touchableClickable}
          onPress={() => { cardsOptionClick(1,  getString("population")) }}>
          <SectionCard selected={idxSelected == 1} text={getString("population")} value={Intl.NumberFormat('pt-BR', { style: 'decimal' }).format(cardData.population) + ' hab'}
            cardResult={cardResult} >
          </SectionCard>
        </TouchableOpacity>

        <TouchableOpacity style={{ flex: 1 }} disabled = {!touchableClickable}
          onPress={() => { cardsOptionClick(2, getString("area")) }}>
          <SectionCard selected={idxSelected == 2} text={getString("area")} value={Intl.NumberFormat('pt-BR', { style: 'decimal' }).format(cardData.area) + ' km²'} cardResult={cardResult}>
          </SectionCard>
        </TouchableOpacity>

        <TouchableOpacity style={{ flex: 1 }} disabled = {!touchableClickable}
          onPress={() => { cardsOptionClick(3, getString("HDI")) }}>
          <SectionCard selected={idxSelected == 3} text={getString("HDI")} value={Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 3 }).format(cardData.hdi)} cardResult={cardResult} >
          </SectionCard>
        </TouchableOpacity>

        <TouchableOpacity style={{ flex: 1 }} disabled = {!touchableClickable}
          onPress={() => { cardsOptionClick(4, getString("safetyIndex")) }}>
          <SectionCard selected={idxSelected == 4} text={getString("safetyIndex")} value={Intl.NumberFormat('pt-BR', { style: 'decimal', minimumFractionDigits: 2 }).format(cardData.safety_index)} cardResult={cardResult} >
          </SectionCard>
        </TouchableOpacity>

        <TouchableOpacity style={{ flex: 1 }}  disabled = {!touchableClickable}
          onPress={() => { cardsOptionClick(5, getString("populationDensity")) }}>
          <SectionCard selected={idxSelected == 5} text={getString("populationDensity")} value={Intl.NumberFormat('pt-BR', { style: 'decimal' }).format(cardData.popDensity) + ' Pessoas/ Km²'} cardResult={cardResult} >
          </SectionCard>
        </TouchableOpacity>
      </View>
    </View>
  );
}