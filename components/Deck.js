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
                input = "ADD NEW CARD"
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
            <DeckCard deck={deck}/>
            {emptyCheck ? <TextButton
                    input="TAKE QUIZ"
                    enabled={emptyCheck}
                    onPress={() => {
                         this.props.navigation.navigate('Quiz', {
                             deckKey: deck.title
                         });}
                    }
                    style={{
                        marginTop: 10,
                        padding: 20,
                        maxHeight: 20,
                        maxWidth: 150,
                        alignSelf: "center",
                        backgroundColor: offWhite
                    }}
                />:<MediumText>No Cards Yet... Tap Add New Card!</MediumText>}
            </Container>
        )
    }

}

const Container = styled.View`
    flex:1;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 100px;
`

const BigText = styled.Text`
    font-size: 30;
`
const MediumText = styled.Text`
    font-size: 19;
    text-align: center;
    color: ${offBlack};
`

function mapStateToProps (state) {
    return {
        decks: state
    }
}
export default connect(mapStateToProps)(Deck)