import react, { useState, useEffect } from "react";
import { View, Text, Alert, ScrollView, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from "axios";
import RenderRecordatorio from "./renderRecordatorio";
import React from "react";

const Recordatorio = ({navigation}) => {

    const idUsuario = 1;
    const [recordatorios, setRecordatorios] = useState([]);

    const getRecordatorio = async () => {
        axios.get('https://api-rest-admin-notas-dps-747620528393.us-central1.run.app/Recordatorios/usuario/' + idUsuario).then((response) => {
            setRecordatorios(response.data);
        });
    };

    const createRecordatorio = () => {
        navigation.navigate('AñadirRecordatorio');
    } 
    
    const filtrarRecordatorio = () => {
        navigation.navigate('FiltrarRecordatorio');
    }

    useEffect(() => {

        getRecordatorio();
    }, [])

    useFocusEffect(React.useCallback(()=>{getRecordatorio()}))

    return(
        <ScrollView style={styles.container}>
            <TouchableOpacity style={styles.button}>
                <Icon name='plus-circle' color={'white'} size={20} onPress={() => createRecordatorio()}> Crear Recordatorio</Icon>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Icon name='pencil-outline' color={'white'} size={20} onPress={() => filtrarRecordatorio()}> Filtrar Recordatorio</Icon>
            </TouchableOpacity>
            <View>
            { recordatorios.map((rec) => (<RenderRecordatorio dataRec={rec} key={rec.idNota} />)) }
            </View>
        </ScrollView>
    )
}

export default Recordatorio

const styles = StyleSheet.create({
    container: {
        display: 'flex'
    },
    button: {
        backgroundColor: '#3f6ed9',
        margin: 10,
        padding: 15,
        borderRadius: 15,
        alignSelf: 'center'
    }
})