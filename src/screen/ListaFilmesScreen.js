import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Picker, TouchableHighlight, TouchableOpacity, ImageBackground, ActivityIndicator } from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';
import { FlatList } from 'react-native-gesture-handler';
var db = openDatabase({ name: 'lapelicula.db' });

//Component de Filmes
class Filmes extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.props.onClick} underlayColor="blue" >
          <ImageBackground resizeMode="cover" source={{ uri: this.props.data.imagem }} style={{ height: 150 }}>
              <View style={{
                flex: 1,
                alignItems: 'flex-start',
                justifyContent: 'flex-end',
                paddingLeft: 10,
                paddingBottom: 10
              }}>
                <Text style={{ fontSize: 23, color: '#FFFFFF', fontWeight: 'bold' }}>{this.props.data.descricao}</Text>
                <View style={{ width: 30, heigth: 30 }}>
                  <TouchableOpacity onPress={this.props.onPress}>
                    <View>
                      <Image source={require('../img/delete.png')} />
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
          </ImageBackground>
        </TouchableHighlight>
      </View>
      );
  }
}

export default class ListaFilmesScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      codigo: null,
      descricao: '',
      uri: null,
      filmes: [],
      orderBy: 'descricao'
    }

    this.onClickFilm = this.onClickFilm.bind(this);
    this.deleteFilm = this.deleteFilm.bind(this);

    // buscar os dados dos filmes na base
    /*db.transaction(tx => {
      tx.executeSql('SELECT * FROM filme ORDER BY descricao', [], 
        (tx, res) => {
          //tratar o resultado da consulta
          var temp = []

          for (let i = 0; i < res.rows.length; i++) {
            temp.push(res.rows.item(i));
          }
          // seta os filmes para exibir no flatlist
          this.setState({ filmes: temp });
        });
    });*/
  }

  getFilms(order) {
    let query = (order == '' || order == null || order == undefined) ? 'SELECT * FROM filme ORDER BY descricao' : 'SELECT * FROM filme ORDER BY ' + order;
  
    // buscar os dados dos filmes na base
    db.transaction(tx => {
      tx.executeSql(query, [], 
        (tx, res) => {
          //tratar o resultado da consulta
          var temp = []

          for (let i = 0; i < res.rows.length; i++) {
            temp.push(res.rows.item(i));
          }
          // seta os filmes para exibir no flatlist
          this.setState({ filmes: temp });
        });
    });
  }

  getFilmsByOrder(order) {
    this.setState({ orderBy: order });
    this.getFilms(order);
  }

  onClickFilm(item) {
    this.props.navigation.navigate('Filme', { data: item });
  }

  deleteFilm(codigo) {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM filme WHERE codigo = ' + codigo, [],
        (tx, res) => {
          if (res.rowsAffected != 0) {
            alert('Filme removido com sucesso!');
          }
        });
    });

    this.getFilms();
  } 

  // configurando opções de navegação
  static navigationOptions = ({navigation}) => ({
    tabBarLabel: 'Lista Filmes',
    tabBarIcon: ({focused, tintColor}) => {
      if(focused) {
        return (
          <Image source={require('../img/home_ativo.png')} style={{width: 26, height: 26}}></Image>
        );
      } else {
        return (
          <Image source={require('../img/home_inativo.png')} style={{width: 26, height: 26}}></Image>
        );
      }
    }
  });

  render() {

    return (
      <View style={styles.container}>
        <Text style={{ color:"#000", fontSize: 20, padding: 4 }}>Ordenar por:</Text>
        <Picker
          selectedValue={this.state.orderBy}
          style={{ height: 50, width: 200 }}
          onValueChange={(itemValue, itemIndex) =>
            this.getFilmsByOrder(itemValue)
          }>
          <Picker.Item label="Código" value="codigo" />
          <Picker.Item label="Descrição" value="descricao" />
        </Picker>

        <FlatList data={this.state.filmes} keyExtractor={item => item.codigo.toString()} renderItem={({item}) => <Filmes onClick={() => this.onClickFilm(item)} onPress={() => this.deleteFilm(item.codigo)} data={item}></Filmes>}></FlatList>
      </View>
    );
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener("didFocus", () => {
      this.getFilms();
    });
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});