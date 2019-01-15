import React, { Component } from "react";
import {
    View,
    Text,
    FlatList,
    List,
    ListItem,
    TouchableOpacity,
    StyleSheet
} from "react-native";
import { handleFetchDecks, receiveDecks } from "../actions";
import styled from "styled-components/native";
import { connect } from "react-redux";
import DeckCard from "./DeckCard";
import { initDummyData } from "../utils/api";
import TextButton from './TextButton';
import { primary } from "../utils/colors";

const styles = StyleSheet.create({
    headerText: {
        fontSize: 20,
        padding: 20,
        fontWeight: "bold"
    }
});

class DeckDashboard extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Decks",
            headerRight: (
                <TextButton
                    onPress={() => navigation.navigate("AddDeck")}
                    input = "Add New Deck"
                    style = {{padding: 20, marginRight: 5, height: 40}}
                />
                    
                    
            )
        };
    };
    componentDidMount() {
        //TODO remove
        initDummyData();
        this.props.dispatch(handleFetchDecks());
    }

    cardClick = (e, title) => {
        this.props.navigation.navigate("");
    };

    render() {
        return (
            <Container>
                {this.props.state !== undefined ? (
                    <FlatList
                        data={Object.values(this.props.state).sort((a,b) => {
                            return a.title.localeCompare(b.title)
                        })}
                        renderItem={data => (
                            <TouchableOpacity
                                onPress={() =>
                                    this.props.navigation.navigate("Deck", {
                                        deckKey: data.item.title
                                    })
                                }
                            >
                                <DeckCard deck={data.item} />
                            </TouchableOpacity>
                        )}
                        keyExtractor={(deck, index) => deck.title}
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
