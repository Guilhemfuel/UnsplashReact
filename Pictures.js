import React from 'react';
import Picture from './Picture'
import Like from './Like'
import {FlatList, View, Alert, Button, AsyncStorage} from 'react-native';
import Unsplash from 'unsplash-js/native';
import json from './data.json';

const unsplash = new Unsplash({
  applicationId: "1ce2b55762f0160da1f1e31934c7d92ad7547bd9ad70a539ddc587e5763d06c2",
  secret: "c12ae7db0b2e746cc6cab8647d249ce4ce4885140be1a2c84b1de99d5d07bfbe",
  callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
});

class Pictures extends React.Component {

  constructor() {
    super();

    this.state = {
      images: json,
      fav: [],
      img: false,
      page: 1,
    }
  }

  addFav(img) {

    console.log(this.state.fav);
    console.log("Store:" + img.id, this.state.fav.includes("Store:" + img.id));

    //AsyncStorage.clear();

    AsyncStorage.getAllKeys().then(result => {

      //Add or remove a picture from Favorites
      AsyncStorage.getItem('Store:' + img.id, (err, result) => {
        if (result) {

          const index = this.state.fav.indexOf('Store:' + img.id);
          const favoris = this.state.fav.slice();

          if(index !== -1) {
            favoris.splice(index, 1);
          }

          this.setState({fav: favoris});

          console.log("Remove picture from favoris");
          AsyncStorage.removeItem('Store:' + img.id);

          /*
          Alert.alert(
            'Image enlevé des favoris',
            null,
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false}
          );
          */
        }
        else {

          const favoris = this.state.fav.slice();
          favoris.push('Store:' + img.id);
          this.setState({fav: favoris});

          console.log("Add picture to favoris");
          AsyncStorage.setItem('Store:' + img.id, img.urls.regular);

          /*
          Alert.alert(
            'Image ajouté dans les favoris',
            null,
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false}
          );
          */
        }
      });

    });
  }

  loadPictures() {
    let p = this.state.page;
    p = p + 1;

    console.log(p);

    unsplash.photos.listPhotos(p, 10, "latest")
      .then(rep => rep.json())
      .then(json => {
        this.setState({
          images: json,
          page: p,
        })
      });
  }

  componentDidMount() {

    unsplash.photos.listPhotos(1, 10, "latest")
      .then(rep => rep.json())
      .then(json => {
        this.setState({
          images: json
        })
      });

    AsyncStorage.getAllKeys().then(result => {
      console.log(result);
      this.setState({
        fav: result
      })
    })
  }

  render() {
    return (
      <View>
        <FlatList
          styles={style}
          data={this.state.images}
          numColumns={2}
          onPress={() => this.addFav({fav: item.urls})}
          renderItem={({item}) => <View><Picture updateState={() => this.addFav(item)} img={item.urls.small} key={item.id}></Picture><Like id={this.state.fav.includes("Store:" + item.id)}/></View>}
        />
        <Button
          onPress={() => this.loadPictures()}
          title="Load more"
          color="#a0790e"
          accessibilityLabel="Load more pictures"
        />
      </View>
    )
  }
}

const style = {};

export default Pictures;
