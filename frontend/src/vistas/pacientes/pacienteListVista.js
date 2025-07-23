import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { getPacientes } from '../../serviciosAPI/pacienteServicioAPI';

const PacientesList = () => {
  const [pacientes, setPacientes] = useState([]);

  useEffect(() => {
    getPacientes()
      .then(res => setPacientes(res.data))
      .catch(err => console.error('Error al cargar pacientes', err));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lista de Pacientes</Text>
      <ScrollView style={styles.scroll}>
        {pacientes.map(p => (
          <View key={p.id_paciente} style={styles.card}>
            <Text style={styles.label}>ID:</Text>
            <Text>{p.id_paciente}</Text>
            <Text style={styles.label}>Nombre:</Text>
            <Text>{p.nombre_completo}</Text>
            <Text style={styles.label}>Género:</Text>
            <Text>{p.genero}</Text>
            <Text style={styles.label}>Fecha Nac:</Text>
            <Text>{p.fecha_nacimiento}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f4f7fa' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, color: '#222' },
  scroll: { flex: 1 },
  card: {
    marginBottom: 14,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08,
    elevation: 3,
  },
  label: { fontWeight: 'bold', marginTop: 4 },
});

export default PacientesList;
