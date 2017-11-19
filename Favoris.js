import React from 'react';
import Picture from './Picture';
import {FlatList, View, Button, Dimensions, AsyncStorage} from 'react-native';

class Favoris extends React.Component {
  constructor() {
    super();

    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {

          let key = store[i][0];
          let value = store[i][1];

          const images = this.state.images.slice();
          images.push({key: key, value: value});
          this.setState({images: images});
        });
      });
    });

    this.state = {
      images: [],
      clicked: false,
      column: 1,
    }
  }

  updateComponent() {
    console.log('Update Favoris');

    this.setState({images: []});

    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        stores.map((result, i, store) => {

          let key = store[i][0];
          let value = store[i][1];

          const images = this.state.images.slice();
          images.push({key: key, value: value});
          this.setState({images: images});
        });
      });
    });

  }

render() {
    return (
      <View style={style}>
        <FlatList
          styles={style}
          data={this.state.images}
          extraData={this.state.images}
          numColumns={2}
          renderItem={({item}) => <Picture updateState={() => null} img={item.value} key={item.key}></Picture>}
        />
        <Button
          onPress={() => this.updateComponent()}
          title="Reload"
          color="#a0790e"
          accessibilityLabel="Reload your favoris pictures"
        />
      </View>
    )
  }
}

const dimensions = Dimensions.get('window');
const width = dimensions.width;
const height = dimensions.height;

const style = {
};

export default Favoris;