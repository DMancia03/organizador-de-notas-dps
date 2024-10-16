import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

const Signup = ({ sesionIniciada, setSesionIniciada, registrandose, setRegistrandose }) => {
    return (
        <View>
            <Text>Signup</Text>
            <TouchableOpacity onPress={() => setRegistrandose(false)}>
                <Text>Iniciar sesión</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Signup;