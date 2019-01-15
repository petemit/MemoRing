import { fetchDecks, addDeck as addDeckApi, addCard } from "../utils/api";
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

function addQuestion(deck, question)  {
    return {
        type: ADD_QUESTION,
        question,
        deck
    }
}

export function handleAddDeck(deckTitle) {
    return (dispatch, getState) => {
        dispatch(addDeck(deckTitle))
        return addDeckApi(deckTitle).catch(e => {
            dispatch(removeDeck(deckTitle));
            console.warn("Error in adding deck")
            alert('There was an issue, please try again')
        })
    }
}

/*
* I'm opting to not include a catch for adding a question since
* I would have to add a key for each question.  If the state
* and project was any more complicated I would break up the state
* and add a key.
*/
export function handleAddQuestion(deck, question) {
    return (dispatch, getState) => {
        return addCard(deck, question).then(
            dispatch(addQuestion(deck, question))
        )
    }
}


export function handleFetchDecks() {
    return dispatch => {
        return fetchDecks()
        .then((decks) =>
         dispatch(receiveDecks(decks)))
    }
}