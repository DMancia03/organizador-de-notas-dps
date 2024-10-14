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

export { setSesionIdUsuario, getSesionIdUsuario };