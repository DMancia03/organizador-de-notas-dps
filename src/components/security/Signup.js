import React from "react";
import { Text, View, TouchableOpacity } from "react-native";

const Signup = ({ navigation }) => {
    return (
        <View>
            <Text>Signup</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text>Iniciar sesión</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Signup;