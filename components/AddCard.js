import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';
import { Header } from "react-navigation";
import { handleAddQuestion } from './../actions/index';
import { KeyboardAvoidingView } from 'react-native';
import InputWithTitle from './InputWithTitle';
import TextButton from './TextButton';
import { offWhite } from '../utils/colors';
class AddCard extends Component {
    state = {
        question: "Question",
        answer: "Answer"
    };

    render() {
        const { answer: cardAnswer, question: cardQuestion } = this.state
        const deck = this.props.navigation.getParam('deckKey')
        const warningText = "Your question and answer must not be empty";
        const emptyCheck = cardAnswer != "" && cardQuestion != ""

        return (
            <KeyboardAvoidingView
                keyboardVerticalOffset={Header.HEIGHT + 15}
                behavior="padding"
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                {!emptyCheck && (
                    <Text style={{ color: "red" }}>{warningText}</Text>
                )}
                <InputWithTitle
                    title="Question"
                    onChangeText={cardQuestion => this.setState({ cardQuestion })}
                    value={cardQuestion}
                />

                <InputWithTitle
                    title="Answer"
                    onChangeText={cardAnswer => this.setState({ cardAnswer })}
                    value={cardAnswer}
                />
                <TextButton
                    input="CREATE"
                    enabled={emptyCheck}
                    onPress={() => {
                         this.props.handleAddQuestion(deck, {"question": cardQuestion, "answer": cardAnswer})
                         this.props.navigation.goBack();}
                    }
                    style={{
                        padding: 20,
                        maxHeight: 20,
                        backgroundColor: offWhite
                    }}
                />
            </KeyboardAvoidingView>
        );
    }
}
const actionCreators = {
    handleAddQuestion
};
function mapStateToProps(state) {
    return {
        decks: state
    };
}
export default connect(mapStateToProps, actionCreators)(AddCard)
