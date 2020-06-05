import React, { Component } from 'react';

import { Button, Text, SafeAreaView, StyleSheet } from 'react-native'

import PropTypes from 'prop-types';

import Constants from 'expo-constants';

class FinishedQuiz extends Component {


  render(){

    const {numberOfCards, numberOfCorrect, reset} = this.props;
    return(
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>
        You got {numberOfCorrect} / {numberOfCards} correct
        </Text>
        <Button 
            style={styles.resetButton} 
            title={'Reset'} 
            color='#ff7d7d'
            onPress={reset}
        />
        <Button 
            style={styles.backToDeckButton} 
            title={'Back to Deck'} 
            color='#75EBC5'
            onPress={this.props.backToDeck}
        />
      </SafeAreaView>
    )
  }

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: 'space-around',
  },
  text: {
    fontSize: 25,
    fontFamily: 'futura',
    textAlign: 'center',
    color: '#75EBC5',
  },
  resetButton: {
    height: 40,
    color: '#75EBC5',
    marginHorizontal: 10,
  },
  backToDeckButton: {
    height: 40,
    color: '#75EBC5',
    marginHorizontal: 10,
  }
})


FinishedQuiz.propTypes = {
  reset: PropTypes.func.isRequired,
  numberOfCorrect: PropTypes.number.isRequired,
  numberOfCards: PropTypes.number.isRequired,
}

export default FinishedQuiz;







