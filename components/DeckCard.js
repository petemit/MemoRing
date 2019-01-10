import React from "react";
import { View, Text } from "react-native";
import  styled  from "styled-components";
import { Component } from "react";
import { offWhite, primary } from './../utils/colors';

class DeckCard extends Component {
    render() {
        return (
            <DeckStyle key={this.props.deck.title}>
                <BigText>{this.props.deck.title}</BigText>
                <MediumText>cards: {this.props.deck.cards.length}</MediumText>
            </DeckStyle>
        );
    }
}

const DeckStyle = styled.View`
    flex: 1;
    width: 100%;
    align-items: center;


    background-color: ${primary}
`;

const BigText = styled.Text`
    font-size: 22;
`
const MediumText = styled.Text`
    font-size: 19;
`

export default DeckCard;

//  /* <Text>{props.deck.cards.length}</Text> */
