import react, { useState, useEffect } from "react";
import { View, Text, Alert, ScrollView, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import axios from "axios";
import Nota from "./Nota";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Colores
const backgroundCrear = '#7aac6c';

const Notas = ({ navigation, route }) => {
    const [idUsuario, setIdUsuario] = useState(1);
    const [notas, setNotas] = useState([]);

    const crearNota = () => {
        navigation.navigate('CrearNota', { "accion" : 'crear' });
    }

    const editarNota = (id) => {
        navigation.navigate('EditarNota', { "accion" : 'editar', 'id': id });
    }

    const eliminarNota = (id) => {
        Alert.alert('Eliminar nota', 'Eliminar nota ' + id);
    };

    useEffect(() => {
        const getNotas = async () => {
            axios.get('https://api-rest-admin-notas-dps-747620528393.us-central1.run.app/Notas/usuario/' + idUsuario)
            .then((response) => {
                setNotas(response.data);
            });
        };

        getNotas();
    }, [route.params.ultimaAccion]);
    
    return (
        <ScrollView style={styles.main}>
            <View style={styles.opcionesArea}>
                <TouchableOpacity style={styles.opcionCrear} onPress={() => crearNota()}>
                    <Text><Icon name='plus-circle' size={20} /> Crear nota</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.opcionesArea}>
                <TextInput value='a' />
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
});