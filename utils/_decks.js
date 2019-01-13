import { AsyncStorage } from "react-native";
export const DECKS_KEY = "DECKS_KEY";
export const SINGLE_DECK_KEY = "SINGLE_DECK_KEY";

let dummyCards = {
    myDeck1: {
        title: "myDeck1",
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
    myDeck2: {
        title: "myDeck2",
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
    },
    myDeck3: {
        title: "myDeck3",
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
    myDeck4: {
        title: "myDeck4",
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
    },
    myDeck5: {
        title: "myDeck5",
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
    myDeck6: {
        title: "myDeck6",
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
    },
    myDeck7: {
        title: "myDeck7",
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
    myDeck8: {
        title: "myDeck8",
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
    },
    
};

export function _initDummyData() {
    Object.values(dummyCards).map(deck => _addDeck(deck, deck.title))
    
}

export function _addDeck(newDeck, key) {
    return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify({
        [key]: newDeck,
    }))
}

export function _createDeck(newDeck) {
    return AsyncStorage.mergeItem(DECKS_KEY, JSON.stringify({
        [newDeck]: {
            title: newDeck,
            cards: [], 
        },
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
