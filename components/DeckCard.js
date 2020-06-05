import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { TouchableOpacity, StyleSheet, Text } from 'react-native';



class DeckCard extends Component{

  handlDeckPress = (event) => {
    this.props.onD
  }

  render() {
    const {deck, onClick} = this.props;
    //console.log(deck);
    const title = deck.title;
    const numberOfCards = deck.questions.length + ' cards';
    //console.log(deck);

    return(
      <TouchableOpacity
        style={styles.deckcard}
        onPress={() => onClick(title)}
      >
        <Text style={styles.header}>{title}</Text>
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
    //fontFamily: 'Futura',
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