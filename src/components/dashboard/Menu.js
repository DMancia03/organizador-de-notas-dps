import React, { useEffect, useState, useContext } from "react";
import { Text, View, ScrollView, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { getSesionNombreUsuario, getSesionIdUsuario, setSesionIdUsuario, setSesionNombreUsuario } from "../security/ManejarSesiones";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {adminContext} from './../../screens/Dashboard';

//Colores
const backgrouncolor = '#fff1d7';
const backgroundNotas = '#77dd77';
const backgroundRecordatorios = '#84b6f4';
const backgroundEtiquetas = '#d5e732';
const backgroundPapelera = '#fdcae1';
const backgroundCerrarSesion = '#ff6961';

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
                <Text style={styles.title}><Icon name="home-account" size={30} /> Bienvenido "{username}"</Text>
            </View>
            <TouchableOpacity style={styles.containerNotas} onPress={() => verNotas()}>
                <Text><Icon name="note" size={25} color={backgroundNotas} /> Notas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerRecordatorios} onPress={() => verRecordatorios()}>
                <Text><Icon name="calendar-blank" size={25} color={backgroundRecordatorios} /> Recordatorios</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerEtiquetas} onPress={() => VerEtiquetas()}>
                <Text><Icon name="tag" size={25} color={backgroundEtiquetas} /> Etiquetas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerPapelera} onPress={() => verPapeleraNotas()}>
                <Text><Icon name="note-remove" size={25} color={backgroundPapelera} /> Papelera de reciclaje</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.containerCerrarSesion} onPress={() => cerrarSesion()}>
                <Text><Icon name="cancel" size={25} color={backgroundCerrarSesion} /> Cerrar sesión</Text>
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
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    containerNotas: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        borderColor: backgroundNotas,
        borderWidth: 4,
    },
    titleNotas:{
        color: backgroundNotas,
        fontWeight: 'bold',
    },
    containerRecordatorios: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        borderColor: backgroundRecordatorios,
        borderWidth: 4,
    },
    containerEtiquetas: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        borderColor: backgroundEtiquetas,
        borderWidth: 4
    },
    containerPapelera: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        borderColor: backgroundPapelera,
        borderWidth: 4
    },
    containerCerrarSesion: {
        backgroundColor: 'white',
        padding: 20,
        margin: 20,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        borderColor: backgroundCerrarSesion,
        borderWidth: 4
    },
})