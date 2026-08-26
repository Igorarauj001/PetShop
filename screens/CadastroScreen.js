// screens/CadastroScreen.js
// RF01 — Cadastrar usuário, com validação completa dos campos (seção 6 do
// documento): nome completo, e-mail, CPF, senha e confirmação de senha.

import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import {
  validarFormularioCadastro,
  formatarCPF,
} from '../utils/validation';
import { cadastrarUsuario } from '../utils/mockUsuarios';

export default function CadastroScreen({ navigation }) {
  const [nomeCompleto, setNomeCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erros, setErros] = useState({});
  const [tentouEnviar, setTentouEnviar] = useState(false);

  const dadosFormulario = { nomeCompleto, email, cpf, senha, confirmarSenha };

  // Revalida em tempo real assim que o usuário tenta enviar pela primeira
  // vez, para dar feedback imediato enquanto ele corrige os campos.
  const validacaoAtual = useMemo(
    () => validarFormularioCadastro(dadosFormulario),
    [nomeCompleto, email, cpf, senha, confirmarSenha]
  );

  const formularioValido = validacaoAtual.valido;

  function handleCpfChange(texto) {
    setCpf(formatarCPF(texto));
  }

  function handleCadastrar() {
    setTentouEnviar(true);
    const resultado = validarFormularioCadastro(dadosFormulario);
    setErros(resultado.erros);

    if (!resultado.valido) {
      return;
    }

    const resposta = cadastrarUsuario({ nomeCompleto, email, cpf, senha });
    if (!resposta.sucesso) {
      setErros({ geral: resposta.mensagem });
      return;
    }

    Alert.alert('Conta criada!', 'Faça login para continuar.', [
      { text: 'OK', onPress: () => navigation.navigate('Login') },
    ]);
  }

  // Exibe erro de um campo apenas depois da primeira tentativa de envio,
  // para não "assustar" o usuário com mensagens antes dele digitar algo.
  const erroDe = (campo) => (tentouEnviar ? erros[campo] || validacaoAtual.erros[campo] : null);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.titulo}>Criar conta</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Nome completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome completo"
          value={nomeCompleto}
          onChangeText={setNomeCompleto}
        />
        {erroDe('nomeCompleto') ? <Text style={styles.erro}>{erroDe('nomeCompleto')}</Text> : null}

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="seu-email@exemplo.com"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        {erroDe('email') ? <Text style={styles.erro}>{erroDe('email')}</Text> : null}

        <Text style={styles.label}>CPF</Text>
        <TextInput
          style={styles.input}
          placeholder="000.000.000-00"
          keyboardType="numeric"
          maxLength={14}
          value={cpf}
          onChangeText={handleCpfChange}
        />
        {erroDe('cpf') ? <Text style={styles.erro}>{erroDe('cpf')}</Text> : null}

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />
        {erroDe('senha') ? <Text style={styles.erro}>{erroDe('senha')}</Text> : null}

        <Text style={styles.label}>Repetir senha</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          secureTextEntry
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
        />
        {erroDe('confirmarSenha') ? (
          <Text style={styles.erro}>{erroDe('confirmarSenha')}</Text>
        ) : null}

        {erros.geral ? <Text style={styles.erroGeral}>{erros.geral}</Text> : null}

        <TouchableOpacity
          style={[styles.botaoCadastrar, !formularioValido && styles.botaoDesabilitado]}
          onPress={handleCadastrar}
          disabled={!formularioValido}
        >
          <Text style={styles.botaoCadastrarTexto}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkLogin}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.linkLoginTexto}>Já tem conta? Voltar para o login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const LARANJA = '#E8772E';
const VERDE = '#2E7D5B';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F4F6F5',
    padding: 24,
  },
  header: {
    marginBottom: 20,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    color: LARANJA,
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
  botaoCadastrar: {
    backgroundColor: VERDE,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  botaoDesabilitado: {
    backgroundColor: '#A9CBB9',
  },
  botaoCadastrarTexto: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 15,
  },
  linkLogin: {
    alignItems: 'center',
    marginTop: 16,
  },
  linkLoginTexto: {
    color: '#777',
    fontSize: 13,
  },
});