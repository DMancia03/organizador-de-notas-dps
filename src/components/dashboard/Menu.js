import React, { useEffect, useState } from "react";
import { Text, View, ScrollView, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { getSesionNombreUsuario, getSesionIdUsuario } from "../security/ManejarSesiones";

const Menu = ({ navigation }) => {
    //Variables
    const [username, setUsername] = useState('');

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

    //Asincronico
    useEffect(() => {
        const obtenerNombreUsuario = async () => {
            setUsername(await getSesionNombreUsuario());
        }

        obtenerNombreUsuario();
    }, []);

    return (
        <View>
            <View>
                <Text>Bienvenido {username}</Text>
            </View>
            <TouchableOpacity onPress={() => verNotas()}>
                <Text>Notas</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => verRecordatorios()}>
                <Text>Recordatorios</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => VerEtiquetas()}>
                <Text>Etiquetas</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => verPapeleraNotas()}>
                <Text>Papelera de reciclaje</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Menu;