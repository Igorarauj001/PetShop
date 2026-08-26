// screens/LoginScreen.js
// RF02 — Efetuar login (autenticação simulada, sem token/back-end).

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { validarFormularioLogin } from '../utils/validation';
import { autenticarUsuario } from '../utils/mockUsuarios';

export default function LoginScreen({ navigation }) {
  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [erros, setErros] = useState({});

  function handleEntrar() {
    const resultado = validarFormularioLogin({ login, senha });
    setErros(resultado.erros);

    if (!resultado.valido) {
      return;
    }

    const auth = autenticarUsuario({ login, senha });
    if (!auth.sucesso) {
      setErros({ geral: auth.mensagem });
      return;
    }

    // Fase 1: sem token real — apenas navega para a área autenticada,
    // passando o usuário logado como parâmetro para as próximas telas.
    navigation.reset({
      index: 0,
      routes: [{ name: 'ListaProdutos', params: { usuario: auth.usuario } }],
    });
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoEmoji}>🐾</Text>
        </View>
        <Text style={styles.titulo}>PetFácil</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="seu-email@exemplo.com"
          autoCapitalize="none"
          keyboardType="email-address"
          value={login}
          onChangeText={setLogin}
        />
        {erros.login ? <Text style={styles.erro}>{erros.login}</Text> : null}

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        {erros.senha ? <Text style={styles.erro}>{erros.senha}</Text> : null}

        {erros.geral ? <Text style={styles.erroGeral}>{erros.geral}</Text> : null}

        <TouchableOpacity style={styles.botaoEntrar} onPress={handleEntrar}>
          <Text style={styles.botaoEntrarTexto}>Entrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkCadastro}
          onPress={() => navigation.navigate('Cadastro')}
        >
          <Text style={styles.linkCadastroTexto}>Não tem conta?</Text>
          <Text style={styles.linkCadastroBotao}>Criar cadastro</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const VERDE = '#2E7D5B';
const LARANJA = '#E8772E';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F5',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: VERDE,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  logoEmoji: {
    fontSize: 32,
  },
  titulo: {
    fontSize: 24,
    fontWeight: '700',
    color: VERDE,
  },
  form: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    backgroundColor: '#FAFAFA',
  },
  erro: {
    color: '#C0392B',
    fontSize: 12,
    marginTop: 4,
  },
  erroGeral: {
    color: '#C0392B',
    fontSize: 13,
    marginTop: 12,
    textAlign: 'center',
  },
  botaoEntrar: {
    backgroundColor: VERDE,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  botaoEntrarTexto: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  linkCadastro: {
    alignItems: 'center',
    marginTop: 20,
  },
  linkCadastroTexto: {
    color: '#777',
    fontSize: 13,
  },
  linkCadastroBotao: {
    color: LARANJA,
    fontWeight: '700',
    fontSize: 14,
    marginTop: 4,
  },
});