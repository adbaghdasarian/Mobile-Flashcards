import AsyncStorage from '@react-native-community/async-storage';

const sampleDeckList = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces',
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event',
      },
    ],
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer:
          'The combination of a function and the lexical environment within which that function was declared.',
      },
    ],
  },
};

AsyncStorage.setItem('UdaciCards:decklist', JSON.stringify(sampleDeckList));

export const _retrieveDecks = async () => {
  try {
    const value = await AsyncStorage.getItem('UdaciCards:decklist')
    if (value !== null) {
      // We have data!!
      //console.log(value);
      return value;
    }
  } catch (error) {
    // Error retrieving data
  }
};

/*export async function _retrieveDecks2() {
  return await AsyncStorage.getItem('decklist');
}*/

export const _retrieveDeck = async (deckTitle) => {
 
 _retrieveDecks.then((decks) => console.log(JSON.parse(decks)));
}

export function _saveDeckTitle(deckTitle) {
  //console.log('fired');
  return AsyncStorage.mergeItem('UdaciCards:decklist', JSON.stringify({
    [deckTitle]: {
      title: deckTitle,
      questions: []
    },
  })).then((result) => {/*console.log(result + 'save deck')}*/});
}

export function _addCardToDeck(deckTitle, question, answer) {
  return AsyncStorage.getItem('UdaciCards:decklist')
  .then(
    (decklist) => {
      const oldDeck = JSON.parse(decklist)[deckTitle];
      const oldQuestions = oldDeck.questions;

      const newQuestion = {question, answer}
      console.log(newQuestion);

      return AsyncStorage.mergeItem('UdaciCards:decklist', JSON.stringify({
        [deckTitle]: {
          title: deckTitle,
          questions: oldQuestions.concat([newQuestion]),
        },
      }))
    }
  ).then((result) => {console.log('hello')})
}

export function _deleteDeck (deckTitle) {

  return AsyncStorage.getItem('UdaciCards:decklist')
    .then((decks) => {
      const deckData = JSON.parse(decks);
      deckData[deckTitle] = undefined;
      delete deckData[deckTitle];
      AsyncStorage.setItem('UdaciCards:decklist', JSON.stringify(deckData));
    })
}