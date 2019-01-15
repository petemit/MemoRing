import React, { Component } from 'react'
import { View, Text } from 'react-native';
import styled from 'styled-components'
import { offBlack } from '../utils/colors';
import DeckCard from './DeckCard';
import TextButton from './TextButton';
import { connect } from 'react-redux';

class Deck extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: (navigation.getParam('deckKey', {})),
          headerRight: (
            <TextButton
                onPress={() => navigation.navigate("AddCard", {
                    deckKey: (navigation.getParam('deckKey', {})),
                })}
                input = "Add New Card"
                style = {{padding: 20, marginRight: 5, height: 40}}
            />
                
                
        )
        };
      };
    render() {
        const deck = this.props.decks[this.props.navigation.getParam('deckKey')]
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

function mapStateToProps (state) {
    return {
        decks: state
    }
}
export default connect(mapStateToProps)(Deck)