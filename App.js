import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import DeckDashboard from './components/DeckDashboard';
import reducer from './reducers'
import { MemoRingStatusBar } from './components/MemoRingStatusBar';
import { primary, primary_dark } from './utils/colors';
import { createStore } from 'redux'
import { Provider } from 'react-redux'



const MainNavigator = createStackNavigator({
  Home: {
      screen: DeckDashboard,
  },
})

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
      <MemoRingStatusBar backgroundColor={primary_dark} barStyle='light-content'/>
      <AppContainer/>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
