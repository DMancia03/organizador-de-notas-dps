import react, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Notas from "../components/Etiquetas/Etiquetas";
import GuardarEtiqueta from "../components/Etiquetas/GuardarEtiqueta";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Etiquetas from "../components/Etiquetas/Etiquetas";

const Stack = createStackNavigator();

const VerEtiquetas = () => {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen 
                    name="Etiquetas" 
                    component={Etiquetas}
                    options={{
                        title: 'Etiquetas'
                    }}
                />
                <Stack.Screen 
                    name="GuardarEtiqueta" 
                    component={GuardarEtiqueta}
                    options={{
                        title: 'Guardar etiqueta'
                    }}
                />
            </Stack.Navigator>
        </>
    );
}

export default VerEtiquetas;

