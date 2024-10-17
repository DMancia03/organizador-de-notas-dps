import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Alert, TextInput } from "react-native";
import axios from "axios";
import { setSesionIdUsuario, getSesionIdUsuario, setSesionNombreUsuario, getSesionNombreUsuario } from "../security/ManejarSesiones";
import { Formik } from "formik";
import * as Yup from "yup";

//Variables de colores
const backgrouncolor = '#fff1d7';

//Validaciones formik
const esquema = Yup.object({
    username: Yup.string().required('El nombre de usuario es requerido'),
    password: Yup.string().required('La contraseña es requerida')
})

const Signup = ({ sesionIniciada, setSesionIniciada, registrandose, setRegistrandose }) => {
    //Variables default formik
    const [valoresIni, setValoresIniciales] = useState({username: '', password: ''});

    const registrarUsuario = async (values) => {
        const datos = {
            "Username": values.username,
            "Pass": values.password
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
            Alert.alert('Login', 'Te registraste correctamente');
            setSesionIdUsuario(response.data.idUsuario.toString());
            setSesionNombreUsuario(response.data.username);
            setSesionIniciada(true);
        })
        .catch((error) => {
            Alert.alert('Error', 'No se pudo registrar tu usuario');
            console.log(error);
        });
    }

    return (
        <Formik
            initialValues={valoresIni}
            validationSchema={esquema}
            onSubmit={(values) => {registrarUsuario(values)}}
        >
            {({handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue}) => (
                <View style={styles.main}>
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Text style={styles.title}>REGISTRARSE</Text>
                        </View>
                        <View>
                            <Text style={styles.label}>Nombre de usuario:</Text>
                            <TextInput
                                style={styles.textbox}
                                value={values.username}
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                            />
                            {touched.username && errors.username && <Text style={styles.error}>{errors.username}</Text>}
                        </View>
                        <View>
                            <Text style={styles.label}>Contraseña:</Text>
                            <TextInput 
                                style={styles.textbox}
                                value={values.password}
                                secureTextEntry={true}
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                            />
                            {touched.password && errors.password && <Text style={styles.error}>{errors.password}</Text>}
                        </View>
                        <View style={styles.buttonGroup}>
                            <TouchableOpacity style={styles.buttomLogin} onPress={handleSubmit}>
                                <Text>Registrarse</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttomRegistrarse} onPress={() => setRegistrandose(false)}>
                                <Text>Ya tienes una cuenta...</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </Formik>
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
    error: {
        color: '#ee5d3e',
        fontSize: 15
    },
})