import react, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Notas from "../components/notas/Notas";

const VerNotas = () => {
    return (
        <View style={styles.main}>
            <View style={styles.header}>
                <Text style={styles.headerText}>NOTAS</Text>
            </View>
            <Notas />
        </View>
    );
}

export default VerNotas;

const styles = StyleSheet.create({
    main: {
        display: 'flex',
    },
    header: {
        display: 'flex'
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#56413E'
    }
});