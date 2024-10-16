import React from "react";
import { Text, View, ScrollView, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
//Stacks
import VerNotas from "./VerNotas";
import VerEtiquetas from "./VerEtiquetas";
import recordatorioScreen from './recordatorioScreen'
//Notas
import Notas from "../components/notas/Notas";
import GuardarNota from "../components/notas/GuardarNota";
//Recordatorios
import Recordatorio from "../components/recordatorio/recordatorio";
import CrearRecordatorio from "../components/recordatorio/crearRecordatorio";
import FiltrarRecordatorio from "../components/recordatorio/fitrarRecordatorio";
import ViewRecordatorio from "../components/recordatorio/viewRecordatorio";
//Etiquetas
import Etiquetas from "../components/Etiquetas/Etiquetas";
import GuardarEtiqueta from "../components/Etiquetas/GuardarEtiqueta";
//Papelera de reciclaje
import PapeleraNotas from "../components/papelera/PapeleraNotas";
//Dashboard
import Menu from "../components/dashboard/Menu";
//Seguridad
import Login from "../components/security/Login";
import Signup from "../components/security/Signup";
import { getSesionNombreUsuario, getSesionIdUsuario } from './../components/security/ManejarSesiones';

const Stack = createStackNavigator();

const Dashboard = () => {
    return (
        <Stack.Navigator>
            {/* SEGURIDAD */}
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    title: 'Iniciar sesión'
                }}
            />
            <Stack.Screen
                name="Signup"
                component={Signup}
                options={{
                    title: 'Registrarse'
                }}
            />
            {/* DASHBOARD */}
            <Stack.Screen 
                name="Menu"
                component={Menu}
                options={{
                    title: 'Organizador de notas'
                }}
            />
            {/* NOTAS */}
            <Stack.Screen 
                name="Notas" 
                initialParams={{ "ultimaAccion" : 'inicio' }}
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
            {/* RECORDATORIOS */}
            <Stack.Screen 
                name="Recordatorio" 
                component={Recordatorio}
                options={{
                    title: 'Recordatorio'
                }}
            />
            <Stack.Screen 
                name="AñadirRecordatorio" 
                component={CrearRecordatorio}
                options={{
                    title: 'Añadir Recordatorio'
                }}
            />
            <Stack.Screen 
                name="FiltrarRecordatorio" 
                component={FiltrarRecordatorio}
                options={{
                    title: 'Filtrar Recordatorio'
                }}
            />
            <Stack.Screen 
                name="ViewRecordatorio" 
                component={ViewRecordatorio}
                options={{
                    title: 'Recordatorio'
                }}
            />
            {/* ETIQUETAS */}
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
            {/* PAPELERA NOTAS */}
            <Stack.Screen 
                name="PapeleraNotas"
                component={PapeleraNotas}
                options={{
                    title: 'Papelera de reciclaje (Notas)'
                }}
            />
        </Stack.Navigator>
    )
}

export default Dashboard;