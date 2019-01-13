import { AsyncStorage } from 'react-native';
import { DECKS_KEY, SINGLE_DECK_KEY, _addDeck, _addCard, _initDummyData, _getDecks, _createDeck } from './_decks';

export function fetchDecks() {
    return _getDecks()
}

//todo not sure I need the key here.  
export function addDeck(newDeck) {
    return _createDeck(newDeck)
}

export function addCard(newCard, deckId) {
    return _addCard(newCard, deckId)
}

export function initDummyData() {
    return _initDummyData()
}