import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LPButton } from '../component/LPButton';
import { StackActions, NavigationActions } from 'react-navigation';

export default class SobreScreen extends Component {

    // configurando opções de navegação
    static navigationOptions = ({navigation}) => ({
      tabBarLabel: 'Sobre',
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

    constructor(props) {
        super(props);
        this.state = {};

        //this.voltar = this.voltar.bind(this);
        //this.telaPrincipal = this.telaPrincipal.bind(this);
    }

    /*voltar() {
        this.props.navigation.goBack();
    }

    telaPrincipal() {
        this.props.navigation.dispatch(
            StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Home' })
                ]
            })
        );
    }*/

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.textoHeader}>La Película</Text>
        </View>
        <Text style={{ color: 'grey', fontSize: 18, textAlign: 'center' }}>Tenha sempre em mãos os seus filmes favoritos.</Text>

        <View style={styles.corpo}>
          <Text style={styles.textoCorpo}>Versão 1.0.0</Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.textoFooter}>Developed by Jonas Daniel Hermany</Text>
        </View>

        {/*<LPButton titulo="Voltar" onPress={() => { this.voltar() } }></LPButton>
        <LPButton titulo="Tela Principal" onPress={() => { this.telaPrincipal() } }></LPButton>*/}
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textoHeader: {
    textAlign: 'center',
    fontSize: 35,
    color: '#ff9c09'
  },
  corpo: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 15,
  },
  textoCorpo: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 20
  },
  footer: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textoFooter: {
    fontSize: 20,
    color: 'black'
  }
});