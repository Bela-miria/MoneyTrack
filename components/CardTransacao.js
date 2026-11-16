import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function CardTransacao({ descricao, categoria, valor, tipo, aoPressionar }) {
  const isReceita = tipo === 'receita';

  return (
    <TouchableOpacity style={styles.card} onPress={aoPressionar} activeOpacity={0.7}>
      <View>
        <Text style={styles.transacaoNome}>{descricao}</Text>
        <Text style={styles.transacaoCategoria}>{categoria}</Text>
      </View>
      <Text style={isReceita ? styles.receitaValor : styles.despesaValor}>
        {isReceita ? '+ ' : '- '}
        {valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#101827',
    padding: 18,
    borderRadius: 14,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#263449',
  },
  transacaoNome: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  transacaoCategoria: {
    color: '#94A3B8',
    fontSize: 12,
    marginTop: 5,
  },
  receitaValor: {
    color: '#22C55E',
    fontSize: 16,
    fontWeight: 'bold',
  },
  despesaValor: {
    color: '#F87171',
    fontSize: 16,
    fontWeight: 'bold',
  },
});