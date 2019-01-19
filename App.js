import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import DeckDashboard from "./components/DeckDashboard";
import reducer from "./reducers";
import { MemoRingStatusBar } from "./components/MemoRingStatusBar";
import { primary, primary_dark } from "./utils/colors";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { initDummyData } from "./utils/api";
import middleware from "./middleware";
import Deck from "./components/Deck";
import { TouchableOpacity } from "react-native";
import styled from "styled-components";
import AddDeck from "./components/AddDeck";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import { setReminderNotification } from "./utils/helpers";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
});

const MainNavigator = createStackNavigator({
    Home: {
        screen: DeckDashboard,
        navigationOptions: {
            headerStyle: {
                backgroundColor: primary
            }
        }
    },
    Deck: {
        screen: Deck,
        navigationOptions: {
            headerStyle: {
                backgroundColor: primary
            }
        }
    },
    AddDeck: {
        screen: AddDeck,
        navigationOptions: {
            title: "Add New Deck",
            headerStyle: {
                backgroundColor: primary
            }
        }
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: {
            title: "Add New Card",
            headerStyle: {
                backgroundColor: primary
            }
        }
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            headerStyle: {
                backgroundColor: primary
            }
        }
    }
});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
    componentDidMount() {
        setReminderNotification();
    }
    render() {
        return (
            <Provider store={createStore(reducer, middleware)}>
                <MemoRingStatusBar
                    backgroundColor={primary_dark}
                    barStyle="light-content"
                />
                <AppContainer />
            </Provider>
        );
    }
}
