import { AsyncStorage } from 'react-native';
import { DECKS_KEY, SINGLE_DECK_KEY } from './_decks';

export function fetchDecks() {
    return AsyncStorage.getItem(DECKS_KEY)
}

//todo not sure I need the key here.  
export function addDeck(newDeck, key) {
    return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify({
        [key]: newDeck,
    }))
}

export function addCard(newCard, deckId) {
    return AsyncStorage.mergeItem(SINGLE_DECK_KEY, JSON.stringify({
        [deckId]: newCard
    }) )
}