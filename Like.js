import React from 'react';
import { View, Text } from 'react-native';

class Like extends React.Component {
  render() {
    return (
      <View>
        {this.props.id && <Text style={style.buttonStyle}>❤</Text>}
      </View>
    )
  }
}

const style = {
  buttonStyle: {
    color: 'red',
    zIndex: 2,
    position: 'absolute',
    right: 20,
    bottom: 20,
  }
};

export default Like;