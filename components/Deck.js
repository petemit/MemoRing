import React, { Component } from 'react'
import { View, Text } from 'react-native';
import styled from 'styled-components'
import { offBlack, offWhite } from '../utils/colors';
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
        const emptyCheck = deck.cards.length > 0
        return (
            <Container>
            <DeckCard borderOn={false} deck={deck}/>
            <TextButton
                    input="TAKE QUIZ"
                    enabled={emptyCheck}
                    onPress={() => {
                         this.props.navigation.navigate('Quiz', {
                             deckKey: deck.title
                         });}
                    }
                    style={{
                        padding: 20,
                        maxHeight: 20,
                        backgroundColor: offWhite
                    }}
                />
            </Container>
        )
    }

}

const Container = styled.View`
    align-items: center;
    padding-top: 100px;
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