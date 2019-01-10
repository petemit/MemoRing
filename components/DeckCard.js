import React from 'react'
import { View, Text } from 'react-native'

const DeckCard = props => {
    return (
        <View>
            <Text>{props.deck.title}</Text>
        </View>
    )
}

export default DeckCard

//  /* <Text>{props.deck.cards.length}</Text> */