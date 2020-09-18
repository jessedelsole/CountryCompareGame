import React from 'react';
import { createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer} from '@react-navigation/native';
import Login from './src/pages/Login';
import Game from './src/pages/Game';
import SelectCaracter from './src/pages/Login/selectCaracter';

const AppStack = createStackNavigator();

export default function Routes(){
    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{headerShown:false, gestureEnabled:false}} >
                <AppStack.Screen name = "Login" component={Login} />
                <AppStack.Screen name = "Game" component={Game} />
                <AppStack.Screen name = "SelectCaracter" component={SelectCaracter}/>
            </AppStack.Navigator>
        </NavigationContainer>
    );
}