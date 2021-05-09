import React, { useRef, useState, useEffect } from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, FlatList, Image, Alert } from 'react-native';
import Btn from 'react-native-micro-animated-button';
import Constants from 'expo-constants';
import api from '../../services/api';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import getAvatar from './../Game/avatars';
import getString from './../../../assets/strings';



export default function SelectCaracter() {

    const navigation = useNavigation();
    const route = useRoute();

    const loginButtonRef = useRef(null);
    const scrollRef = useRef(null);
    const [carregando, setCarregando] = useState(false);
    const [waitingText, setWaitingText] = useState('');

    const [avatarId, setAvatarId] = useState(1);
    const { name, isTablet } = route.params;




    useEffect(() => {



        global.timeOutLoginCount = 0;

        if (!(global.avatarId === undefined)) {
            setAvatarId(global.avatarId);
            scrollRef.current.scrollToIndex({ index: global.avatarId - 1, animated: true })
        }
    }, []);


    function onBtnClick() {
        console.log('Login -> onBtnCLick');
        global.cancelLookForOppoent = false;
        setCarregando(true);

        setWaitingText(getString("waitingForOpponent"));
        postLookForOpponent(0);
    }

    function onGoBackClick() {
        navigation.goBack();
    }

    function cancelLookForOpponent() {
        global.cancelLookForOppoent = true;
    }

    function postLookForOpponent(gameId) {

        console.log(`post(LookForOpponent(${name}, ${gameId} [${global.timeOutLoginCount}/20])`);
        api.post('lookForOpponent', { player: name, gameId, avatarId }).then(result => trataResultadoPost(result))
            .catch(error => {
                Alert.alert(getString("error"), `${getString("thereWasAnError")} ${error}`);
                loginButtonRef.current.reset();
                setCarregando(false);
            });
    }


    function trataResultadoPost(result) {

        console.log(result.data)

        const { opponentName, return_gameId, opponentAvatarId } = result.data;

        if (result.data.return_status == 2) {

            //everything ready to start:
            loginButtonRef.current.reset();
            setCarregando(false);
            global.timeOutLoginCount = 0;
            navigation.navigate('Game', { name, gameId: return_gameId, opponentName, opponentAvatarId, avatarId, isTablet });

        } else {

            global.timeOutLoginCount++;

            console.log('timeOutCount = ' + global.timeOutLoginCount);

            if (global.timeOutLoginCount == 10) {
                setWaitingText(getString("stillWating"));
            }

            if (global.timeOutLoginCount >= 20 || global.cancelLookForOppoent) {

                loginButtonRef.current.reset();
                setCarregando(false);

                if (!global.cancelLookForOppoent)
                    Alert.alert(getString("noOnlinePlayers"), getString("noOnlinePlayersInviteSomeone"));

                global.timeOutLoginCount = 0;

                api.post('abortGame', { gameId: return_gameId }).then(result => { console.log(result.data) });

            } else {

                setTimeout(() => postLookForOpponent(return_gameId), 2000);
            }
        }
    }


    const avatars = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }];

    const renderAvatarList = ({ item }) => (
        <TouchableOpacity style={{ borderRadius: 90 }} onPress={() => { setAvatarId(item.id); global.avatarId = item.id }} disabled={carregando} >
            <View style={{
                paddingLeft: item.id == avatarId ? 0 : 3, paddingTop: item.id == avatarId ? 2 : 4, width: 100, height: 100,
                backgroundColor: 'white', margin: 5, borderRadius: 90, borderWidth: item.id == avatarId ? 4 : 0, borderColor: '#8fe391'
            }}>
                <Image source={getAvatar(item.id)} style={{ height: 90, width: 90, resizeMode: 'stretch', borderRadius: 90 }} ></Image>
            </View>
        </TouchableOpacity>
    )

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, justifyContent: 'space-evenly', }}>

                <Text style={{ width: '100%', fontWeight: 'bold', fontSize:isTablet?35:25, color: '#333D79' }}>{`${getString("hello")} ${name}!`}</Text>
                <Text style={{ width: '100%', fontSize: isTablet?25:20, color: '#333D79' }}>{getString("selectAvatar")}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center' }}>

                <View style={{ height: 110 }}>

                    <FlatList
                        ref={scrollRef}
                        onScrollToIndexFailed={info => {
                            const wait = new Promise(resolve => setTimeout(resolve, 500));
                            wait.then(() => {
                                scrollRef.current?.scrollToIndex({ index: info.index, animated: false });
                            });
                        }}
                        data={avatars}
                        renderItem={renderAvatarList}
                        keyExtractor={item => item.id}
                        horizontal={true}
                        scrollEnabled={!carregando}
                    >
                    </FlatList>
                </View>
            </View>

            <View style={{ alignItems: 'center', justifyContent: 'space-evenly', flex: 1, width: '100%' }}>

                {carregando ? <Text style={{ width: '100%', textAlign: 'center', color: '#333D79', fontStyle: 'italic',fontSize:isTablet?25:15 }}>{waitingText}</Text> : null}
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <Btn style={{ height: 50 }}
                        ref={loginButtonRef}
                        label={getString("start")}
                        onPress={onBtnClick}
                        successIcon="check"
                        backgroundColor='#333D79'
                        color='white'
                        foregroundColor='#707070'
                        maxWidth={Math.round(Dimensions.get('window').width - 10)}
                        minWidth={50}
                        labelStyle={{ color: '#FAEBFF', fontWeight: 'bold', fontSize:isTablet?22:17 }}

                    />
                </View>


                {carregando ? null :
                    <TouchableOpacity onPress={onGoBackClick} >
                        <View style={{ width: '100%', flexDirection: 'row', alignItems:'center' }} >
                            <Text style={{ color: '#333D79', fontSize:isTablet?25:20 }}>{getString("goBack")}</Text>
                            <Feather name="arrow-left" size={20} color='#333D79' style={{ paddingLeft: 5 }}></Feather>
                        </View>
                    </TouchableOpacity>
                }

                {carregando ?
                    <TouchableOpacity onPress={cancelLookForOpponent} >
                        <View style={{ width: '100%', flexDirection: 'row' , alignItems:'center'}} >
                            <Text style={{ color: '#333D79', fontSize:isTablet?25:20 }}>{getString("cancel")}</Text>
                            <Feather name="x" size={20} color='#333D79' style={{ paddingLeft: 5 }}></Feather>
                        </View>
                    </TouchableOpacity> : null
                }

            </View>
        </View >
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