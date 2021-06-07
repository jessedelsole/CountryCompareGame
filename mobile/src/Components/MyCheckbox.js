import React, { useState } from 'react';
import { TouchableWithoutFeedback, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function MyCheckbox( {checked, onChange } ) {

   

    function onCheckmarkPress() {
        onChange(!checked);
      }
    return (
      <TouchableWithoutFeedback
          onPress={onCheckmarkPress}>
          
        <View style={[styles.checkboxBase, checked && styles.checkboxChecked]}>
          {checked && <Feather name="check" size={24} color="white" />}
        </View>
      </TouchableWithoutFeedback>
    );
  }

  const styles = StyleSheet.create({
    checkboxBase: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderWidth: 2,
        borderColor: 'coral',
        backgroundColor: 'transparent',
      },

      checkboxChecked: {
        backgroundColor: 'coral',
      },
  })
