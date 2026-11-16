import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TransacoesContext = createContext(null);

const CHAVE_STORAGE = '@moneytrack_transacoes';

const transacoesIniciais = [
  {
    id: '1',
    descricao: 'Salário',
    categoria: 'Receita',
    valor: 2500,
    tipo: 'receita',
    data: '10/11/2026',
  },
  {
    id: '2',
    descricao: 'Supermercado',
    categoria: 'Alimentação',
    valor: 350,
    tipo: 'despesa',
    data: '09/11/2026',
  },
  {
    id: '3',
    descricao: 'Internet',
    categoria: 'Contas',
    valor: 100,
    tipo: 'despesa',
    data: '08/11/2026',
  },
];

export function TransacoesProvider({ children }) {
  const [transacoes, setTransacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Carregar transações salvas ao abrir o aplicativo
  useEffect(() => {
    async function carregarDados() {
      try {
        const dadosSalvos = await AsyncStorage.getItem(CHAVE_STORAGE);
        if (dadosSalvos !== null) {
          setTransacoes(JSON.parse(dadosSalvos));
        } else {
          setTransacoes(transacoesIniciais);
          await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(transacoesIniciais));
        }
      } catch (erro) {
        console.error('Erro ao carregar transações:', erro);
        setTransacoes(transacoesIniciais);
      } finally {
        setCarregando(false);
      }
    }

    carregarDados();
  }, []);

  // Função para adicionar e salvar automaticamente no AsyncStorage
  async function adicionarTransacao(novaTransacao) {
    try {
      const novasTransacoes = [novaTransacao, ...transacoes];
      setTransacoes(novasTransacoes);
      await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(novasTransacoes));
    } catch (erro) {
      console.error('Erro ao salvar nova transação:', erro);
    }
  }

  return (
    <TransacoesContext.Provider
      value={{
        transacoes,
        adicionarTransacao,
        carregando,
      }}
    >
      {children}
    </TransacoesContext.Provider>
  );
}

export function useTransacoes() {
  const contexto = useContext(TransacoesContext);
  if (!contexto) {
    throw new Error(
      'useTransacoes deve ser utilizado dentro de TransacoesProvider.'
    );
  }
  return contexto;
}