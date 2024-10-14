import React, {useState} from "react";
import { Text, TouchableOpacity, View, TextInput, Alert } from "react-native";
import axios from "axios";
import { setSesionIdUsuario, getSesionIdUsuario, setSesionNombreUsuario, getSesionNombreUsuario } from "../security/ManejarSesiones";

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const iniciarSesion = async () => {
        const datos = {
            "Username": username,
            "Pass": password
        };

        const stringJSON = JSON.stringify(datos);

        await axios.post(
            'https://api-rest-admin-notas-dps-747620528393.us-central1.run.app/Usuarios/login', 
            stringJSON,
            {
                headers: { 'Content-Type': 'application/json' }
            }
        )
        .then((response) => {
            Alert.alert('Login', 'Iniciaste sesión correctamente');
            setSesionIdUsuario(response.data.idUsuario.toString());
            setSesionNombreUsuario(response.data.username);
            navigation.navigate('Menu');
        })
        .catch((error) => {
            Alert.alert('Error', 'No se pudo iniciar sesión');
            console.log(error);
        });
    }

    return (
        <View>
            <Text>Login</Text>
            <View>
                <Text>Nombre de usuario:</Text>
                <TextInput
                    value={username}
                    onChangeText={(value) => setUsername(value)}
                />
            </View>
            <View>
                <Text>Contraseña:</Text>
                <TextInput 
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                />
            </View>
            <TouchableOpacity onPress={() => iniciarSesion()}>
                <Text>Iniciar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text>Registrarse</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login;