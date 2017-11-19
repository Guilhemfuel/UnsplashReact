import React from 'react';
import { View, Image, Dimensions, TouchableHighlight } from 'react-native';

class Picture extends React.Component {

  constructor() {
    super();

    this.state = {
      clicked: false,
    }
  }

  handleClick = () => {
    this.props.updateState();
  }

  render() {
    return (
      <View>
        <TouchableHighlight style={style.container} onPress={this.handleClick}>
          <Image source={{uri: this.props.img}} style={style.image}/>
        </TouchableHighlight>
      </View>
    )
  }
}

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

const style = {
  fullcontainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    left: 0,
    top: 0,
    width: width,
    height: height,
    padding: 10,
    zIndex: 2,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 2,
    height: height / 4,
    padding: 10,
    zIndex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  textStyle: {
    color: 'red',
    zIndex: 2,
    position: 'absolute',
    right: 20,
    bottom: 20,
  }
};

export default Picture;