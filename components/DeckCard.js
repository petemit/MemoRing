import React from "react";
import { View, Text } from "react-native";
import  styled  from "styled-components";
import { Component } from "react";
import { offWhite, primary, black, offBlack } from './../utils/colors';

class DeckCard extends Component {
    render() {
        const {deck} = this.props
        return (
            <DeckStyle key={deck.title}>
                <BigText>{deck.title}</BigText>
                <MediumText>cards: {deck.cards.length}</MediumText>
            </DeckStyle>
        );
    }
}

const DeckStyle = styled.View`
    padding: 16px;
    width: 100%;
    height: 200px;
    justify-content: center;
    border: 1px solid ${offBlack};
    align-items: center;


    background-color: ${offWhite}
`;

const BigText = styled.Text`
    font-size: 30;
`
const MediumText = styled.Text`
    font-size: 19;
    color: ${offBlack};
`

export default DeckCard;

//  /* <Text>{props.deck.cards.length}</Text> */
