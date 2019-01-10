import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import DeckDashboard from './components/DeckDashboard';
import reducer from './reducers'
import { MemoRingStatusBar } from './components/MemoRingStatusBar';
import { primary, primary_dark } from './utils/colors';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { initDummyData } from './utils/api';
import middleware from './middleware';



const MainNavigator = createStackNavigator({
  Home: {
      screen: DeckDashboard,
  },
})

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  componentDidMount() {
    initDummyData()
  }
  render() {
    return (
      <Provider store={createStore(reducer, middleware)}>
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
