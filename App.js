
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import TransacoesScreen from './screens/TransacoesScreen';
import NovaTransacaoScreen from './screens/NovaTransacaoScreen';
import DetalhesScreen from './screens/DetalhesScreen';

import { TransacoesProvider } from './context/TransacoesContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TransacoesProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#101827',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            contentStyle: {
              backgroundColor: '#0B1120',
            },
          }}
        >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'MoneyTrack',
              headerBackVisible: false,
            }}
          />

          <Stack.Screen
            name="Transacoes"
            component={TransacoesScreen}
            options={{ title: 'Minhas transações' }}
          />

          <Stack.Screen
            name="NovaTransacao"
            component={NovaTransacaoScreen}
            options={{ title: 'Nova transação' }}
          />

          <Stack.Screen
            name="Detalhes"
            component={DetalhesScreen}
            options={{ title: 'Detalhes da transação' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TransacoesProvider>
  );
}
