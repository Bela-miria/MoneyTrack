
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import Botao from '../components/Botao';

export default function LoginScreen({ navigation }) {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  function handleLogin() {
    // Verifica se os campos foram preenchidos.
    if (!usuario.trim() || !senha.trim()) {
      Alert.alert(
        'Campos obrigatórios',
        'Por favor, informe seu usuário e sua senha.'
      );
      return;
    }

    // Login demonstrativo do projeto.
    if (usuario === 'isabela.pasqual' && senha === 'SENHA_DEMO_ATUAL') {
      navigation.replace('Home');
    } else {
      Alert.alert(
        'Acesso negado',
        'Usuário ou senha incorretos. Verifique os dados e tente novamente.'
      );
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>MoneyTrack</Text>
      <Text style={styles.subtitulo}>Faça login para continuar</Text>

      <Text style={styles.label}>Usuário</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu usuário"
        placeholderTextColor="#64748B"
        autoCapitalize="none"
        value={usuario}
        onChangeText={setUsuario}
      />

      <Text style={styles.label}>Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite sua senha"
        placeholderTextColor="#64748B"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <View style={{ marginTop: 20 }}>
        <Botao texto="Entrar" aoPressionar={handleLogin} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1120',
    padding: 25,
    justifyContent: 'center',
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitulo: {
    color: '#94A3B8',
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 30,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 8,
    marginTop: 15,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#101827',
    color: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#263449',
    fontSize: 16,
  },
});
