import react, { useState, useEffect } from "react";
import { View, Text, Alert } from "react-native";
import axios from "axios";
import Nota from "./Nota";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

const Notas = () => {
    const idUsuario = 1;
    const [notas, setNotas] = useState([]);

    useEffect(() => {
        const getNotas = async () => {
            axios.get('https://api-rest-admin-notas-dps-747620528393.us-central1.run.app/Notas/usuario/' + idUsuario).then((response) => {
                Alert.alert('Notas', JSON.stringify(response.data));
                setNotas(response.data);
            });
        };

        getNotas();
    }, [])
    

    return (
        <>
            { notas.map((nota) => (<Nota nota={nota} key={nota.idNota} />)) }
        </>
    );
}

export default Notas;