# MoneyTrack - Controle Financeiro

## Descrição
Aplicativo mobile desenvolvido em React Native com Expo para gerenciamento de finanças pessoais, permitindo acompanhar saldo, visualizar extratos e cadastrar novas receitas e despesas.

## Aluno
Isabela Miriã Gabriel Pasqual - RGM 42927340

## Telas
- **Home**: Exibe o saldo total, resumo de receitas/despesas e atalhos.
- **Transações**: Lista completa de todas as movimentações financeiras.
- **Nova Transação**: Formulário controlado para registrar novos lançamentos.
- **Detalhes**: Tela que exibe informações detalhadas de uma transação via parâmetros.

## Onde estão os requisitos
- Componentes: components/Botao.js, components/CardTransacao.js, components/CabecalhoSecao.js
- Props com callback: Botao.js (recebe função aoPressionar)
- useState: HomeScreen.js e NovaTransacaoScreen.js
- useEffect: DetalhesScreen.js (com função de limpeza/cleanup)
- Navegação com parâmetros: Passagem de objetos via route.params entre Home, Transações e Detalhes.

## Vídeo de demonstração
demo/demo.mp4

## Como executar
npm install
npx expo start