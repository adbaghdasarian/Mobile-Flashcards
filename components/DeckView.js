import React, { Component } from 'react';

import { Button, Text, TextInput, SafeAreaView, StyleSheet, View, ActivityIndicator} from 'react-native'

import Constants from 'expo-constants';

import PropTypes from 'prop-types';

import { clearLocalNotifications, setLocalNotification} from '../utils/helpers'

//accepts deckTitle
import {_retrieveDecks as getDecks,  _deleteDeck as deleteDeck} from '../utils/api.js';

class DeckView extends Component {

  state = {
    deck: {},
  }

  handleDeleteDeck = () => {
    const { navigation } = this.props;
    const activeDeckTitle = navigation.route.params.activeDeck;
    navigation.navigate('Decks');

  }

  componentDidMount() {
    const navigation = this.props;
    const activeDeckTitle = navigation.route.params.activeDeck;
    this._unsubscribe = navigation.navigation.addListener('focus', () => {
      this.componentDidMount();
    });

    getDecks().then((decks) => {
      this.setState((state) => {
        return { deck: JSON.parse(decks)[activeDeckTitle] };
      })
    });


    //When user studies, clear notification for today and set new one for tomorrow
    clearLocalNotifications().then(setLocalNotification);
  }

  render() {
    //console.log(this.props);
    if (Object.keys(this.state.deck).length === 0) {
      return (<ActivityIndicator size="large" color="#0000ff"/> )
    }
    else {
      const { deck } = this.state;
      const title = deck.title;
      const numberOfCards = deck.questions.length + ' cards';
      const { navigation, route } = this.props;

      return (
        <SafeAreaView
          style={styles.container}
        >
          <View style={styles.headers}>
            <Text style={styles.header}>{title}</Text>
            <Text style={styles.subheader}> {numberOfCards}</Text>
          </View>
          <View id="buttons" style={styles.buttons}>
            <Button
              style={styles.startButton}
              title={'Start Quiz'}
              color='#eb91e8'
              onPress={() => navigation.navigate('Quiz', route.params)}
            />
            <Button
              style={styles.addCardButton}
              title={'Add Card'}
              color='#75EBC5'
              onPress={() => navigation.navigate('Add Card', route.params)}
            />
            <View style={styles.deleteDeckButtonContainer}>
              <Button
                style={styles.deleteDeckButton}
                title={'Delete Deck'}
                color='#ff7d7d'
                onPress={() => {
                      deleteDeck(title).then(() =>{
                          navigation.navigate('Decks');
                      })
                    }}
              />
            </View>
          </View>
        </SafeAreaView>
      );
    }
  }
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: Constants.statusBarHeight,
    flex: 1,
    justifyContent: 'space-around',
  },
  headers: {
    alignItems: 'center',
    paddingTop: 50,
  },
  header: {
    fontSize: 50,
    fontFamily: 'Futura',
    marginBottom: 10,
    color: '#75EBC5'
  },
  subheader: {
    fontSize: 15,
    fontFamily: 'Futura'
  },
   startButton: {
    height: 40,
    color: '#75EBC5',
    marginHorizontal: 10,
  },
  buttons: {
    justifyContent: "space-around",
    height: '50%',
    width: '80%'
  },
  addCardButton: {
    height: 40,
    color: '#75EBC5',
    marginHorizontal: 10,
  },
  deleteDeckButton: {
    height: 20,
    marginHorizontal: 10,
    width: 20,
  }
})

DeckView.propTypes = {
  navigation: PropTypes.object
}

export default DeckView;