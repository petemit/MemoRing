import React, { Component } from 'react'
import { View, Text } from 'react-native';

class Deck extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('deckId', 'Deck'),
        };
      };
    render() {
        return (
            <View>
                <Text>Why hello... welcome to the Deck detail</Text>
            </View>
        )
    }

}

export default Deck