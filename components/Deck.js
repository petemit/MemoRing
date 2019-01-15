import React, { Component } from 'react'
import { View, Text } from 'react-native';
import styled from 'styled-components'
import { offBlack } from '../utils/colors';
import DeckCard from './DeckCard';
import TextButton from './TextButton';

class Deck extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: (navigation.getParam('deck', {})).title,
          headerRight: (
            <TextButton
                onPress={() => navigation.navigate("AddCard", {
                    deck: (navigation.getParam('deck', {})).title,
                })}
                input = "Add New Card"
                style = {{padding: 20, marginRight: 5, height: 40}}
            />
                
                
        )
        };
      };
    render() {
        const deck = this.props.navigation.getParam('deck')
        return (
            <Container>
            <DeckCard borderOn={false} deck={deck}/>
                {/* <BigText>{deck}</BigText> */}
            </Container>
        )
    }

}

const Container = styled.View`
    align-items: center;
`

const BigText = styled.Text`
    font-size: 30;
`
const MediumText = styled.Text`
    font-size: 19;
    color: ${offBlack};
`

export default Deck