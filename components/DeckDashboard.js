import React, { Component } from "react";
import {
    View,
    FlatList,
    TouchableOpacity,
    InteractionManager
} from "react-native";
import { handleFetchDecks, receiveDecks } from "../actions";
import styled from "styled-components/native";
import { connect } from "react-redux";
import DeckCard from "./DeckCard";
import TextButton from "./TextButton";
import FadeView from "./FadeView";

class DeckDashboard extends Component {
    state = {
        fading: false,
        fadingIn: false,
        focusedDeck: ""
    };
    static navigationOptions = ({ navigation }) => {
        return {
            title: "Decks",
            headerRight: (
                <TextButton
                    onPress={() => navigation.navigate("AddDeck")}
                    input="ADD NEW DECK"
                    style={{ padding: 20, marginRight: 5, height: 40 }}
                />
            )
        };
    };

    didBlurSubscription = this.props.navigation.addListener("didBlur", () => {
        this.setState({ fading: false });
    });

    componentWillUnmount() {
        didBlurSubscription.remove();
    }
    componentDidMount() {
        this.setState({
            fading: false
        });
        this.props.dispatch(handleFetchDecks());
    }

    cardClick = (e, title) => {
        this.props.navigation.navigate("");
    };

    render() {
        return (
            <Container>
                {this.props.state !== undefined &&
                Object.values(this.props.state).length > 0 ? (
                    <FlatList
                        data={Object.values(this.props.state).sort((a, b) => {
                            return a.title.localeCompare(b.title);
                        })}
                        renderItem={data => (
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({
                                        fading: true,
                                        focusedDeck: data.item.title
                                    });

                                    InteractionManager.runAfterInteractions(
                                        () => {
                                            this.props.navigation.navigate(
                                                "Deck",
                                                {
                                                    deckKey: data.item.title
                                                }
                                            );
                                        }
                                    );
                                }}
                            >
                                <FadeView
                                    fading={
                                        data.item.title !==
                                        this.state.focusedDeck
                                            ? this.state.fading
                                            : false
                                    }
                                    fadingIn={this.state.fadingIn}
                                >
                                    <DeckCard deck={data.item} />
                                </FadeView>
                            </TouchableOpacity>
                        )}
                        keyExtractor={(deck, index) => deck.title}
                    />
                ) : (
                    <View>
                        <MediumText>
                            No Decks Created... Tap the Add New Deck button!
                        </MediumText>
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
`;

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
