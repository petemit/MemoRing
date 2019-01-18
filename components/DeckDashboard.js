import React, { Component } from "react";
import {
    View,
    FlatList,
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
                    input = "ADD NEW DECK"
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
                {this.props.state !== undefined && Object.values(this.props.state).length > 0 ? (
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
                    <View>
                    <MediumText>No Decks Created... Tap the Add New Deck button!</MediumText> 
                    <MediumText> </MediumText>
                    </View>
                )}
            </Container>
        );
    }
}

const MediumText = styled.Text`
    font-size: 19;
    align-self: center;
    text-align: center;
    width: 300px;
    margin-top: 100px;
`

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
