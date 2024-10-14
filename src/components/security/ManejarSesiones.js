import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

//Establecer id usuario
const setSesionIdUsuario = async (id) => {
    await AsyncStorage.setItem('sessionIdUsuario', id);
}

//Obtener id usuario
const getSesionIdUsuario = async () => {
    return await AsyncStorage.getItem('sessionIdUsuario');
}

//Establecer id usuario
const setSesionNombreUsuario = async (nombre) => {
    await AsyncStorage.setItem('sessionNombreUsuario', nombre);
}

//Obtener id usuario
const getSesionNombreUsuario = async () => {
    return await AsyncStorage.getItem('sessionNombreUsuario');
}

export { setSesionIdUsuario, getSesionIdUsuario, setSesionNombreUsuario, getSesionNombreUsuario };