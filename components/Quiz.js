import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import styled from "styled-components/native";
import { offWhite, black } from "../utils/colors";
import { Text, StyleSheet } from "react-native";
import TextButton from "./TextButton";
import {
    clearAllNotifications,
    setReminderNotification
} from "./../utils/helpers";

const ANSWER_VIEW = "ANSWER_VIEW";
const QUESTION_VIEW = "QUESTION_VIEW";
const SUMMARY_VIEW = "SUMMARY_VIEW";

class Quiz extends Component {
    /*
     * We are just going to assume that if the user gets to the Quiz component
     * t hat just by the mere act of opening the Quiz they have done some study
     * and thus we will not bother them with a notification
     */
    componentDidMount() {
        clearAllNotifications().then(setReminderNotification);
    }

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
            ANSWER_VIEW: "SHOW QUESTION",
            QUESTION_VIEW: "SHOW ANSWER",
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

                {/* Quiz Card */}
                {
                    {
                        ANSWER_VIEW: (
                            <Card>
                                <MediumText>
                                    {deck.cards[placeInQuiz] !== undefined &&
                                        deck.cards[placeInQuiz].answer}
                                </MediumText>
                            </Card>
                        ),
                        QUESTION_VIEW: (
                            <Card>
                                <MediumText>
                                    {deck.cards[placeInQuiz] !== undefined &&
                                        deck.cards[placeInQuiz].question}
                                </MediumText>
                            </Card>
                        ),
                        SUMMARY_VIEW: (
                            <Card>
                                <MediumText
                                    style={{
                                        textAlign: "center",
                                        fontSize: 22
                                    }}
                                >
                                    Your Score:{" "}
                                    {(
                                        (correctAnswers / deck.cards.length) *
                                        100
                                    ).toFixed(2)}
                                    %
                                </MediumText>
                                <MediumText
                                    style={{
                                        textAlign: "center",
                                        fontSize: 22
                                    }}
                                >
                                    You got {correctAnswers} out of{" "}
                                    {deck.cards.length} correct!
                                </MediumText>
                            </Card>
                        )
                    }[viewType]
                }

                {/* View Switcher */}
                {(viewType === QUESTION_VIEW || viewType === ANSWER_VIEW) && (
                    <TextButton
                        input={viewTypeToggleText}
                        onPress={this.changeViewType}
                        style={{
                            padding: 20,
                            maxHeight: 20,
                            marginTop: 10,
                            marginBottom: 10,
                            elevation: 3,
                            shadowColor: "rgba(0, 0,, 0, 0.24)",
                            shadowOffset: {
                                width: 0,
                                height: 3
                            },
                            shadowRadius: 6,
                            shadowOpacity: 1
                        }}
                    />
                )}

                {/* Button Row */}
                {viewType === QUESTION_VIEW || viewType === ANSWER_VIEW ? (
                    <ButtonRow>
                        <TextButton
                            input="CORRECT"
                            onPress={() => {
                                this.questionCounter(true, numberOfQuestions);
                            }}
                            style={styles.buttonRowStyle}
                        />

                        <TextButton
                            input="INCORRECT"
                            onPress={() => {
                                this.questionCounter(false, numberOfQuestions);
                            }}
                            style={styles.buttonRowStyle}
                        />
                    </ButtonRow>
                ) : (
                    <ButtonRow>
                        <TextButton
                            input="RESTART"
                            onPress={() => {
                                this.setState({
                                    correctAnswers: 0,
                                    placeInQuiz: 0,
                                    viewType: QUESTION_VIEW
                                });
                            }}
                            style={styles.buttonRowStyle}
                        />
                        <TextButton
                            input="FINISH"
                            onPress={() => {
                                navigation.goBack();
                            }}
                            style={styles.buttonRowStyle}
                        />
                    </ButtonRow>
                )}
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    buttonRowStyle: {
        marginTop: 10,
        padding: 20,
        maxHeight: 20,
        maxWidth: 150,
        backgroundColor: offWhite
    }
});

const Card = styled.View`
    flex: 1;
    width: 100%;
    padding: 20px;
    background-color: ${offWhite};
    border-radius: 10px;
`;

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
    color: ${black};
`;

function mapStateToProps(state) {
    return {
        decks: state
    };
}

export default connect(mapStateToProps)(Quiz);
