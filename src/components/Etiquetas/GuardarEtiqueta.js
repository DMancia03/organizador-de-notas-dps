import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import axios from "axios";

const GuardarEtiqueta = ({ navigation, route }) => {
    const { etiqueta } = route.params || {}; // Obtén la etiqueta a editar
    const isEdit = !!etiqueta; // Verifica si estamos en modo de edición

    const [nombreEtiqueta, setNombreEtiqueta] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Estado para controlar el botón

    // Carga el nombre de la etiqueta si está en modo de edición
    useEffect(() => {
        if (isEdit) {
            setNombreEtiqueta(etiqueta.nombre);
        }
    }, [isEdit, etiqueta]);

    const guardarEtiqueta = () => {
        if (nombreEtiqueta.trim() === "") {
            Alert.alert("Error", "El nombre de la etiqueta no puede estar vacío.");
            return;
        }

        setIsButtonDisabled(true); // Deshabilita el botón

        const url = isEdit 
            ? `https://api-rest-admin-notas-dps-747620528393.us-central1.run.app/Etiquetas/${etiqueta.idEtiqueta}`
            : 'https://api-rest-admin-notas-dps-747620528393.us-central1.run.app/Etiquetas/';

        const method = isEdit ? 'put' : 'post';

        axios[method](url, {
            nombre: nombreEtiqueta,
            idUsuario: 1 // Suponiendo que el id del usuario es 1
        })
        .then(() => {
            Alert.alert("Éxito", isEdit ? "Etiqueta actualizada correctamente." : "Etiqueta guardada correctamente.");
            navigation.goBack();
        })
        .catch((error) => {
            Alert.alert("Error", "Hubo un problema al guardar la etiqueta.");
            console.error(error);
        })
        .finally(() => {
            setIsButtonDisabled(false); // Habilita el botón después de la operación
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isEdit ? "Editar Etiqueta" : "Guardar Etiqueta"}</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre de la Etiqueta"
                value={nombreEtiqueta}
                onChangeText={setNombreEtiqueta}
            />
            <TouchableOpacity 
                style={styles.botonGuardar} 
                onPress={guardarEtiqueta} 
                disabled={isButtonDisabled}
            >
                <Text style={styles.botonTexto}>{isEdit ? "Actualizar" : "Guardar"}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default GuardarEtiqueta;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    botonGuardar: {
        backgroundColor: '#7aac6c',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    botonTexto: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
