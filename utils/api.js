import {
    _addDeck,
    _addCard,
    _initDummyData,
    _getDecks,
    _createDeck
} from "./_decks";

export function fetchDecks() {
    return _getDecks();
}

export function addDeck(newDeck) {
    return _createDeck(newDeck);
}

export function addCard(deckId, newCard) {
    return _addCard(deckId, newCard);
}

export function initDummyData() {
    return _initDummyData();
}
