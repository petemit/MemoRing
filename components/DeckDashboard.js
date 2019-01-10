import React, { Component } from "react";
import { View, Text } from "react-native";
import { handleFetchDecks, receiveDecks } from "../actions";
import styled from "styled-components/native";
import { connect } from "react-redux";
import DeckCard from "./DeckCard";
import { initDummyData } from "../utils/api";

class DeckDashboard extends Component {
    componentDidMount() {
        //TODO remove
        initDummyData()
         this.props.dispatch(handleFetchDecks());
    }
    render() {
        
        return (
          <Container>
              {this.props.state !== undefined ? Object.values(this.props.state).map(deck => <DeckCard key={deck.title} deck={deck}/>
)
              :<Text>Goodbye</Text>}
          </Container>
        );
    }
}

const Container = styled.View`
    flex: 1;
    padding: 10px;
    align-items: center;
`;

function mapStateToProps(state) {
    return {
        state
    };
}
export default connect(mapStateToProps)(DeckDashboard);
