import React, { Component } from 'react';

import { Button, Text, TextInput, SafeAreaView, StyleSheet, View} from 'react-native'

import Constants from 'expo-constants';

import { _saveDeckTitle as saveDeck } from '../utils/api.js';

class NewDeck extends Component {

  state = {
    deckTitle: ''
  }

  handleDeckTitleInput = (text) => {
    this.setState({
      deckTitle: text
    })
  }

  handleAddDeck = (event) => {
    //store new deck and reroute to Decklist
    const { navigation } = this.props;
    const newDeck = this.state.deckTitle
    saveDeck(newDeck);
    this.setState({ deckTitle: ''});
    navigation.navigate('Decks')
    navigation.navigate('Deck',
      {activeDeck: newDeck}
    )
  }



  render() {

    return(
      <SafeAreaView style={styles.outerContainer}>
        <SafeAreaView style={styles.container}>

        <Text style={styles.deckQuery}> What is the title of your new deck? </Text>
        <TextInput
              value={this.state.deckTitle}
              onChangeText={this.handleDeckTitleInput}
              style={styles.input}
        />
        <Button
            style={styles.button}
            title={'Add Deck'}
            color='#eb91e8'
            onPress={this.handleAddDeck}
        />

        </SafeAreaView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  outerContainer: {
    justifyContent: 'center',
    height: '60%',
    marginTop: 70,
  },
  input: {
     height: 40,
     borderColor: 'gray',
     borderWidth: 1,
     marginHorizontal: 2,
     width: '80%',
  },
  deckQuery: {
    fontSize: 27,
    textAlign: 'center',
    fontFamily: 'serif',
    color: '#75EBC5',
  }
})

export default NewDeck;