import { fetchDecks } from "../utils/api";

export const RECEIVE_DECKS = "RECEIVE_DECKS"
export function receiveDecks(decks)  {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function handleFetchDecks() {
    return dispatch => {
        return fetchDecks()
        .then((decks) =>
         dispatch(receiveDecks(decks)))
    }
}