import React, { useState } from "react";
import { View, Text, Alert, ScrollView, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import Nota from "./Etiqueta";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const backgroundCrear = '#7aac6c';

const Etiquetas = ({ navigation }) => {
    const idUsuario = 1;
    const [etiquetas, setEtiquetas] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

    const crearEtiqueta = () => {
        navigation.navigate('GuardarEtiqueta');
    };

    // Recarga la lista cada vez que la pantalla gana el foco
    useFocusEffect(
        React.useCallback(() => {
            const getEtiquetas = async () => {
                axios.get(`https://api-rest-admin-notas-dps-747620528393.us-central1.run.app/Etiquetas/id_usuario/${idUsuario}`)
                    .then((response) => {
                        setEtiquetas(response.data);
                    })
                    .catch((error) => {
                        console.error("Error al obtener etiquetas: ", error);
                        Alert.alert("Error", "No se pudieron cargar las etiquetas.");
                    });
            };
            getEtiquetas();
        }, [])
    );

    // Filtrar etiquetas basado en el término de búsqueda
    const filteredEtiquetas = etiquetas.filter(etiqueta => 
        etiqueta.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <ScrollView style={styles.main}>
            <View style={styles.searchArea}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar etiqueta..."
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
            </View>
            <View style={styles.opcionesArea}>
                <TouchableOpacity style={styles.opcionCrear} onPress={crearEtiqueta}>
                    <Text style={styles.botonTexto}><Icon name='plus-circle' size={20} /> Crear Etiqueta</Text>
                </TouchableOpacity>
            </View>
            { filteredEtiquetas.map((etiqueta) => (
                <Nota etiqueta={etiqueta} key={etiqueta.idEtiqueta} />
            )) }
        </ScrollView>
    );
}

export default Etiquetas;

const styles = StyleSheet.create({
    main: {
        display: 'flex',
    },
    searchArea: {
        padding: 20,
    },
    searchInput: {
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
    opcionesArea: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 20,
        padding: 20,
        width: '100%',
    },
    opcionCrear: {
        backgroundColor: backgroundCrear,
        padding: 15,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
    },
    botonTexto: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
