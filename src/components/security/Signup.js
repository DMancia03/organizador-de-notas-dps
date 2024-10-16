import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Alert, TextInput } from "react-native";
import axios from "axios";
import { setSesionIdUsuario, getSesionIdUsuario, setSesionNombreUsuario, getSesionNombreUsuario } from "../security/ManejarSesiones";

const backgrouncolor = '#fff1d7';

const Signup = ({ sesionIniciada, setSesionIniciada, registrandose, setRegistrandose }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const iniciarSesion = async () => {
        const datos = {
            "Username": username,
            "Pass": password
        };

        const stringJSON = JSON.stringify(datos);

        await axios.post(
            'https://api-rest-admin-notas-dps-747620528393.us-central1.run.app/Usuarios/signup', 
            stringJSON,
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )
        .then((response) => {
            Alert.alert('Login', 'Iniciaste sesión correctamente');
            setSesionIdUsuario(response.data.idUsuario.toString());
            setSesionNombreUsuario(response.data.username);
            setSesionIniciada(true);
        })
        .catch((error) => {
            Alert.alert('Error', 'No se pudo iniciar sesión');
            console.log(error);
        });
    }

    return (
        <View style={styles.main}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>REGISTRARSE</Text>
                </View>
                <View>
                    <Text style={styles.label}>Nombre de usuario:</Text>
                    <TextInput
                        style={styles.textbox}
                        value={username}
                        onChangeText={(value) => setUsername(value)}
                    />
                </View>
                <View>
                    <Text style={styles.label}>Contraseña:</Text>
                    <TextInput 
                        style={styles.textbox}
                        value={password}
                        secureTextEntry={true}
                        onChangeText={(value) => setPassword(value)}
                    />
                </View>
                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={styles.buttomLogin} onPress={() => iniciarSesion()}>
                        <Text>Registrarse</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttomRegistrarse} onPress={() => setRegistrandose(false)}>
                        <Text>Ya tienes una cuenta...</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Signup;

const styles = StyleSheet.create({
    main:{
        backgroundColor: backgrouncolor,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
    },
    container: {
        backgroundColor: 'white',
        margin: 40,
        padding: 40,
        borderRadius: 10,
        display: 'flex',
        gap: 20,
    },
    header:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        fontSize: 20,
        color: '#56413E',
        fontWeight: 'bold'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        padding:20
    },
    label:{
        fontSize: 15
    },
    textbox: {
        fontSize: 15,
        borderBlockColor: '#56413E',
        borderBottomWidth: 1,
    },
    buttonGroup:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20
    },
    buttomLogin:{
        backgroundColor: '#68b6ef',
        padding: 10,
        borderRadius: 10,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttomRegistrarse:{
        backgroundColor: '#ffa590',
        padding: 10,
        borderRadius: 10,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
})