import { RECEIVE_DECKS } from "../actions";

function decks(state = {}, action) {
    switch(action) {
        case RECEIVE_DECKS : 
        return {
            ...state,
            ...action.decks
        }
    }
}

export default decks
