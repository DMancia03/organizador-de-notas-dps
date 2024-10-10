import react, { useState, useEffect } from "react";
import { View, Text, Alert, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import axios from "axios";
import Nota from "./Nota";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const backgroundCrear = '#7aac6c';

const Notas = () => {
    const idUsuario = 1;
    const [notas, setNotas] = useState([]);

    useEffect(() => {
        const getNotas = async () => {
            axios.get('https://api-rest-admin-notas-dps-747620528393.us-central1.run.app/Notas/usuario/' + idUsuario).then((response) => {
                Alert.alert('Notas', JSON.stringify(response.data));
                setNotas(response.data);
            });
        };

        getNotas();
    }, [])
    

    return (
        <ScrollView style={styles.main}>
            <View style={styles.header}>
                <Text style={styles.headerText}>NOTAS</Text>
            </View>
            <View style={styles.opcionesArea}>
                <TouchableOpacity style={styles.opcionCrear}>
                    <Text><Icon name='plus-circle' size={20} /> Crear nota</Text>
                </TouchableOpacity>
            </View>
            { notas.map((nota) => (<Nota nota={nota} key={nota.idNota} />)) }
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
        gap:20
    },
    opcionCrear:{
        backgroundColor: backgroundCrear,
        padding: 10,
        borderRadius: 10,
    },
});