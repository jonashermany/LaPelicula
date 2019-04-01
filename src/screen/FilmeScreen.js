import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { LPButton } from '../component/LPButton';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'lapelicula.db' });

export default class FilmeScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        tabBarLabel: 'Cad. Filme',
        tabBarIcon: ({ focused, tintColor }) => {
            if (focused) {
                return (
                    <Image source={require('../img/cadastrar_ativo.png')} style={{ width: 26, height: 26 }} />
                );
            } else {
                return (
                    <Image source={require('../img/cadastrar_inativo.png')} style={{ width: 26, height: 26 }} />
                );
            }
        }
    });

    constructor(props) {
        super(props);
        this.state = {
            codigo: null,
            descricao: '',
            uri: null
        };

        this.abrirCamera = this.abrirCamera.bind(this);
        this.salvar = this.salvar.bind(this);
    }

    // quando o componente foi criado/montado
    componentDidMount() {
        if( typeof this.props.navigation.state.params !== "undefined") {
            this.setState({uri: this.props.navigation.state.params.imguri});

            if (typeof this.props.navigation.state.params.data !== "undefined") {
                this.setState({ descricao: this.props.navigation.state.params.data.descricao });
                this.setState({ uri: this.props.navigation.state.params.data.imagem });
            }
        }
    }

    abrirCamera() {
        this.props.navigation.navigate('Camera');
    }

    salvar() {
        if ((typeof this.props.navigation.state.params !== "") &&
        (typeof this.props.navigation.state.params.data !== "")) {
            // update no banco
            db.transaction(tx => {
                tx.executeSql('UPDATE filme SET descricao = ?, imagem = ? where codigo = ?',
                [this.state.descricao, this.state.uri, this.props.navigation.state.params.data.codigo]);
            });
        } else {
            // insert no banco
            db.transaction(tx => {
                tx.executeSql('INSERT INTO filme(descricao, imagem) VALUES(?, ?)', [this.state.descricao, this.state.uri])
            });
        }
        this.props.navigation.navigate('Home');
    }

    toHome() {
        //this.setState({ uri: null });
        //this.setState({ descricao: '' });
        this.props.navigation.navigate('Home');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.areaFoto}>
                    <View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Image source={{ uri: this.state.uri }} style={{ backgroundColor: 'blue', justifyContent: 'center', alignItems: 'flex-start', width: 150, height: 150, marginBottom: 40 }} />
                    </View>
                    <View style={{ width: 50, heigth: 50 }}>
                        <TouchableOpacity onPress={() => { this.abrirCamera() }}>
                            <View>
                                <Image source={require('../img/captura.png')} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.areaInput}>
                    <TextInput style={styles.inputText}
                        multiline={true} placeholder='Descrição'
                        value={this.state.descricao}
                        onChangeText={(valor) => this.setState({ descricao: valor })} />
                </View>
                <View style={styles.areaBotao}>
                    <View style={{ flex: 1 }}>
                        <LPButton titulo='Salvar' onPress={() => this.salvar()} />
                    </View>
                    <View style={{ flex: 1 }}>
                        <LPButton titulo='Cancelar'
                            onPress={() => this.toHome()} />
                    </View>
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    inputText: {
        fontSize: 15,
        borderWidth: 1,
        borderColor: 'gray'
    },
    areaBotao: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center'
    },
    areaInput: {
        width: '98%'
    },
    areaFoto: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});