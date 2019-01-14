import React from "react";
import { View, Text, KeyboardAvoidingView } from "react-native";
import InputWithTitle from "./InputWithTitle";
import { Header } from "react-navigation";
import { Component } from "react";
import TextButton from "./TextButton";
import { offWhite } from "./../utils/colors";
import { connect } from "react-redux";

import { handleAddDeck } from "../actions";

class AddDeck extends Component {
    state = {
        deckTitle: "Deck"
    };

    render() {
        const warningText = "You must have a unique deck name";
        const uniqueCheck =
            this.props.decks[this.state.deckTitle] === undefined;

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
                {!uniqueCheck && (
                    <Text style={{ color: "red" }}>{warningText}</Text>
                )}
                <InputWithTitle
                    title="Deck Title"
                    onChangeText={deckTitle => this.setState({ deckTitle })}
                    value={this.state.deckTitle}
                />
                <TextButton
                    input="CREATE"
                    enabled={uniqueCheck}
                    onPress={() => {
                        
                         this.props.handleAddDeck(this.state.deckTitle)
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
    handleAddDeck
};
function mapStateToProps(state) {
    return {
        decks: state
    };
}
export default connect(
    mapStateToProps,
    actionCreators
)(AddDeck);
