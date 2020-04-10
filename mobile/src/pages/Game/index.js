import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Constants from 'expo-constants';

export default function Game() {
    function btnJogarClick() {

    }


    return (
        <View style={styles.container}>
            <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, margin: 2, flexDirection: 'row' }}>

                <View style={{ flex: 3, borderColor: 'gray', borderWidth: 1, margin: 2 }}>

                    <View style={{ flex: 4, borderColor: 'gray', borderWidth: 1 }}>

                    </View>
                    <View style={{ flex: 6, borderColor: 'gray', borderWidth: 1, flexDirection: 'column' }}>
                        <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, flexDirection: 'row' }} >

                            <View style={{ flex: 1, paddingLeft: 5, borderColor: 'gray', borderWidth: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                                <Text style={{ fontSize: 16 }}>População</Text>

                            </View>

                            <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }} >
                                <Text>209.3 milhões</Text>
                            </View>

                        </View>

                        <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, flexDirection: 'row' }} >

                            <View style={{ flex: 1, paddingLeft: 5, borderColor: 'gray', borderWidth: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                                <Text style={{ fontSize: 16 }}>Área</Text>

                            </View>

                            <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }} >
                                <Text>8.511.000 km2</Text>
                            </View>

                        </View>
                        <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, flexDirection: 'row' }} >

                            <View style={{ flex: 1, paddingLeft: 5, borderColor: 'gray', borderWidth: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                                <Text style={{ fontSize: 16 }}>IDH</Text>

                            </View>

                            <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }} >
                                <Text>0,755 (#75)</Text>
                            </View>

                        </View>
                        <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, flexDirection: 'row' }} >

                            <View style={{ flex: 1, paddingLeft: 5, borderColor: 'gray', borderWidth: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                                <Text style={{ fontSize: 16 }}>Poder militar</Text>

                            </View>

                            <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }} >
                                <Text>0,1988 (#10)</Text>
                            </View>

                        </View>
                        <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, flexDirection: 'row' }} >

                            <View style={{ flex: 1, paddingLeft: 5, borderColor: 'gray', borderWidth: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                                <Text style={{ fontSize: 16 }}>Densidade pop.</Text>

                            </View>

                            <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }} >
                                <Text>23 pessoas/km2</Text>
                            </View>

                        </View>
                     </View>

                </View>
                <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, margin: 2, flexDirection: 'column' }}>
                    <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1 }} >

                    </View>

                    <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1 }} >

                    </View>

                    <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1 }} >

                    </View>

                </View>
            </View>
            <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, margin: 2, flexDirection: 'row' }}>

                <View style={{ flex: 3, borderColor: 'gray', borderWidth: 1, margin: 2 }}>

                    <View style={{ flex: 4, borderColor: 'gray', borderWidth: 1 }}>

                    </View>
                    <View style={{ flex: 6, borderColor: 'gray', borderWidth: 1, flexDirection: 'column' }}>
                        <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, flexDirection: 'row' }} >

                            <View style={{ flex: 1, paddingLeft: 5, borderColor: 'gray', borderWidth: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                                <Text style={{ fontSize: 16 }}>População</Text>

                            </View>

                            <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }} >
                                <Text>209.3 milhões</Text>
                            </View>

                        </View>

                        <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, flexDirection: 'row' }} >

                            <View style={{ flex: 1, paddingLeft: 5, borderColor: 'gray', borderWidth: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                                <Text style={{ fontSize: 16 }}>Área</Text>

                            </View>

                            <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }} >
                                <Text>8.511.000 km2</Text>
                            </View>

                        </View>
                        <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, flexDirection: 'row' }} >

                            <View style={{ flex: 1, paddingLeft: 5, borderColor: 'gray', borderWidth: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                                <Text style={{ fontSize: 16 }}>IDH</Text>

                            </View>

                            <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }} >
                                <Text>0,755 (#75)</Text>
                            </View>

                        </View>
                        <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, flexDirection: 'row' }} >

                            <View style={{ flex: 1, paddingLeft: 5, borderColor: 'gray', borderWidth: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                                <Text style={{ fontSize: 16 }}>Poder militar</Text>

                            </View>

                            <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }} >
                                <Text>0,1988 (#10)</Text>
                            </View>

                        </View>
                        <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, flexDirection: 'row' }} >

                            <View style={{ flex: 1, paddingLeft: 5, borderColor: 'gray', borderWidth: 1, alignItems: 'flex-start', justifyContent: 'center' }} >
                                <Text style={{ fontSize: 16 }}>Densidade pop.</Text>

                            </View>

                            <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }} >
                                <Text>23 pessoas/km2</Text>
                            </View>

                        </View>
                    </View>

                </View>
                <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1, margin: 2, flexDirection: 'column' }}>
                    <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1 }} >

                    </View>

                    <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1 }} >

                    </View>

                    <View style={{ flex: 1, borderColor: 'gray', borderWidth: 1 }} >

                    </View>

                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Constants.statusBarHeight,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: 1,
        marginBottom: 30



    },
});