import react, { useState, useEffect } from "react";
import { View, Text, Alert, ScrollView, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ViewRecordatorio = () => {

    const route = useRoute();
    const datos = route.params;
    const recordatorio = datos.data;

    const fechaRec = new Date(recordatorio.fechaRecordatorio);
    const year = fechaRec.getFullYear();
    const month = ('0' + (fechaRec.getMonth()+1)).slice(-2);
    const day = ('0' + fechaRec.getDate()).slice(-2);
    const fechaRecFormateada = `${year}-${month}-${day}`

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Nombre:</Text>
            <Text style={styles.text}>{recordatorio.nombre}</Text>
            <Text style={styles.title}>Fecha: </Text>
            <Text style={styles.text}>{fechaRecFormateada}</Text>
            <Text style={styles.title}>Etiqueta: </Text>
            <Text style={styles.text}>{recordatorio.nombreEtiqueta}</Text>
            <Text style={styles.title}>Contenido: </Text>
            <Text style={styles.text}>{recordatorio.contenido}</Text>
        </View>
    )
}

export default ViewRecordatorio

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        margin: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#7c7c7c',
        alignSelf: 'center',
        marginBottom: 20
    },
    container: {
        backgroundColor: '#e5cbb4',
        margin: 10,
        borderRadius: 20,
        padding: 5
    },
    title: {
        fontSize: 25,
        alignSelf: 'center'
    }
})