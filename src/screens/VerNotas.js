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
                    initialParams={{ "nuevo" : false }}
                    component={Notas}
                    options={{
                        title: 'Notas'
                    }}
                />
                <Stack.Screen 
                    name="CrearNota"
                    initialParams={{ "accion" : 'crear' }} 
                    component={GuardarNota}
                    options={{
                        title: 'Crear nota'
                    }}
                />
                <Stack.Screen 
                    name="EditarNota"
                    initialParams={{ "accion" : 'editar', 'id': 0 }} 
                    component={GuardarNota}
                    options={{
                        title: 'Editar nota'
                    }}
                />
            </Stack.Navigator>
        </>
    );
}

export default VerNotas;

