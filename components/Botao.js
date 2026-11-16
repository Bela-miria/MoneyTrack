import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function Botao({ texto, aoPressionar, corFundo = '#0284C7' }) {
  return (
    <TouchableOpacity 
      style={[styles.botao, { backgroundColor: corFundo }]} 
      onPress={aoPressionar}
      activeOpacity={0.8}
    >
      <Text style={styles.textoBotao}>{texto}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botao: {
    padding: 17,
    borderRadius: 14,
    alignItems: 'center',
    marginVertical: 6,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});