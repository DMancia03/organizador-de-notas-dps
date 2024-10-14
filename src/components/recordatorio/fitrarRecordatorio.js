import react, { useState, useEffect } from "react";
import { View, Text, Alert, ScrollView, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import {Picker} from '@react-native-picker/picker'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from "axios";
import RenderRecordatorio from "./renderRecordatorio";
import { getSesionIdUsuario } from './../security/ManejarSesiones';

const FiltrarRecordatorio = ({navigation}) => {

    const [recordatorios, setRecordatorios] = useState([]);
    const [mode, setMode] = useState('nombre');
    const [inputText, setInputText] = useState('');
    const [busqueda, setBusqueda] = useState(false);
    const [consultando, setConsultando] = useState(false);
    const [idUsuario, setIdUsuario] = useState(0);

    const verRecordatorio = (data) => {
        navigation.navigate('ViewRecordatorio', {data});
    }


    async function filtrar(){
        const user = await getSesionIdUsuario();

        setIdUsuario(user);

        if(inputText != ''){
            if(mode === 'nombre'){

                setBusqueda(true)
                setConsultando(true)
                axios.get('https://api-rest-admin-notas-dps-747620528393.us-central1.run.app/Recordatorios/usuario/' + user + '/nombre_etiqueta/' + inputText).then((response) => {
                    setRecordatorios(response.data);
                    setConsultando(false)
                });
                
    
            }else if(mode === 'id'){
    
                setBusqueda(true)
                setConsultando(true)
                axios.get('https://api-rest-admin-notas-dps-747620528393.us-central1.run.app/Recordatorios/usuario/' + user + '/id_etiqueta/' + inputText).then((response) => {
                    setRecordatorios(response.data);
                    setConsultando(false)
                });
                
    
            }else{
                alert('Hubo un error con la seleccion de filtro. Por favor seleccione de nuevo')
                setBusqueda(false)
            }
        }else{
            alert('Escriba algo para poder buscar')
        }
    }

    const eliminarRecordatorio = async (id) => {
        console.log(id)
        try{
            const response = await axios.delete(`https://api-rest-admin-notas-dps-747620528393.us-central1.run.app/Recordatorios/${id}`);
            console.log('Respuesta del servidor:', response.data);
            filtrar()
            alert('Eliminado')
        }catch(error){
            console.log(error)
        }
    }

    return(
        <ScrollView style={styles.container}>
            <Text>Filtrar por:</Text>
            <Picker
            selectedValue={mode}
            onValueChange={(itemValue, itemIndex) =>
                setMode(itemValue)
              }
            >
                <Picker.Item label="Nombre de etiqueta" value={'nombre'}/>
                <Picker.Item label="Id de etiqueta" value={'id'}/>
            </Picker>
            <View>

            </View>
            <TextInput style={styles.input} onChangeText={setInputText}/>
            <TouchableOpacity style={styles.button}>
                <Icon name='tune-variant' color={'white'} size={20} onPress={() => filtrar()}> Filtrar</Icon>
            </TouchableOpacity>
            { busqueda === false ? 
            <Text style={styles.adviceText}>Ingrese una busqueda y se mostrara aqui</Text> 
            : ( consultando === true ? <Text style={styles.adviceText}>Cargando...</Text> : recordatorios.length === 0 ? <Text style={styles.adviceText}>Parece que aqui no hay nada, intenta de nuevo</Text> : recordatorios.map((rec) => (<RenderRecordatorio dataRec={rec} key={rec.idNota} onPress={verRecordatorio} onDelete={eliminarRecordatorio} />))) }
        </ScrollView>
    )
}

export default FiltrarRecordatorio;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        padding: 10
    },
    button: {
        backgroundColor: '#3f6ed9',
        margin: 10,
        padding: 15,
        borderRadius: 15,
        alignSelf: 'center'
    },
    input: {
        borderWidth: 2,
        borderRadius: 8,
        padding: 5
    },
    adviceText: {
        alignSelf: 'center',
        marginTop: 30,
        fontSize: 20,
        color: '#555555'
    }
})