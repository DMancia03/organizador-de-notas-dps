import react, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Recordatorio from "../components/recordatorio/recordatorio";
import CrearRecordatorio from "../components/recordatorio/crearRecordatorio";
import FiltrarRecordatorio from "../components/recordatorio/fitrarRecordatorio";
import ViewRecordatorio from "../components/recordatorio/viewRecordatorio";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const RecordatorioScreen = () => {
    return (
        
            <Stack.Navigator>
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
            </Stack.Navigator>
       
    );
}

export default RecordatorioScreen;