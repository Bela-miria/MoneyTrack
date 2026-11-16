import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import CardTransacao from '../components/CardTransacao';
import Botao from '../components/Botao';
import CabecalhoSecao from '../components/CabecalhoSecao';
import { useTransacoes } from '../context/TransacoesContext';

export default function HomeScreen({ navigation }) {
  const { transacoes } = useTransacoes();

  function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  const receitas = transacoes
    .filter((item) => item.tipo === 'receita')
    .reduce((total, item) => total + item.valor, 0);

  const despesas = transacoes
    .filter((item) => item.tipo === 'despesa')
    .reduce((total, item) => total + item.valor, 0);

  const saldo = receitas - despesas;

  const transacoesRecentes = transacoes.slice(0, 3);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.logo}>Olá, Isabela</Text>
          <Text style={styles.subtitulo}>Seu controle financeiro</Text>
        </View>

        <View style={styles.saldoCard}>
          <Text style={styles.saldoLabel}>Saldo disponível</Text>
          <Text style={styles.saldoValor}>{formatarMoeda(saldo)}</Text>
          <Text style={styles.saldoDescricao}>Acompanhe sua vida financeira</Text>
        </View>

        <View style={styles.resumoContainer}>
          <View style={styles.resumoCard}>
            <Text style={styles.resumoLabel}>Receitas</Text>
            <Text style={styles.receitaValor}>{formatarMoeda(receitas)}</Text>
          </View>

          <View style={styles.resumoCard}>
            <Text style={styles.resumoLabel}>Despesas</Text>
            <Text style={styles.despesaValor}>{formatarMoeda(despesas)}</Text>
          </View>
        </View>

        <CabecalhoSecao 
          titulo="Transações recentes" 
          textoAcao="Ver todas" 
          aoPressionarAcao={() => navigation.navigate('Transacoes')} 
        />

        {transacoesRecentes.map((item) => (
          <CardTransacao
            key={item.id}
            descricao={item.descricao}
            categoria={item.categoria}
            valor={item.valor}
            tipo={item.tipo}
            aoPressionar={() => navigation.navigate('Detalhes', { transacao: item })}
          />
        ))}

        <View style={styles.areaBotao}>
          <Botao 
            texto="+ Nova transação" 
            aoPressionar={() => navigation.navigate('NovaTransacao')} 
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0B1120',
  },
  container: {
    flex: 1,
    backgroundColor: '#0B1120',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 60,
  },
  header: {
    marginTop: 10,
    marginBottom: 20,
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 27,
    fontWeight: 'bold',
  },
  subtitulo: {
    color: '#94A3B8',
    fontSize: 14,
    marginTop: 5,
  },
  saldoCard: {
    backgroundColor: '#101827',
    padding: 25,
    borderRadius: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#263449',
  },
  saldoLabel: {
    color: '#94A3B8',
    fontSize: 15,
  },
  saldoValor: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 12,
  },
  saldoDescricao: {
    color: '#94A3B8',
    fontSize: 13,
  },
  resumoContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  resumoCard: {
    flex: 1,
    backgroundColor: '#101827',
    padding: 16,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#263449',
  },
  resumoLabel: {
    color: '#94A3B8',
    fontSize: 14,
    marginBottom: 10,
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
  areaBotao: {
    marginTop: 12,
    marginBottom: 20,
  },
});