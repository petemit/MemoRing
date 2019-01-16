import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components/native";
import { offBlack, offWhite } from "../utils/colors";
import { Text } from "react-native";
import TextButton from "./TextButton";

const ANSWER_VIEW = "ANSWER_VIEW";
const QUESTION_VIEW = "QUESTION_VIEW";
const SUMMARY_VIEW = "SUMMARY_VIEW";

class Quiz extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `${navigation.getParam("deckKey", {})} Quiz`
        };
    };

    state = {
        correctAnswers: 0,
        placeInQuiz: 0,
        viewType: QUESTION_VIEW
    };

    changeViewType = () => {
        switch (this.state.viewType) {
            case QUESTION_VIEW:
                this.setState({ viewType: ANSWER_VIEW });
                break;
            case ANSWER_VIEW:
                this.setState({ viewType: QUESTION_VIEW });
                break;
            default: {
            }
        }
    };
    questionCounter = (toAdd, numberOfQuestions) => {
        toAdd &&
            this.setState(oldState => {
                return { correctAnswers: oldState.correctAnswers + 1 };
            });

        if (this.state.placeInQuiz + 1 == numberOfQuestions) {
            this.setState(oldState => {
                return {
                    placeInQuiz: oldState.placeInQuiz + 1,
                    viewType: SUMMARY_VIEW
                };
            });
            //short circuit the rest of the function
            return;
        }
        this.setState(oldState => {
            return {
                placeInQuiz: oldState.placeInQuiz + 1,
                viewType: QUESTION_VIEW
            };
        });

        console.log(this.state.placeInQuiz);
        console.log(this.state.correctAnswers);
    };

    render() {
        const { decks, navigation } = this.props;
        const deckKey = navigation.getParam("deckKey", {});
        const { placeInQuiz, correctAnswers, viewType } = this.state;
        if (deckKey === undefined || deckKey === null) {
            return (
                <View>
                    <Text>Something went Wrong, please try again</Text>
                </View>
            );
        }
        const deck = decks[deckKey];
        const numberOfQuestions = deck.cards.length;
        const viewTypeToggleText = {
            ANSWER_VIEW: "Show Question",
            QUESTION_VIEW: "Show Answer",
            SUMMARY_VIEW: ""
        }[viewType];

        return (
            <Container>
                <MediumText>{`${placeInQuiz}/${numberOfQuestions}`}</MediumText>
                <BigText>
                    {
                        {
                            ANSWER_VIEW: "Answer",
                            QUESTION_VIEW: "Question",
                            SUMMARY_VIEW: "Summary"
                        }[viewType]
                    }
                </BigText>
                {(viewType === QUESTION_VIEW ||
                    viewType === ANSWER_VIEW) && (
                        <TextButton
                            input={viewTypeToggleText}
                            onPress={this.changeViewType}
                            style={{
                                padding: 20,
                                maxHeight: 20,
                                backgroundColor: offWhite
                            }}
                        />
                    )}
                {(viewType === QUESTION_VIEW ||
                    viewType === ANSWER_VIEW) && (
                        <ButtonRow>
                            <TextButton
                                input="Correct"
                                onPress={() => {
                                    this.questionCounter(
                                        true,
                                        numberOfQuestions
                                    );
                                }}
                                style={{
                                    padding: 20,
                                    maxHeight: 20,
                                    maxWidth: 120,
                                    textAlign: "center",
                                    backgroundColor: offWhite
                                }}
                            />

                            <TextButton
                                input="Incorrect"
                                onPress={() => {
                                    this.questionCounter(
                                        false,
                                        numberOfQuestions
                                    );
                                }}
                                style={{
                                    padding: 20,
                                    maxHeight: 20,
                                    maxWidth: 120,
                                    textAlign: "center",
                                    backgroundColor: offWhite
                                }}
                            />
                        </ButtonRow>
                    )}
            </Container>
        );
    }
}

const Container = styled.View`
    flex: 1;
    padding: 20px;
    align-items: center;
`;

const ButtonRow = styled.View`
    flex: 1;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
`;

const BigText = styled.Text`
    font-size: 30;
`;
const MediumText = styled.Text`
    font-size: 19;
    color: ${offBlack};
`;

function mapStateToProps(state) {
    return {
        decks: state
    };
}

export default connect(mapStateToProps)(Quiz);
