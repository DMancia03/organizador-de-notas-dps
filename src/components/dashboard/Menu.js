import React from "react";
import { Text, View, ScrollView, StyleSheet, Alert, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Menu = ({ navigation }) => {
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

    return (
        <View>
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