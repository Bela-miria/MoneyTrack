import React, { useState } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  Alert,
  ScrollView,
  View,
} from 'react-native';
import Botao from '../components/Botao';
import { useTransacoes } from '../context/TransacoesContext';

export default function NovaTransacaoScreen({ navigation }) {
  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('despesa');
  
  const { adicionarTransacao } = useTransacoes();

  function handleSalvar() {
    if (!descricao.trim() || !categoria.trim() || !valor.trim()) {
      Alert.alert(
        'Campos obrigatórios',
        'Preencha a descrição, a categoria e o valor da transação.'
      );
      return;
    }

    const valorLimpo = valor
      .trim()
      .replace(/\s/g, '')
      .replace(/^R\$/, '');

    const valorNumerico = valorLimpo.includes(',')
      ? Number(valorLimpo.replace(/\./g, '').replace(',', '.'))
      : Number(valorLimpo);

    if (!Number.isFinite(valorNumerico) || valorNumerico <= 0) {
      Alert.alert(
        'Valor inválido',
        'Informe um valor numérico maior que zero. Exemplo: 150,50.'
      );
      return;
    }

    const novaTransacao = {
      id: Date.now().toString(),
      descricao: descricao.trim(),
      categoria: categoria.trim(),
      valor: valorNumerico,
      tipo,
      data: new Date().toLocaleDateString('pt-BR'),
    };

    adicionarTransacao(novaTransacao);

    Alert.alert(
      'Transação cadastrada!',
      'Sua movimentação foi registrada com sucesso.',
      [
        {
          text: 'Continuar',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Conta de Luz, Aluguel..."
        placeholderTextColor="#64748B"
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Categoria</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Alimentação, Contas, Lazer..."
        placeholderTextColor="#64748B"
        value={categoria}
        onChangeText={setCategoria}
      />

      <Text style={styles.label}>Valor (R$)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 150,50"
        placeholderTextColor="#64748B"
        keyboardType="decimal-pad"
        value={valor}
        onChangeText={setValor}
      />

      <Text style={styles.label}>Tipo de Movimentação</Text>
      <View style={styles.grupoBotoes}>
        <Botao 
          texto="Despesa" 
          corFundo={tipo === 'despesa' ? '#EF4444' : '#1E293B'} 
          aoPressionar={() => setTipo('despesa')} 
        />
        <Botao 
          texto="Receita" 
          corFundo={tipo === 'receita' ? '#22C55E' : '#1E293B'} 
          aoPressionar={() => setTipo('receita')} 
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <Botao texto="Salvar Transação" aoPressionar={handleSalvar} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1120',
    padding: 20,
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
  grupoBotoes: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
});