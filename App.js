import { Component } from 'react';
import * as React from 'react';
import { Text, View, StyleSheet, Button, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';

import DeckList from './components/Decklist';
import NewCard from './components/NewCard';
import NewDeck from './components/NewDeck';
import DeckView from './components/DeckView';
import Quiz from './components/Quiz';
import HomeScreenTabs from './components/HomeScreenTabs';

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation} from '@react-navigation/native';

const Stack = createStackNavigator();

import { _retrieveDecks as getDecks } from './utils/api.js';
import { _retrieveDeck as getDeck } from './utils/api.js';
import { _saveDeckTitle as saveDeck } from './utils/api.js';

import { setLocalNotification } from './utils/helpers.js';
import {FontAwesome,  MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';





class App extends Component {
  state = {
    decks: {},
  }

  componentDidMount() {

    setLocalNotification();

    const decks = getDecks().then((decks) => {
      this.setState((state) => {
        return { decks: JSON.parse(decks) };
      })
    });
  }


  render() {
    const firstDeck = Object.values(this.state.decks)[0];
    const { decks } = this.state;

    if (Object.keys(this.state.decks).length === 0) {
      return (<ActivityIndicator size="large" color="#0000ff"/> )
    }
    else {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Decks">
            <Stack.Screen name="Decks" component={HomeScreenTabs} />
            <Stack.Screen name="Deck" component={DeckView} />
            <Stack.Screen name="Add Card" component={NewCard}/>
            <Stack.Screen name="Quiz" component={Quiz} />
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

  }
}


export default App;
