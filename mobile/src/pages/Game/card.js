import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TouchableHightLight } from 'react-native';
import SectionCard from './section_card';

export default function Card(props) {

  const { cardData, cardsOptionClick, idxSelected, cardResult } = props;

  return (
    <View style={{ flex: 3, borderColor: 'gray', borderWidth: 1, margin: 2, borderRadius: 20 }}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: 'black', fontWeight: 'bold' }}>{cardData.countryName}</Text>
      </View>

      <View style={{ padding: 5, flex: 4, borderColor: 'gray', borderWidth: 1 }}>
        {cardData.flag ? <Image source={{ uri: cardData.flag }} style={{ flex: 1, resizeMode: 'cover' }} ></Image> : null}
      </View>
      <View style={{ flex: 6, flexDirection: 'column' }}>

        <TouchableOpacity style={{ flex: 1 }}
          onPress={() => { cardsOptionClick(1, 'População') }}>
          <SectionCard  selected={idxSelected == 1} text={'Polulação'} value={cardData.population} cardResult= {cardResult} >
          </SectionCard>
        </TouchableOpacity>

        <TouchableOpacity style={{ flex: 1 }}
          onPress={() => { cardsOptionClick(2, 'Área') }}>
          <SectionCard selected={idxSelected == 2} text={'Área'} value={cardData.area} cardResult= {cardResult}>
          </SectionCard>
        </TouchableOpacity>

        <TouchableOpacity style={{ flex: 1 }}
          onPress={() => { cardsOptionClick(3, 'IDH') }}>
          <SectionCard selected={idxSelected == 3} text={'IDH'} value={cardData.hdi} cardResult= {cardResult} >
          </SectionCard>
        </TouchableOpacity>

        <TouchableOpacity style={{ flex: 1 }}
          onPress={() => { cardsOptionClick(4, 'Poder Militar') }}>
          <SectionCard selected={idxSelected == 4} text={'Poder militar'} value={cardData.militaryPower} cardResult= {cardResult} >
          </SectionCard>
        </TouchableOpacity>

        <TouchableOpacity style={{ flex: 1 }}
          onPress={() => { cardsOptionClick(5, 'Densidade pop.')}}>
          <SectionCard selected={idxSelected == 5} text={'Densidade pop.'} value={cardData.popDensity} cardResult= {cardResult} >
          </SectionCard>
        </TouchableOpacity>
      </View>
    </View>
  );
}