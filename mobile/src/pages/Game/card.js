import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import SectionCard from './section_card';

export default function Card (props) {

        const { cardData } = props;

        

        return (
            <View style={{ flex: 3, borderColor: 'gray', borderWidth: 1, margin: 2 }}>

                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'black', fontWeight: 'bold' }}>{cardData.name}</Text>
                </View>

                <View style={{ padding:5, flex: 4, borderColor: 'gray', borderWidth: 1 }}>
                    <Image  source={{ uri: cardData.flag }} style={{ flex: 1, resizeMode:'cover' }} ></Image>
                </View>
                <View style={{ flex: 6,  flexDirection: 'column' }}>

                    <SectionCard text={'Polulação'} value={cardData.population}>
                    </SectionCard>

                    <SectionCard text={'Área'} value={cardData.area}>
                    </SectionCard>

                    <SectionCard text={'IDH'} value={cardData.hdi}>
                    </SectionCard>

                    <SectionCard text={'Poder militar'} value={cardData.militaryPower}>
                    </SectionCard>

                    <SectionCard text={'Densidade pop.'} value={cardData.popDensity}>
                    </SectionCard>
                </View>

            </View>
        );
    
}