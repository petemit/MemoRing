import React, { Component } from "react";
import { View, Text } from "react-native";
import { handleFetchDecks, receiveDecks } from "../actions";
import styled from "styled-components";
import { connect } from "react-redux";
import DeckCard from "./DeckCard";

class DeckDashboard extends Component {
    componentDidMount() {
         this.props.dispatch(handleFetchDecks());
    }
    render() {
        const { decks } = this.props;
        return (
          <View>
              {decks !== undefined ? decks.map(deck => <DeckCard key={deck.title} deck={deck}/>)
              :<Text>Goodbye</Text>}
          </View>
        );
    }
}

const Container = styled(View)`
    flex: 1;
    padding: 20;
    justify-content: center;
`;

function mapStateToProps(state) {
    console.log(state)
    return {
        decks: [{}]
    };
}
export default connect(mapStateToProps)(DeckDashboard);
