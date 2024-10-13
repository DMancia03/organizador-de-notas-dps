import react, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from "react-native";
import * as Yup from 'yup';
import { Formik } from "formik";
import { Picker } from "@react-native-picker/picker";

//Validaciones con YUP
const esquemaValidacion = Yup.object({
    nombre: Yup.string().required('El nombre es obligatorio'),
    contenido: Yup.string().required('El contenido es obligatorio'),
    idEtiqueta: Yup.number().required('La etiqueta es obligatoria'),
});

const GuardarNota = () => {
    return (
        <Formik
            initialValues={{ nombre: '', contenido: '', idEtiqueta: 0 }}
            validationSchema={esquemaValidacion}
            onSubmit={(values) => {
                Alert.alert(JSON.stringify(values));
            }}
        >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue }) => (
                <View>
                    <Text>Hola</Text>
                    <View>
                        <Text>Nombre de la nota:</Text>
                        <TextInput />
                    </View>
                    <View>
                        <Text>Contenido del nota:</Text>
                        <TextInput />
                    </View>
                </View>
            )}
        </Formik>
    );
}

export default GuardarNota;

const styles = StyleSheet.create({
    //
});