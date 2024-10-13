import react from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const backgroundEtiqueta = '#AEAEAE';
const textEtiqueta = 'white';
const textEditar = '#68b6ef';
const textEliminar = '#ffa590';

const Nota = ({ nota, editarNota, eliminarNota }) => {
    return (
        <View style={styles.nota}>
            <Text style={styles.notaTitle}><Icon name='note' size={20} /> {nota.nombre}</Text>
            <View style={styles.etiqueta}>
                <Text style={styles.etiquetaNombre}><Icon name='tag' color={textEtiqueta} size={10} /> {nota.nombreEtiqueta}</Text>
            </View>
            <Text>{nota.contenido}</Text>
            <View style={styles.opcionesArea}>
                <TouchableOpacity style={styles.opcionEditar} onPress={() => editarNota(nota.idNota)}>
                    <Text><Icon name='pencil-circle' size={15} /> Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.opcionEliminar} onPress={() => eliminarNota(nota.idNota)}>
                    <Text><Icon name='delete-circle' size={15} /> Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Nota;

const styles = StyleSheet.create({
    nota: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        gap: 10,
        borderBlockColor: '#56413E',
        borderBottomWidth: 1
    },
    notaTitle: {
        fontSize: 20,
        color: '#56413E'
    },
    etiquetaNombre: {
        backgroundColor: backgroundEtiqueta,
        color: textEtiqueta,
        borderRadius: 10,
        padding: 5,
        fontSize: 10,
    },
    etiqueta:{
        display: 'flex',
        flexDirection: 'row'
    },
    opcionesArea:{
        display: 'flex',
        flexDirection: 'row',
        gap:20
    },
    opcionEditar:{
        backgroundColor: textEditar,
        padding: 10,
        borderRadius: 10,
    },
    opcionEliminar:{
        backgroundColor: textEliminar,
        padding: 10,
        borderRadius: 10,
    }
});