import React, { Component } from 'react';

import { _retrieveDecks as getDecks } from '../utils/api.js';

import { SafeAreaView, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';

import Constants from 'expo-constants';

import DeckCard from './DeckCard';

import PropTypes from 'prop-types';

class Decklist extends Component {
  state = {
    decks: {},
  }

   onClickReRoute = (deckTitle) => {
    const { navigation } = this.props;

    navigation.navigate('Deck',
      {activeDeck: deckTitle}
    )
  }

  componentDidMount() {
    const { navigation } = this.props;
    this._unsubscribe = navigation.addListener('focus', () => {
      this.componentDidMount();
    });
    const decks = getDecks().then((decks) => {
      //console.log(decks);
      this.setState((state) => {
        return {
          decks: JSON.parse(decks)
        };
      })
    });
  }

  render(){

    const { decks } = this.state;
    if (Object.keys(decks).length === 0) {
      return (<Text style={styles.nodecks}>There are no decks yet!</Text>)
    }
    else {
      //console.log(decks);
      return (
       <SafeAreaView style={styles.container}>
          <FlatList
            data={Object.values(decks)}
            renderItem={( { item } ) => <DeckCard deck={item} onClick={this.onClickReRoute}/>}
            keyExtractor={deck => deck.title}
          />
       </SafeAreaView>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  nodecks: {
    fontSize: 25,
    fontFamily: 'serif',

  }
})

Decklist.propTypes = {
  onClickReRoute: PropTypes.func,
  decks: PropTypes.object,
}


export default Decklist;