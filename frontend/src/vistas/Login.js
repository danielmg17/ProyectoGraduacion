import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
// import { loginUsuario } from '../controllers/loginController';

const LoginScreen = ({ navigation }) => {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setLoading(true);
    setError('');
    // const res = await loginUsuario(correo, password);
    // Simulación de respuesta exitosa (quita esto y descomenta lo de arriba cuando tengas login real)
    const res = { success: true };

    setLoading(false);

    if (res.success) {
      // navigation.replace('Home');
      alert("¡Login correcto!");
    } else {
      setError(res.mensaje || 'Credenciales incorrectas');
    }
  };

  const irAPacientes = () => {
    navigation.navigate('pacienteListVista');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={correo}
        onChangeText={setCorreo}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Entrar</Text>}
      </TouchableOpacity>

      {/* Nuevo botón para navegar a PacienteListVista */}
      <TouchableOpacity style={styles.linkButton} onPress={irAPacientes}>
        <Text style={styles.linkText}>Ir a Lista de Pacientes</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24, backgroundColor: '#f4f7fa' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 28, color: '#222', textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#bbb', borderRadius: 10, marginBottom: 18, padding: 14, backgroundColor: '#fff' },
  button: { backgroundColor: '#4B93FC', borderRadius: 10, padding: 14, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  error: { color: 'red', marginBottom: 14, textAlign: 'center' },
  linkButton: { marginTop: 24, alignItems: 'center' },
  linkText: { color: '#4B93FC', textDecorationLine: 'underline', fontSize: 16 },
});

export default LoginScreen;
