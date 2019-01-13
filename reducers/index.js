import { RECEIVE_DECKS, ADD_DECK, REMOVE_DECK, ADD_QUESTION } from "../actions";

function decks(state = {}, action) {
    switch(action.type) {
        case RECEIVE_DECKS : 
        return {
            ...state,
            ...action.decks
        }
        case ADD_DECK : 
        return {
            ...state,
            [action.deck] : {
                title: action.deck,
                cards: []
            }
        }
        case REMOVE_DECK : 
        return state.filter(deck => action.deck !== deck)

        case ADD_QUESTION :
        return {
            ...state,
            [action.deck]: {
                title: state[action.deck].title,
                questions: state[action.deck].questions.concat(action.question)
            }

        }
        default: 
            return state;
    }
}

export default decks
