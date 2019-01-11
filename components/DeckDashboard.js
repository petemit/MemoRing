import React, { Component } from "react";
import { View, Text, FlatList, List, ListItem } from "react-native";
import { handleFetchDecks, receiveDecks } from "../actions";
import styled from "styled-components/native";
import { connect } from "react-redux";
import DeckCard from "./DeckCard";
import { initDummyData } from "../utils/api";

class DeckDashboard extends Component {
    componentDidMount() {
        //TODO remove
        initDummyData();
        this.props.dispatch(handleFetchDecks());
    }
    render() {
        return (
            <Container>
                {this.props.state !== undefined ? (
                    <FlatList
                        data={Object.values(this.props.state)}
                        renderItem={data => (
                            <DeckCard deck={data.item} />
                        )}
                        //todo should I make the keys unique?
                        keyExtractor= {(deck, index) => deck.title}
                    />
                ) : (
                    <Text>Goodbye</Text>
                )}
            </Container>
        );
    }
}

const Container = styled.View`
    flex: 1;
    padding: 5px;
`;

function mapStateToProps(state) {
    return {
        state
    };
}
export default connect(mapStateToProps)(DeckDashboard);
