import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import { Header } from "react-navigation";
import { handleAddQuestion } from "./../actions/index";
import { KeyboardAvoidingView } from "react-native";
import InputWithTitle from "./InputWithTitle";
import TextButton from "./TextButton";
import { offWhite } from "../utils/colors";
class AddCard extends Component {
    state = {
        question: "",
        answer: ""
    };

    render() {
        const { answer, question } = this.state;
        const deck = this.props.navigation.getParam("deckKey");
        const warningText = "Your question and answer must not be empty";
        const emptyCheck = answer != "" && question != "";

        return (
            <KeyboardAvoidingView
                keyboardVerticalOffset={Header.HEIGHT + 15}
                behavior="padding"
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 120
                }}
            >
                {!emptyCheck && (
                    <Text style={{ color: "red" }}>{warningText}</Text>
                )}
                <InputWithTitle
                    title="Question"
                    onChangeText={input => this.setState({ question: input })}
                    value={question}
                />

                <InputWithTitle
                    title="Answer"
                    onChangeText={input => this.setState({ answer: input })}
                    value={answer}
                />
                <TextButton
                    input="CREATE"
                    enabled={emptyCheck}
                    onPress={() => {
                        this.props.handleAddQuestion(deck, {
                            question: question,
                            answer: answer
                        });
                        this.props.navigation.goBack();
                    }}
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
export default connect(
    mapStateToProps,
    actionCreators
)(AddCard);
