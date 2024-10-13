import react, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from "react-native";
import * as Yup from 'yup';
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import { ScrollView } from "react-native-gesture-handler";

//Validaciones con YUP
const esquemaValidacion = Yup.object({
    nombre: Yup.string().required('El nombre es obligatorio'),
    contenido: Yup.string().required('El contenido es obligatorio'),
    idEtiqueta: Yup.number().min(1, "Debe seleccionar una etiqueta").required('La etiqueta es obligatoria')
});

const GuardarNota = ({ navigation, route }) => {
    const [idUsuario, setIdUsuario] = useState(1);
    const [etiquetas, setEtiquetas] = useState([]);
    const [cargandoEtiquetas, setCargandoEtiquetas] = useState(true);
    const [nota, setNota] = useState({ nombre: '', contenido: '', idEtiqueta: 0 });
    const [recargar, setRecargar] = useState(route.params.recargar);

    //Funciones
    const cancelarGuardado = () => {
        navigation.navigate('Notas', { "ultimaAccion" : "cancelarNota" });
    }

    const guardarNota = async (values) => {
        values.idUsuario = idUsuario;
        values.estado = "ACTIVO";

        const stringJSON = JSON.stringify(values);

        if(route.params.accion == 'crear'){
            try{
                await axios.post(
                    'https://api-rest-admin-notas-dps-747620528393.us-central1.run.app/Notas', 
                    stringJSON,
                    {
                        headers: { 'Content-Type': 'application/json' }
                    }
                )
                .then((response) => {
                    Alert.alert('Nota guardada', 'Nota guardada con éxito');
                    navigation.navigate('Notas', { "ultimaAccion" : "crearNota" + response.data.idNota });
                })
                .catch((error) => {
                    Alert.alert('Error', error);
                });
            }
            catch(error){
                Alert.alert('Error', error);
            };
        }
        else if(route.params.accion == 'editar'){
            try{
                axios.put(
                    'https://api-rest-admin-notas-dps-747620528393.us-central1.run.app/Notas/' + route.params.id, 
                    stringJSON,
                    {
                        headers: { 'Content-Type': 'application/json' }
                    }
                )
                .then((response) => {
                    Alert.alert('Nota editada', 'Nota editada con éxito');
                    navigation.navigate('Notas', { "ultimaAccion" : "editarNota" + response.data.idNota });
                })
                .catch((error) => {
                    Alert.alert('Error', error);
                });
            }
            catch(error){
                Alert.alert('Error', error);
            };
        }
        else{
            Alert.alert('Error', 'Acción no permitida');
        }
    }

    //Asincronicos
    useEffect(() => {
        //Obtener las etiquetas desde la api
        const getEtiquetas = async () => {
            axios.get('https://api-rest-admin-notas-dps-747620528393.us-central1.run.app/Etiquetas/id_usuario/' + idUsuario)
            .then((response) => {
                //Guardar etiquetas obtenidas desde api
                setEtiquetas(response.data);
                //Crear etiqueta default
                const etiquetaDefault = { idEtiqueta: 0, nombre: 'Seleccione una etiqueta' };
                //Guardar etiqueta default
                setEtiquetas([etiquetaDefault, ...response.data]);
                //Indicando que ya se guardaron las etiquetas
                setCargandoEtiquetas(false);
            });
        };

        //Obteniendo la data de la nota que se quiere editar
        const getNota = async () => {
            if(route.params.accion == 'editar'){
                //Obtener la nota desde la api
                const id = route.params.id;
                axios.get('https://api-rest-admin-notas-dps-747620528393.us-central1.run.app/Notas/' + id)
                .then((response) => {
                    setNota(response.data);
                });
            }
        }

        //Ejecutar las funciones asincronicas
        getEtiquetas();
        getNota();
    }, []);

    return (
        <Formik
            initialValues={nota}
            enableReinitialize={true}
            validationSchema={esquemaValidacion}
            onSubmit={(values) => {
                guardarNota(values);
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                <ScrollView style={styles.main}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Nombre de la nota (50 max.):</Text>
                        <TextInput
                            style={styles.textbox}
                            maxLength={50}
                            value={values.nombre}
                            onChangeText={handleChange('nombre')}
                            onBlur={handleBlur('nombre')}
                        />
                        {touched.nombre && errors.nombre && <Text style={styles.error}>{errors.nombre}</Text>}
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Etiqueta:</Text>
                        {
                            cargandoEtiquetas ? 
                            (
                                <Text style={styles.label}>Cargando...</Text>
                            ) 
                            : 
                            (
                                <Picker
                                    selectedValue={values.idEtiqueta}
                                    onValueChange={(value, index) => {setFieldValue('idEtiqueta', value)}}
                                >
                                    {
                                        etiquetas.map((item) => (
                                            <Picker.Item
                                                label={item.nombre}
                                                value={item.idEtiqueta}
                                                key={item.idEtiqueta}
                                            />
                                        ))
                                    }
                                </Picker>
                            )
                        }
                        {touched.idEtiqueta && errors.idEtiqueta && <Text style={styles.error}>{errors.idEtiqueta}</Text>}
                    </View>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Contenido de la nota (300 max.):</Text>
                        <TextInput
                            style={styles.textarea}
                            multiline={true}
                            numberOfLines={5}
                            maxLength={300}
                            placeholder="..."
                            value={values.contenido}
                            onChangeText={handleChange('contenido')}
                            onBlur={handleBlur('contenido')}
                        />
                        {touched.contenido && errors.contenido && <Text style={styles.error}>{errors.contenido}</Text>}
                    </View>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity style={styles.buttomSave} onPress={handleSubmit}>
                            <Text>Guardar nota</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttomCancel} onPress={cancelarGuardado}>
                            <Text>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            )}
        </Formik>
    );
}

export default GuardarNota;

const styles = StyleSheet.create({
    main: {
        display: 'flex',
        flexDirection: 'column',
        padding:20,
    },
    header: {
        display: 'flex',
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#56413E'
    },
    error: {
        color: 'red',
        fontSize: 15
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        padding:20
    },
    buttonGroup:{
        display: 'flex',
        flexDirection: 'row',
        padding:20
    },
    label:{
        fontSize: 20
    },
    textbox: {
        fontSize: 20,
        borderBlockColor: '#56413E',
        borderBottomWidth: 1,
    },
    textarea: {
        fontSize: 20,
        borderBlockColor: '#AEAEAE',
        borderWidth: 1,
        padding:10,
        textAlignVertical: 'top',
        height: 150
    },
    buttomSave:{
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 10,
    },
    buttomCancel:{
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 10,
    },
});