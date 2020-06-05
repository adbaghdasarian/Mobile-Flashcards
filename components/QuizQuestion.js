import React, { Component } from 'react';

import { Button, Text, TextInput, SafeAreaView, StyleSheet, View, TouchableOpacity} from 'react-native'


import Constants from 'expo-constants';

import PropTypes from 'prop-types';

import { clearLocalNotification, setLocalNotification} from '../utils/helpers'



class QuizQuestion extends Component {

  state = {
    showAnswer: false,
  }


  handleFlip = (event) => {
    this.setState((state) => {
      let {showAnswer} = state;
      return {
        showAnswer: !showAnswer,
      }
    })
  }
  
  render() {
    const {flashCard, cardNumber, deckLength, nextCard} = this.props;
    const { showAnswer } = this.state;
    const questionText = flashCard.question;
    const answerText = flashCard.answer;
    return(
       <SafeAreaView style={styles.container}>
        <View id='quizCard' style={styles.quizcard}>
          <Text style={styles.cardNumber}> 
            {cardNumber}/{deckLength}
          </Text>
          <Text style={styles.cardText}>
            {showAnswer ?
              answerText:
              questionText
            }
          </Text>
          <TouchableOpacity 
            style={styles.toggleAnswer}
            onPress={this.handleFlip}>
            <Text style={styles.toggleAnswer}>
          {showAnswer ? 'show question' : 'show answer'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttons}>
          <Button 
              style={styles.correctButton} 
              title={'Correct'} 
              color='#75EBC5'
              onPress={() => nextCard(true)}
          />
          <Button 
              style={styles.incorrectButton} 
              title={'Incorrect'} 
              color='#ff7d7d'
              onPress={() => nextCard(false)}
          />
        </View>
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
  cardText: {
    fontSize: 30,
    fontFamily: 'futura',
    color: '#75EBC5',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 8,
  },
  cardNumber: {
    fontFamily: 'futura',
    color: '#eb91e8',
    fontWeight: 'bold',
    fontSize: 10,
    marginLeft: 10,
    marginBottom: 15,
  },
  toggleAnswer: {
    textAlign: 'center',
    fontFamily: 'futura',
    color: 'grey',
    marginTop: 10,

  },
  quizcard: {
    width: '95%'
  },
  buttons: {
    justifyContent: "space-around",
    height: 300,
    paddingBottom: 200,
    width: '75%'
  },
  incorrectButton: {
    marginTop: 40,
  }

})

QuizQuestion.propTypes = {
  cardNumber: PropTypes.number.isRequired,
  deckLength: PropTypes.number.isRequired,
  nextCard: PropTypes.func.isRequired,
  flashCard: PropTypes.object.isRequired,
}

export default QuizQuestion;