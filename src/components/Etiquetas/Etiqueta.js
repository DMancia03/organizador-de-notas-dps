import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from "axios";

const backgroundEtiqueta = '#AEAEAE';
const textEtiqueta = 'white';
const textEditar = '#3F6ED9';
const textEliminar = '#ffa590';

const Etiqueta = ({ etiqueta, onDelete, onEdit }) => {
    const eliminarEtiqueta = async (id) => {
        // Verifica si hay notas o recordatorios asociados a la etiqueta
        try {
            const notasResponse = await axios.get(`https://api-rest-admin-notas-dps-747620528393.us-central1.run.app/Notas/usuario/1/id_etiqueta/${id}`);
            const recordatoriosResponse = await axios.get(`https://api-rest-admin-notas-dps-747620528393.us-central1.run.app/Recordatorios/usuario/1/id_etiqueta/${id}`);

            if (notasResponse.data.length > 0 || recordatoriosResponse.data.length > 0) {
                Alert.alert("Error", "No se puede eliminar la etiqueta porque tiene notas o recordatorios asociados.");
                return; // Detiene la función si hay notas o recordatorios
            }
        } catch (error) {
            console.error("Error al verificar notas o recordatorios: ", error);
            Alert.alert("Error", "No se pudo verificar las notas o recordatorios.");
            return; // Detiene la función si hay un error en la verificación
        }

        // Si no hay notas o recordatorios, procede a eliminar la etiqueta
        Alert.alert(
            "Eliminar Etiqueta",
            "¿Estás seguro de que deseas eliminar esta etiqueta?",
            [
                { text: "Cancelar", style: "cancel" },
                { 
                    text: "Eliminar", 
                    onPress: () => {
                        axios.delete(`https://api-rest-admin-notas-dps-747620528393.us-central1.run.app/Etiquetas/${id}`)
                            .then(() => {
                                Alert.alert("Etiqueta eliminada", `La etiqueta  ha sido eliminada.`);
                                onDelete(id); // Llama a la función onDelete para actualizar la lista
                            })
                            .catch((error) => {
                                console.error("Error eliminando etiqueta: ", error);
                                Alert.alert("Error", "No se pudo eliminar la etiqueta.");
                            });
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.nota}>
            <Text style={styles.notaTitle}><Icon name='label' size={20} /> {etiqueta.nombre}</Text>
            <View style={styles.opcionesArea}>
                <TouchableOpacity style={styles.opcionEditar} onPress={() => onEdit(etiqueta)}>
                    <Text><Icon name='pencil-circle' size={15} /> Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.opcionEliminar} onPress={() => eliminarEtiqueta(etiqueta.idEtiqueta)}>
                    <Text><Icon name='delete-circle' size={15} /> Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default Etiqueta;

const styles = StyleSheet.create({
    nota: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        gap: 10,
        borderBottomColor: '#56413E',
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
