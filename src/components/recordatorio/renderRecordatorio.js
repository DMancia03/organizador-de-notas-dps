import react, { useState, useEffect } from "react";
import { View, Text, Alert, ScrollView, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const RenderRecordatorio = ({dataRec}) => {

    const fechaRec = new Date(dataRec.fechaRecordatorio);
    const year = fechaRec.getFullYear();
    const month = ('0' + (fechaRec.getMonth()+1)).slice(-2);
    const day = ('0' + fechaRec.getDate()).slice(-2);
    const fechaRecFormateada = `${year}-${month}-${day}`

    return(
        <View style={styles.container}>
            <Text style={styles.NombreRecordatorio}><Icon name='file-clock' size={30} /> {dataRec.nombre}</Text>
            <View style={styles.etiqueta}>
                <Text><Icon name='label' size={10} /> {dataRec.nombreEtiqueta}</Text>
            </View>
            <View>
            <Text style={styles.dateContainer}> Fecha: {fechaRecFormateada}</Text>
            </View>
            <Text>{dataRec.contenido}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttonEdit}><Text style={styles.buttonText}><Icon name='eye' size={20} /> Ver</Text></TouchableOpacity>
                <TouchableOpacity style={styles.buttonDelete}><Text style={styles.buttonText}><Icon name='trash-can' size={20} /> Eliminar</Text></TouchableOpacity>
            </View>
        </View>
    )
}

export default RenderRecordatorio;

const styles = StyleSheet.create({
    etiqueta:{
        alignSelf: 'flex-start',
        backgroundColor: '#AEAEAE',
        borderRadius: 10,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        borderColor: 'black',
        borderBottomWidth: 2
    },
    NombreRecordatorio: {
        fontSize: 25
    },
    buttonContainer: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row'
    },
    buttonDelete:{
        backgroundColor: '#ffa590',
        padding: 5,
        borderRadius: 7,
        margin: 10,
        minWidth: 100,
    },
    buttonEdit:{
        backgroundColor: '#3F6ED9',
        padding: 5,
        borderRadius: 7,
        margin: 10,
        minWidth: 100, 
    },
    buttonText: {
        fontSize: 20,
    },
    dateContainer: {
        marginBottom: 5,
        fontSize: 15,
        borderBottomWidth: 1,
        alignSelf: 'flex-start',
        paddingRight: 10
    }
});