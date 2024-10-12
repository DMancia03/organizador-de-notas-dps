import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from "react-native";
import axios from "axios";

const GuardarEtiqueta = ({ navigation }) => {
    const [nombreEtiqueta, setNombreEtiqueta] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); // Estado para controlar el botón

    const guardarEtiqueta = () => {
        if (nombreEtiqueta.trim() === "") {
            Alert.alert("Error", "El nombre de la etiqueta no puede estar vacío.");
            return;
        }

        setIsButtonDisabled(true); // Deshabilita el botón

        axios.post('https://api-rest-admin-notas-dps-747620528393.us-central1.run.app/Etiquetas/', {
            nombre: nombreEtiqueta,
            idUsuario: 1 // Suponiendo que el id del usuario es 1
        })
        .then(() => {
            Alert.alert("Éxito", "Etiqueta guardada correctamente.");
            navigation.goBack();
        })
        .catch((error) => {
            Alert.alert("Error", "Hubo un problema al guardar la etiqueta.");
            console.error(error);
        })
        .finally(() => {
            setTimeout(() => {
                setIsButtonDisabled(false); // Habilita el botón después de 3 segundos
            }, 3000);
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Guardar Etiqueta</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre de la Etiqueta"
                value={nombreEtiqueta}
                onChangeText={setNombreEtiqueta}
            />
            <TouchableOpacity 
                style={styles.botonGuardar} 
                onPress={guardarEtiqueta} 
                disabled={isButtonDisabled} // Deshabilita el botón si isButtonDisabled es true
            >
                <Text style={styles.botonTexto}>Guardar</Text>
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
