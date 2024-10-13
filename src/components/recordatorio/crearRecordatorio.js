import react, { useState, useEffect } from "react";
import {
  View,
  Text,
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CrearRecordatorio = ({navigation}) => {
  const [show, setShow] = useState(false);
  const [cargando, setCargando] = useState(true)
  const [date, setDate] = useState("");
  const [contenido, setContenido] = useState("");
  const [nombre, setNombre] = useState("");
  const [idEtiqueta, setIdEtiqueta] = useState(1);
  const [idUsuario, setIdUsuario] = useState(1);
  const [etiquetas, setEtiquetas] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    const getEtiquetas = async () => {
      axios
        .get(
          "https://api-rest-admin-notas-dps-747620528393.us-central1.run.app/Etiquetas/id_usuario/" +
            idUsuario
        )
        .then((response) => {
          setEtiquetas(response.data);
          setCargando(false)
        });
    };

    getEtiquetas();
  }, []);

  const showMode = (currentMode) => {
    setShow(true);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    const fechaRec = new Date(currentDate);
    const year = fechaRec.getFullYear();
    const month = ("0" + (fechaRec.getMonth() + 1)).slice(-2);
    const day = ("0" + fechaRec.getDate()).slice(-2);
    const fechaRecFormateada = `${year}-${month}-${day}`;
    setShow(false);
    setDate(fechaRecFormateada);
  };

  async function buildJSON() {

    if(contenido!== '' && nombre!=='' && date!=='' && idEtiqueta!== undefined && idEtiqueta!==null){
      const jsonRecordatorio = {
        contenido: contenido,
        estado: "ACTIVO",
        nombre: nombre,
        idEtiqueta: idEtiqueta,
        idUsuario: idUsuario,
        fechaRecordatorio: date,
      };
  
      const stringJSON = JSON.stringify(jsonRecordatorio);
      console.log(stringJSON);

      try{
        const response = await axios.post('https://api-rest-admin-notas-dps-747620528393.us-central1.run.app/Recordatorios', stringJSON, {
          headers: {
            'Content-Type': 'application/json'
          }});

          alert('agregado Con exito')
          navigation.goBack();
      }catch(error){
        console.log('Error', error)
      }
    }else{
      alert('Rellene todos los campos')
    }
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Icon
          name="calendar"
          color={"white"}
          size={20}
          onPress={() => showDatepicker()}
        >
          {" "}
          Elige la fecha
        </Icon>
      </TouchableOpacity>
      <Text style={styles.dateLabel}>Fecha: {date}</Text>
      <Text style={styles.label}>Nombre del Recordatorio:</Text>
      <TextInput style={styles.input} onChangeText={setNombre}></TextInput>
      <Text style={styles.label}>Contenido:</Text>
      <TextInput style={styles.input} onChangeText={setContenido}></TextInput>
      <Text style={styles.label}>Etiqueta:</Text>
      {cargando === false ? <Picker
      selectedValue={selectedValue}
        onValueChange={(itemValue, itemIndex) => {setIdEtiqueta(itemValue); setSelectedValue(itemValue)}}
      >
        {etiquetas.map((item) => (
          <Picker.Item
            label={item.nombre}
            value={item.idEtiqueta}
            key={item.idEtiqueta}
          ></Picker.Item>
        ))}
      </Picker>
      :<Text>Cargando</Text>}
      <TouchableOpacity style={styles.button}>
        <Icon
          name="calendar-check"
          color={"white"}
          size={20}
          onPress={() => buildJSON()}
        >
          Aceptar
        </Icon>
      </TouchableOpacity>
      <View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date(Date.now())}
            is24Hour={true}
            mode={"date"}
            onChange={onChange}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default CrearRecordatorio;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    padding: 15,
  },
  button: {
    backgroundColor: "#3f6ed9",
    margin: 10,
    padding: 15,
    borderRadius: 15,
    alignSelf: "center",
  },
  input: {
    borderWidth: 2,
    borderRadius: 8,
    padding: 5,
    marginBottom: 10,
  },
  label: {
    fontSize: 20,
  },
  dateLabel: {
    marginBottom: 10,
    fontSize: 20,
  },
});
