import react, { useState, useEffect } from "react";
import { View, Text, Alert, ScrollView, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import axios from "axios";
import Nota from "./Nota";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Colores
const backgroundCrear = '#7aac6c';

const Notas = ({ navigation, route }) => {
    //Variables
    const [idUsuario, setIdUsuario] = useState(1);
    const [notas, setNotas] = useState([]);
    const [recargar, setRecargar] = useState(false);
    const [filtro, setFiltro] = useState('');

    //Redirigir a pantalla para crear nota
    const crearNota = () => {
        navigation.navigate('CrearNota', { "accion" : 'crear' });
    }

    //Redirigir a pantalla para editar nota
    const editarNota = (id) => {
        navigation.navigate('EditarNota', { "accion" : 'editar', 'id': id });
    }

    //Mover nota a papelera de reciclaje
    const eliminarNota = (id) => {
        axios.put(
            'https://api-rest-admin-notas-dps-747620528393.us-central1.run.app/Notas/papelera/' + id
        )
        .then((response) => {
            Alert.alert('Nota eliminada', 'Se ha movido la nota a la papelera de reciclaje');
            setRecargar(!recargar);
        })
        .catch((error) => {
            Alert.alert('Error', error);
        });
    };

    //Acciones asincronicas
    useEffect(() => {
        const getNotas = async () => {
            if(filtro == ''){
                axios.get('https://api-rest-admin-notas-dps-747620528393.us-central1.run.app/Notas/usuario/' + idUsuario)
                .then((response) => {
                    setNotas(response.data);
                })
                .catch((error) => {
                    Alert.alert('Error', error);
                });
            }else{
                axios.get('https://api-rest-admin-notas-dps-747620528393.us-central1.run.app/Notas/usuario/' + idUsuario + '/nombre_etiqueta/' + filtro)
                .then((response) => {
                    setNotas(response.data);
                })
                .catch((error) => {
                    Alert.alert('Error', error);
                });
            }
        };

        getNotas();
    }, [route.params.ultimaAccion, recargar]);
    
    return (
        <ScrollView style={styles.main}>
            <View style={styles.opcionesArea}>
                <TouchableOpacity style={styles.opcionCrear} onPress={() => crearNota()}>
                    <Text><Icon name='plus-circle' size={20} /> Crear nota</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.opcionesArea}>
                <TextInput
                    style={styles.textbox}
                    placeholder="Filtrar notas por etiqueta..."
                    value={filtro}
                    onChangeText={(value) => setFiltro(value)}
                />
                <TouchableOpacity style={styles.opcionCrear} onPress={() => setRecargar(!recargar)}>
                    <Text><Icon name='plus-circle' size={20} /> Buscar nota</Text>
                </TouchableOpacity>
            </View>
            { notas.map((nota) => (<Nota nota={nota} editarNota={editarNota} eliminarNota={eliminarNota} key={nota.idNota} />)) }
        </ScrollView>
    );
}

export default Notas;

const styles = StyleSheet.create({
    main: {
        display: 'flex',
    },
    header: {
        display: 'flex'
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#56413E'
    },
    opcionesArea:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap:20,
        padding: 20
    },
    opcionCrear:{
        backgroundColor: backgroundCrear,
        padding: 10,
        borderRadius: 10,
    },
    textbox: {
        fontSize: 20,
        borderBlockColor: '#56413E',
        borderBottomWidth: 1,
    },
});