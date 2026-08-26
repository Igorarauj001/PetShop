// App.js
// Ponto de entrada de demonstração para testar Login + Cadastro isoladamente.
// Quando integrar com o restante do time, este arquivo deve ser substituído
// pelo App.js principal do projeto (com todas as telas do grupo).

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';

import LoginScreen from './screens/LoginScreen';
import CadastroScreen from './screens/CadastroScreen';

const Stack = createNativeStackNavigator();

// Placeholder só para o login conseguir navegar "para algum lugar" depois
// de autenticar. Substituir pela tela real de Lista de Produtos (Israel).
function ListaProdutosPlaceholder({ route }) {
  const usuario = route.params?.usuario;
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderTexto}>
        Login realizado com sucesso{usuario ? `, ${usuario.nomeCompleto}` : ''}!
      </Text>
      <Text style={styles.placeholderSubtexto}>
        (Aqui entra a tela de Lista de Produtos)
      </Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Cadastro" component={CadastroScreen} />
        <Stack.Screen name="ListaProdutos" component={ListaProdutosPlaceholder} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  placeholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F6F5',
    padding: 24,
  },
  placeholderTexto: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2E7D5B',
    textAlign: 'center',
  },
  placeholderSubtexto: {
    fontSize: 13,
    color: '#777',
    marginTop: 8,
  },
});