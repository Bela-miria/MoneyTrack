import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CabecalhoSecao({ titulo, textoAcao, aoPressionarAcao }) {
  return (
    <View style={styles.secaoHeader}>
      <Text style={styles.secaoTitulo}>{titulo}</Text>
      {textoAcao && (
        <TouchableOpacity onPress={aoPressionarAcao}>
          <Text style={styles.verTodas}>{textoAcao}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  secaoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    marginTop: 10,
  },
  secaoTitulo: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
  },
  verTodas: {
    color: '#38BDF8',
    fontSize: 13,
  },
});