import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Picker, TouchableHighlight, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { FlatList } from 'react-native-gesture-handler';
var db = openDatabase({ name: 'lapelicula.db' });

//Component de Filme
class Filme extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight underlayColor="blue" >
          <ImageBackground resizeMode="cover" source={require('../img/banner_film.jpg')} style={{ height: 150 }}>
              <View style={{
                flex: 1,
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
                paddingLeft: 10,
                paddingBottom: 10
              }}>
                <Text style={{ fontSize: 23, color: '#FFFFFF', fontWeight: 'bold' }}>{this.props.data.title}, {this.props.data.releaseYear}</Text>
              </View>
          </ImageBackground>
        </TouchableHighlight>
      </View>
      );
  }
}

export default class FilmesByApiScreen extends Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }


  getFilmByApi() {
    return fetch('https://www.omdbapi.com/?i=tt3896198&apikey=251b25d7')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }

  // configurando opções de navegação
  static navigationOptions = ({navigation}) => ({
    tabBarLabel: 'Estou com sorte',
    tabBarIcon: ({focused, tintColor}) => {
      if(focused) {
        return (
          <Image source={require('../img/cadastrar_ativo.png')} style={{width: 26, height: 26}}></Image>
        );
      } else {
        return (
          <Image source={require('../img/cadastrar_inativo.png')} style={{width: 26, height: 26}}></Image>
        );
      }
    }
  });

  render() {

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20, backgroundColor: 'white'}}>
        <FlatList data={this.state.dataSource} renderItem={({item}) => <Filme data={item}></Filme>} keyExtractor={({id}, index) => id}></FlatList>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});