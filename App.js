import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import Pics from './Pictures';
import Fav from './Favoris';
import {TabNavigator} from 'react-navigation';

class Home extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Pics/>
      </View>
    );
  }
}

class Favoris extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Fav/>
      </View>

    );
  }
}

const RootNavigator = TabNavigator({
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
      },
    },
    Favoris: {
      screen: Favoris,
      navigationOptions: {
        tabBarLabel: 'Favoris',
      },
    },
  },
  {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    lazy: true,
    tabBarOptions: {
      activeTintColor: 'white',
      style: {
        backgroundColor: 'black',
      },
    },
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RootNavigator;