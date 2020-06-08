import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { TouchableOpacity, StyleSheet, Text, Animated } from 'react-native';



class DeckCard extends Component{

  state = {
    fontSize: new Animated.Value(30)
  }

  handlDeckPress = (event) => {
    const {onClick, deck} = this.props;
    const { fontSize } = this.state;

    Animated.timing(fontSize,  {toValue: 35}).start(() => {
      fontSize.setValue(30);
      onClick(deck.title);
    })
  }

  render() {
    const {deck, onClick} = this.props;
    //console.log(deck);
    const title = deck.title;
    const numberOfCards = deck.questions.length + ' cards';
    //console.log(deck);
    const { fontSize } = this.state;

    return(
      <TouchableOpacity
        style={styles.deckcard}
        onPress={this.handlDeckPress}
      >
        <Animated.Text style={[styles.header, { fontSize }]}>{title}</Animated.Text>
        <Text style={styles.subheader}> {numberOfCards} </Text>
      </TouchableOpacity>
    );

  }
}

/*
      <TouchableOpacity
        style={styles.deckcard}
        onPress={this.handleDeckPress}
      >
        <Text style={styles.header}>{title}</Text>
        <Text style={styles.subheader}> {numberOfCards} </Text>

      </TouchableOpacity>
      */

const styles = StyleSheet.create({
  deckcard: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  header: {
    fontSize: 32,
  },
  subheader: {
    fontSize: 15,
    marginTop: 3,

  }


})

DeckCard.propTypes = {
  deck: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

export default DeckCard;