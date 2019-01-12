import { fetchDecks } from "../utils/api";

export const RECEIVE_DECKS = "RECEIVE_DECKS"
export const ADD_DECK = "ADD_DECK"
export const REMOVE_DECK = "REMOVE_DECK"
export const ADD_QUESTION = "ADD_QUESTION"

function receiveDecks(decks)  {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

function addDeck(deck)  {
    return {
        type: ADD_DECK,
        deck
    }
}

function removeDeck(deck)  {
    return {
        type: REMOVE_DECK,
        deck
    }
}

function addQuestion(deck)  {
    return {
        type: ADD_QUESTION,
        deck
    }
}
//TODO need to remove deck if call fails.  Also need to update db.  
export function handleAddDeck(deckTitle) {
    return (dispatch, getState) => {
        dispatch(addDeck(deck))
    }
}

export function handleFetchDecks() {
    return dispatch => {
        return fetchDecks()
        .then((decks) =>
         dispatch(receiveDecks(decks)))
    }
}