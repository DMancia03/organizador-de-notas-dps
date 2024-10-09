import react from "react";
import { View, Text, StyleSheet } from "react-native";

const Nota = ({nota}) => {
    return (
        <View style={styles.nota}>
            <Text style={styles.notaTitle}>{nota.nombre}</Text>
            <Text style={styles.notaEtiqueta}>{nota.nombreEtiqueta}</Text>
            <Text>{nota.contenido}</Text>
        </View>
    );
}

export default Nota;

const styles = StyleSheet.create({
    nota: {
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        gap: 10,
        borderBlockColor: '#56413E',
        borderBottomWidth: 1
    },
    notaTitle: {
        fontSize: 20,
        color: '#56413E'
    },
    notaEtiqueta: {
        backgroundColor: '#E5CBB4',
        borderRadius: 10,
        padding: 10,
        width: '40%'
    }
});