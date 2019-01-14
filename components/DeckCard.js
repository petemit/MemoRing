import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";
import { Component } from "react";
import { offWhite, primary, black, offBlack } from "./../utils/colors";

const DeckCard = props => {
    const { deck, borderOn = true } = props;
    return (
        //I obviously am not very good with styled components yet... 
        borderOn ? <Border>
            <DeckStyle key={deck.title}>
                <BigText>{deck.title}</BigText>
                <MediumText>
                    cards: {deck.cards === undefined ? 0 : deck.cards.length}
                </MediumText>
            </DeckStyle>
        </Border>
        : 
        <DeckStyle key={deck.title}>
            <BigText>{deck.title}</BigText>
            <MediumText>
                cards: {deck.cards === undefined ? 0 : deck.cards.length}
            </MediumText>
        </DeckStyle>
    );
};

const Border = styled.View`
    border: 1px solid ${offBlack};
`;
const DeckStyle = styled.View`
    padding: 16px;
    width: 100%;
    height: 200px;
    justify-content: center;

    align-items: center;

    background-color: ${offWhite};
`;

const BigText = styled.Text`
    font-size: 30;
`;
const MediumText = styled.Text`
    font-size: 19;
    color: ${offBlack};
`;

export default DeckCard;

//  /* <Text>{props.deck.cards.length}</Text> */
