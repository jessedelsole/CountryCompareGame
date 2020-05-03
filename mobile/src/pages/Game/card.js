import React from 'react';
import { StyleSheet, Text, View, Image,TouchableOpacity, TouchableHightLight } from 'react-native';
import SectionCard from './section_card';


export default function Card (props) {

        const { cardData, cardsOptionClick,idxSelected } = props;


        

        return (
            <View style={{ flex: 3, borderColor: 'gray', borderWidth: 1, margin: 2, borderRadius:20 }}>
               
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'black', fontWeight: 'bold' }}>{cardData.name}</Text>
                </View>

                <View style={{ padding:5, flex: 4, borderColor: 'gray', borderWidth: 1 }}>
                  {cardData.flag? <Image  source={{ uri: cardData.flag }} style={{ flex: 1, resizeMode:'cover' }} ></Image> : null}
                </View>
                <View style={{ flex: 6,  flexDirection: 'column' }}>

                    <TouchableOpacity  style= {{flex:1}}
                      onPress={ ()=>{ cardsOptionClick(1)} }
                    >
                    <SectionCard selected={idxSelected==1} text={'Polulação'} value={cardData.population}>
                    </SectionCard>
                    </TouchableOpacity>

                   
                    <TouchableOpacity style= {{flex:1}}
                      onPress={ ()=>{ cardsOptionClick(2)} }
                    >
                    <SectionCard selected={idxSelected==2} text={'Área'} value={cardData.area}>
                    </SectionCard>
                    </TouchableOpacity>

                    <TouchableOpacity style= {{flex:1}}
                      onPress={ ()=>{ cardsOptionClick(3)} }>
                    <SectionCard selected={idxSelected==3} text={'IDH'} value={ cardData.hdi}>
                    </SectionCard>
                    </TouchableOpacity>

                    <TouchableOpacity  style= {{flex:1}}
                     onPress={ ()=>{ cardsOptionClick(4)} }
                    >
                    <SectionCard selected={idxSelected==4}  text={'Poder militar'} value={cardData.militaryPower}>
                    </SectionCard>
                    </TouchableOpacity>


                    <TouchableOpacity style= {{flex:1}}
                     onPress={ ()=>{ cardsOptionClick(5)} }
                    >
                    <SectionCard selected={idxSelected==5}  text={'Densidade pop.'} value={cardData.popDensity}>
                    </SectionCard>
                    </TouchableOpacity>

                   
                </View>

            </View>
        );
    
}