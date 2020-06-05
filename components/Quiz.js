import React, { Component } from 'react';

import { Button, Text, TextInput, SafeAreaView, StyleSheet, View, ActivityIndicator} from 'react-native'

import QuizQuestion from './QuizQuestion.js';
import FinishedQuiz from  './FinishedQuiz.js';

import Constants from 'expo-constants';
import PropTypes from 'prop-types';

import {_retrieveDecks as getDecks } from '../utils/api.js';


class Quiz extends Component {
  state = {
    index: 0,
    numberCorrect: 0,
    deck: {}
  }

  //adds to index and numberCorrect if correct
  nextCard = (isCorrect) => {
    isCorrect ?
      this.setState((state) => {
        const { index, numberCorrect } = state;
        return({
        index: index + 1,
        numberCorrect: numberCorrect + 1
        })
      })
      :
      this.setState((state) => {
        const { index } = state;
        return({
        index: index + 1,
        })
      })
  }

  reset = () => {
    this.setState({
      index: 0,
      numberCorrect: 0,
    })
  }

  backToDeck = () => {
    const { navigation } = this.props;
  }

  componentDidMount() {
    const { route } = this.props;
    console.log(this.props);
    const activeDeckTitle = route.params.activeDeck;
    
    getDecks().then((decks) => {
      this.setState((state) => {
        return { deck: JSON.parse(decks)[activeDeckTitle] };
      })
    });
    
  }

  
  render(){
    const {deck } = this.state;
    const { navigation, route } = this.props;

     if (Object.keys(this.state.deck).length === 0) {
      return (<ActivityIndicator size="large" color="#0000ff"/> )
    }
    else {
      const maxIndex = deck.questions.length;
      let { index } = this.state;
      const questions = deck.questions;
      const cardNumber = index + 1;

      //console.log(questions[index]);
      if(index === maxIndex){
        'finished quiz fired'
        return <FinishedQuiz 
                numberOfCorrect={this.state.numberCorrect} 
                numberOfCards={maxIndex} 
                reset={this.reset}
                backToDeck={() => navigation.navigate('Deck', route.params)}/>
      }
      else{
        console.log(index);
        console.log(maxIndex);
        console.log('card fired');
        return(
          <QuizQuestion 
            cardNumber={cardNumber}
            deckLength={maxIndex}
            nextCard={this.nextCard} 
            flashCard={questions[index]}
          />
        )
      }
    }
  }
}

export default Quiz;