import React from "react";
import styled from "styled-components";
import { offWhite, offBlack } from "./../utils/colors";

const DeckCard = props => {
    const { deck } = props;
    return (
        <DeckStyle key={deck.title}>
            <BigText>{deck.title}</BigText>
            <MediumText>
                cards: {deck.cards === undefined ? 0 : deck.cards.length}
            </MediumText>
        </DeckStyle>
    );
};

const DeckStyle = styled.View`
    padding: 16px;
    width: 100%;
    height: 200px;
    justify-content: center;
    border: 1px solid ${offBlack};
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
