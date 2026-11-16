
import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import CardTransacao from '../components/CardTransacao';
import { useTransacoes } from '../context/TransacoesContext';

export default function TransacoesScreen({ navigation }) {
  const { transacoes } = useTransacoes();

  const [pesquisa, setPesquisa] = useState('');
  const [transacoesFiltradas, setTransacoesFiltradas] = useState(transacoes);

  // Atualiza a lista conforme o usuário digita.
  useEffect(() => {
    const termo = pesquisa.trim().toLowerCase();

    const resultado = transacoes.filter((item) => {
      const descricao = item.descricao.toLowerCase();
      const categoria = item.categoria.toLowerCase();

      return (
        descricao.includes(termo) ||
        categoria.includes(termo)
      );
    });

    setTransacoesFiltradas(resultado);
  }, [pesquisa, transacoes]);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.tituloSecao}>
        Todas as Movimentações
      </Text>

      <TextInput
        style={styles.campoPesquisa}
        placeholder="Pesquisar descrição ou categoria..."
        placeholderTextColor="#94A3B8"
        value={pesquisa}
        onChangeText={setPesquisa}
      />

      {transacoesFiltradas.length === 0 ? (
        <Text style={styles.vazio}>
          Nenhuma transação encontrada.
        </Text>
      ) : (
        transacoesFiltradas.map((item) => (
          <CardTransacao
            key={item.id}
            descricao={item.descricao}
            categoria={item.categoria}
            valor={item.valor}
            tipo={item.tipo}
            aoPressionar={() =>
              navigation.navigate('Detalhes', {
                transacao: item,
              })
            }
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1120',
    padding: 20,
  },
  tituloSecao: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  campoPesquisa: {
    backgroundColor: '#101827',
    borderWidth: 1,
    borderColor: '#263449',
    borderRadius: 12,
    padding: 14,
    color: '#FFFFFF',
    fontSize: 15,
    marginBottom: 20,
  },
  vazio: {
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 40,
  },
});
