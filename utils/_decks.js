import { AsyncStorage } from "react-native";
export const DECKS_KEY = "DECKS_KEY";
export const SINGLE_DECK_KEY = "SINGLE_DECK_KEY";

let dummyCards = {
    deck1: {
        title: "deck1",
        cards: [
            {
                question: "why?",
                answer: "because"
            },
            {
                question: "why not?",
                answer: "because of that!"
            }
        ]
    },
    deck2: {
        title: "deck2",
        cards: [
            {
                question: "I do?",
                answer: "sometimes"
            },
            {
                question: "I don't?",
                answer: "always!"
            }
        ]
    }
};

export function _initDummyData() {
    _addDeck(dummyCards.deck1, dummyCards.deck1.title)
    _addDeck(dummyCards.deck2, dummyCards.deck2.title)
}

export function _addDeck(newDeck, key) {
    return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify({
        [key]: newDeck,
    }))
}

export function _addCard(newCard, deckId) {
    return AsyncStorage.mergeItem(SINGLE_DECK_KEY, JSON.stringify({
        [deckId]: newCard
    }) )
}

export function _getDecks() {
    return AsyncStorage.getItem(DECKS_KEY)
    .then(result => JSON.parse(result))
}
