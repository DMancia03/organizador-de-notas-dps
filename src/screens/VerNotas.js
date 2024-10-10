import react, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Notas from "../components/notas/Notas";
import GuardarNota from "../components/notas/GuardarNota";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const VerNotas = () => {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen 
                    name="Notas" 
                    component={Notas}
                    options={{
                        title: 'Notas'
                    }}
                />
                <Stack.Screen 
                    name="GuardarNota" 
                    component={GuardarNota}
                    options={{
                        title: 'Guardar nota'
                    }}
                />
            </Stack.Navigator>
        </>
    );
}

export default VerNotas;

