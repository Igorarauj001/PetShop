// utils/validation.js
// Funções de validação usadas no Cadastro e no Login do PetFacil.
// Fase 1: validação 100% local (sem back-end), conforme escopo do projeto.

/**
 * Valida nome completo: obrigatório e com no mínimo 2 caracteres (após trim).
 */
export function validarNomeCompleto(nome) {
  const valor = (nome || '').trim();
  if (valor.length === 0) {
    return { valido: false, mensagem: 'O nome completo é obrigatório.' };
  }
  if (valor.length < 2) {
    return { valido: false, mensagem: 'O nome deve ter no mínimo 2 caracteres.' };
  }
  return { valido: true, mensagem: '' };
}

/**
 * Valida e-mail: obrigatório e em formato válido.
 */
export function validarEmail(email) {
  const valor = (email || '').trim();
  if (valor.length === 0) {
    return { valido: false, mensagem: 'O e-mail é obrigatório.' };
  }
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexEmail.test(valor)) {
    return { valido: false, mensagem: 'Informe um e-mail válido.' };
  }
  return { valido: true, mensagem: '' };
}

/**
 * Valida CPF: obrigatório e com dígitos verificadores corretos.
 * Aceita CPF com ou sem máscara (pontos e traço).
 */
export function validarCPF(cpf) {
  const valor = (cpf || '').trim();
  if (valor.length === 0) {
    return { valido: false, mensagem: 'O CPF é obrigatório.' };
  }

  const digitos = valor.replace(/\D/g, '');

  if (digitos.length !== 11) {
    return { valido: false, mensagem: 'O CPF deve ter 11 dígitos.' };
  }

  // Rejeita sequências repetidas (ex: 111.111.111-11), que passam no cálculo
  // matemático mas nunca são CPFs reais.
  if (/^(\d)\1{10}$/.test(digitos)) {
    return { valido: false, mensagem: 'CPF inválido.' };
  }

  const calcularDigito = (base, pesoInicial) => {
    let soma = 0;
    for (let i = 0; i < base.length; i++) {
      soma += parseInt(base[i], 10) * (pesoInicial - i);
    }
    const resto = (soma * 10) % 11;
    return resto === 10 ? 0 : resto;
  };

  const nove = digitos.substring(0, 9);
  const primeiroDigito = calcularDigito(nove, 10);
  const dez = nove + String(primeiroDigito);
  const segundoDigito = calcularDigito(dez, 11);

  const cpfCalculado = dez + String(segundoDigito);

  if (cpfCalculado !== digitos) {
    return { valido: false, mensagem: 'CPF inválido.' };
  }

  return { valido: true, mensagem: '' };
}

/**
 * Formata CPF com máscara 000.000.000-00 enquanto o usuário digita.
 */
export function formatarCPF(texto) {
  const digitos = (texto || '').replace(/\D/g, '').slice(0, 11);
  return digitos
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}

/**
 * Valida senha: apenas obrigatoriedade (regra do documento não pede
 * complexidade mínima, só presença do campo).
 */
export function validarSenha(senha) {
  if (!senha || senha.length === 0) {
    return { valido: false, mensagem: 'A senha é obrigatória.' };
  }
  return { valido: true, mensagem: '' };
}

/**
 * Valida se a confirmação de senha é obrigatória e idêntica à senha.
 */
export function validarConfirmacaoSenha(senha, confirmacao) {
  if (!confirmacao || confirmacao.length === 0) {
    return { valido: false, mensagem: 'Repita a senha.' };
  }
  if (senha !== confirmacao) {
    return { valido: false, mensagem: 'As senhas não coincidem.' };
  }
  return { valido: true, mensagem: '' };
}

/**
 * Roda todas as validações do formulário de cadastro de uma vez.
 * Retorna um objeto { valido: boolean, erros: { campo: mensagem } }
 */
export function validarFormularioCadastro({ nomeCompleto, email, cpf, senha, confirmarSenha }) {
  const erros = {};

  const resNome = validarNomeCompleto(nomeCompleto);
  if (!resNome.valido) erros.nomeCompleto = resNome.mensagem;

  const resEmail = validarEmail(email);
  if (!resEmail.valido) erros.email = resEmail.mensagem;

  const resCpf = validarCPF(cpf);
  if (!resCpf.valido) erros.cpf = resCpf.mensagem;

  const resSenha = validarSenha(senha);
  if (!resSenha.valido) erros.senha = resSenha.mensagem;

  const resConfirmacao = validarConfirmacaoSenha(senha, confirmarSenha);
  if (!resConfirmacao.valido) erros.confirmarSenha = resConfirmacao.mensagem;

  return { valido: Object.keys(erros).length === 0, erros };
}

/**
 * Valida o formulário de login: apenas presença dos campos
 * (autenticação é simulada nesta fase, sem back-end).
 */
export function validarFormularioLogin({ login, senha }) {
  const erros = {};
  if (!login || login.trim().length === 0) {
    erros.login = 'Informe seu login (e-mail).';
  }
  if (!senha || senha.length === 0) {
    erros.senha = 'Informe sua senha.';
  }
  return { valido: Object.keys(erros).length === 0, erros };
}