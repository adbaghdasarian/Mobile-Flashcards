import React, { Component } from 'react';

import { Button, Text, TextInput, SafeAreaView, StyleSheet, View} from 'react-native'

import Constants from 'expo-constants';

import { _addCardToDeck as saveCard } from '../utils/api';


class NewCard extends Component {

  state={
    question: '',
    answer: ''
  }

  handleQuestionInput = (text) => {
    this.setState({
      question: text
    })
  }
  handleAnswerInput = (text) => {
    this.setState({
      answer: text
    })
  }
  handleAddCard = (event ) => {
    const { navigation, route } = this.props;
    //add to Asynstorage and reroute back to deck
    const { question, answer} = this.state;
    const activeDeckTitle = route.params.activeDeck;


    //saves card then cleans inputs and navigates back to deck
    saveCard(activeDeckTitle, question, answer)
    .then(() => {
      this.setState({question: '', answer: ''});
      navigation.navigate('Deck', route.params);
    });



  }


  render() {
    return(
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.inputHeader}> Question </Text>
          <TextInput
            defaultValue={'question'}
            value={this.state.question}
            onChangeText={this.handleQuestionInput}
            style={styles.input}
          />
        </View>
        <View>
          <Text style={styles.inputHeader}> Answer </Text>
          <TextInput
            defaultValue={'Answer'}
            value={this.state.answer}
            onChangeText={this.handleAnswerInput}
            style={styles.input}
          />
        </View>
        <Button
          style={styles.button}
          title={'Add Card'}
          color='#eb91e8'
          onPress={this.handleAddCard}
        />

       </SafeAreaView>
    );

  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    justifyContent: 'space-around',
  },
  input: {
     height: 40,
     borderColor: 'gray',
     borderWidth: 1,
     marginHorizontal: 5,
  },
  button: {
    height: 40,
    color: '#75EBC5',
    width: '80%',
    marginHorizontal: 10,
  },
  inputHeader: {
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'serif',
    marginBottom: 10,
    color: '#75EBC5'
  }
})

export default NewCard