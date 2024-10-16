import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, View } from 'react-native';
import react, { useState, useEffect } from 'react';
import VerEtiquetas from './src/screens/VerEtiquetas';
import { NavigationContainer } from '@react-navigation/native';
import Dashboard from './src/screens/Dashboard';
import Login from './src/components/security/Login';
import Signup from './src/components/security/Signup';
import { getSesionIdUsuario, getSesionNombreUsuario } from './src/components/security/ManejarSesiones';
import axios from 'axios';

export default function App() {
  const [sesionIniciada, setSesionIniciada] = useState(false);
  const [registrandose, setRegistrandose] = useState(false);

  useEffect(() => {
    //Funcion para saber si la sesion esta iniciada
    const verificarSesion = async () => {
      //Verificamos si hay un usuario logueado en el asyncStorage
      const idUsuario = await getSesionIdUsuario();
      if(idUsuario){
        if(idUsuario.length > 0 && idUsuario != ''){
          setSesionIniciada(true);
        }
      }
    }

    verificarSesion();
  })

  return (
    <NavigationContainer>
      {
        sesionIniciada ? 
            <Dashboard sesionIniciada={sesionIniciada} setSesionIniciada={setSesionIniciada} />
          :
            registrandose ? <Signup sesionIniciada={sesionIniciada} setSesionIniciada={setSesionIniciada} registrandose={registrandose} setRegistrandose={setRegistrandose} /> : 
              <Login sesionIniciada={sesionIniciada} setSesionIniciada={setSesionIniciada} registrandose={registrandose} setRegistrandose={setRegistrandose} />
      }

      <StatusBar style="auto" backgroundColor='white' />
    </NavigationContainer>
  );
}