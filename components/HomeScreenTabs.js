import React, { Component } from 'react';

import {FontAwesome,  MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';

import {  createBottomTabNavigator  } from "@react-navigation/bottom-tabs";

import DeckList from './Decklist';
import NewDeck from './NewDeck';

const Tab = createBottomTabNavigator();



const tabBarOptions = {

  activeTintColor: '#75EBC5',
}

class HomeScreenTabs extends Component {

  onClickReRoute = (deckTitle) => {
    const { navigation } = this.props;

    navigation.navigate('Deck',
      {activeDeck: deckTitle}
    )
  }


  render() {
    return(
      <Tab.Navigator 
            tabBarOptions={tabBarOptions}
          >
            <Tab.Screen 
              name="Decks"
              component={DeckList}
              activeTintColor='grey'
              options={{ 
                title: 'Decks',
                tabBarIcon: ({color, size}) => 
                  <MaterialCommunityIcons name="cards" size={size} color={color} /> }} 
            />
            <Tab.Screen 
              name="New Deck" 
              component={NewDeck}
              options={{
                tabBarIcon: ({color, size}) => <Ionicons name="md-add" size={size} color={color} /> 
              }} />
        </Tab.Navigator>
    )
  }
}

export default HomeScreenTabs;