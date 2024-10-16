import React, { useEffect, useState, useContext } from "react";
import { Text, View, ScrollView, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { getSesionNombreUsuario, getSesionIdUsuario, setSesionIdUsuario, setSesionNombreUsuario } from "../security/ManejarSesiones";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {adminContext} from './../../screens/Dashboard';

const backgrouncolor = '#fff1d7';

const Menu = ({ navigation }) => {
    //Variables
    const [username, setUsername] = useState('');

    const { setSesionIniciada, sesionIniciada } = useContext(adminContext);

    //Navegar entre pantallas
    const verNotas = () => {
        navigation.navigate('Notas', { "ultimaAccion" : 'inicio' });
    };

    const verRecordatorios = () => {
        navigation.navigate('Recordatorio');
    }

    const VerEtiquetas = () => {
        navigation.navigate('Etiquetas');
    }

    const verPapeleraNotas = () => {
        navigation.navigate('PapeleraNotas');
    }

    const cerrarSesion = async () => {
        await setSesionIdUsuario('');
        await setSesionNombreUsuario('');
        await setSesionIniciada(false);
    }

    //Asincronico
    useEffect(() => {
        const obtenerNombreUsuario = async () => {
            setUsername(await getSesionNombreUsuario());
        }

        obtenerNombreUsuario();
    }, []);

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <Text><Icon name="home-account" size={25} /> Bienvenido "{username}"</Text>
            </View>
            <TouchableOpacity style={styles.containerNotas} onPress={() => verNotas()}>
                <Text><Icon name="note" size={25} /> Notas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerRecordatorios} onPress={() => verRecordatorios()}>
                <Text><Icon name="calendar-blank" size={25} /> Recordatorios</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerEtiquetas} onPress={() => VerEtiquetas()}>
                <Text><Icon name="tag" size={25} /> Etiquetas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerPapelera} onPress={() => verPapeleraNotas()}>
                <Text><Icon name="note-remove" size={25} /> Papelera de reciclaje</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerCerrarSesion} onPress={() => cerrarSesion()}>
                <Text><Icon name="cancel" size={25} /> Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Menu;

const styles = StyleSheet.create({
    main:{
        height: '100%',
        display: 'flex',
    },
    container: {
        backgroundColor: '#e5cbb4',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    containerNotas: {
        backgroundColor: '#68b6ef',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    containerRecordatorios: {
        backgroundColor: '#77dd77',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    containerEtiquetas: {
        backgroundColor: '#feff3a',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    containerPapelera: {
        backgroundColor: '#ffa590',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
    containerCerrarSesion: {
        backgroundColor: '#ee5d3e',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
    },
})