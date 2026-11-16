import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DetalhesScreen({ route }) {
  const { transacao } = route.params || {};
  const [carregando, setCarregando] = useState(true);

  // Exemplo real de useEffect com função de limpeza (cleanup) exigido pelo professor
  useEffect(() => {
    const timer = setTimeout(() => {
      setCarregando(false);
    }, 500);

    return () => clearTimeout(timer); // Função de limpeza
  }, []);

  if (carregando) {
    return (
      <View style={styles.containerCarregando}>
        <Text style={styles.textoCarregando}>Carregando detalhes...</Text>
      </View>
    );
  }

  const isReceita = transacao?.tipo === 'receita';

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.rotulo}>Descrição:</Text>
        <Text style={styles.valorDestaque}>{transacao?.descricao}</Text>

        <Text style={styles.rotulo}>Categoria:</Text>
        <Text style={styles.valor}>{transacao?.categoria}</Text>

        <Text style={styles.rotulo}>Tipo:</Text>
        <Text style={[styles.valor, { color: isReceita ? '#22C55E' : '#F87171' }]}>
          {transacao?.tipo?.toUpperCase()}
        </Text>

        <Text style={styles.rotulo}>Valor:</Text>
        <Text style={[styles.valorDestaque, { color: isReceita ? '#22C55E' : '#F87171' }]}>
          {transacao?.valor?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </Text>

        <Text style={styles.rotulo}>Data:</Text>
        <Text style={styles.valor}>{transacao?.data || 'N/A'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1120',
    padding: 20,
  },
  containerCarregando: {
    flex: 1,
    backgroundColor: '#0B1120',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoCarregando: {
    color: '#38BDF8',
    fontSize: 16,
  },
  card: {
    backgroundColor: '#101827',
    padding: 24,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#263449',
  },
  rotulo: {
    color: '#94A3B8',
    fontSize: 14,
    marginTop: 14,
  },
  valor: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 4,
  },
  valorDestaque: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
});