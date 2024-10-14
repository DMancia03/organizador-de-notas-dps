import react, { useState, useEffect } from "react";
import { View, Text, Alert, ScrollView, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import axios from "axios";
import PapeleraNota from "./PapeleraNota";
import { getSesionIdUsuario } from "../security/ManejarSesiones";

//Colores
const backgroundCrear = '#7aac6c';
const backgroundFiltrar = '#e5cbb4';
const backgroundEliminar = '#ffa590';

const Notas = ({ navigation, route }) => {
    //Variables
    const [idUsuario, setIdUsuario] = useState(0);
    const [notas, setNotas] = useState([]);
    const [recargar, setRecargar] = useState(false);

    //Redirigir a pantalla para editar nota
    const restaurarNota = (id) => {
        axios.put(
            'https://api-rest-admin-notas-dps-747620528393.us-central1.run.app/Notas/papelera/restaurar/' + id
        )
        .then((response) => {
            Alert.alert('Nota restaurada', 'Se ha restaurado la nota');
            setRecargar(!recargar);
        })
        .catch((error) => {
            Alert.alert('Error', error);
        });
    }

    //Mover nota a papelera de reciclaje
    const eliminarNota = (id) => {
        axios.delete(
            'https://api-rest-admin-notas-dps-747620528393.us-central1.run.app/Notas/' + id
        )
        .then((response) => {
            Alert.alert('Nota eliminada', 'Se ha eliminado definitivamente la nota');
            setRecargar(!recargar);
        })
        .catch((error) => {
            Alert.alert('Error', error);
        });
    };

    //Acciones asincronicas
    useEffect(() => {
        const getNotas = async () => {
            const user = await getSesionIdUsuario();

            axios.get('https://api-rest-admin-notas-dps-747620528393.us-central1.run.app/Notas/usuario/' + user + '/papelera')
            .then((response) => {
                setNotas(response.data);
            })
            .catch((error) => {
                Alert.alert('Error', error);
            });
        };

        const setAsyncIdUser = async () => {
            setIdUsuario(await getSesionIdUsuario());
        }

        setAsyncIdUser();
        getNotas();
    }, [recargar]);
    
    return (
        <ScrollView style={styles.main}>
            {
                notas.length == 0 ? 
                    <View style={styles.areaVacia}>
                        <Text>No hay notas en la papelera...</Text>
                    </View>
                :
                    notas.map((nota) => (<PapeleraNota nota={nota} restaurarNota={restaurarNota} eliminarNota={eliminarNota} key={nota.idNota} />))
            }
        </ScrollView>
    );
}

export default Notas;

const styles = StyleSheet.create({
    main: {
        display: 'flex',
    },
    areaVacia: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        gap: 20
    },
    opcionesArea:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap:20,
        padding: 20
    },
    opcionCrear:{
        backgroundColor: backgroundCrear,
        padding: 10,
        borderRadius: 10,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    opcionFiltrar:{
        backgroundColor: backgroundFiltrar,
        padding: 10,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    opcionCancelarFiltrar:{
        backgroundColor: backgroundEliminar,
        padding: 10,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    textbox: {
        borderBlockColor: '#56413E',
        borderBottomWidth: 1,
    },
});