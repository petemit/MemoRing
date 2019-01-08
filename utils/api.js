import { AsyncStorage } from 'react-native';
import { DECKS_KEY } from './_decks';

export function fetchDecks() {
    return AsyncStorage.getItem(DECKS_KEY)
}

export function addDeck(newDeck, key) {
    return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify({
        [key]: newDeck,
    }))
}

export function addCard(newCard, deckId) {
    
}