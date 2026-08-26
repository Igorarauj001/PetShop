// utils/mockUsuarios.js
// "Base de dados" simulada em memória para a Fase 1 (sem servidor).
// Entidade Usuario conforme o documento: nomeCompleto, cpf (identificador
// único), login e senha.

let usuarios = [
  // Usuário de teste para facilitar o desenvolvimento das outras telas.
  {
    nomeCompleto: 'Usuário Teste',
    cpf: '12345678909',
    login: 'teste@petfacil.com',
    senha: '123456',
  },
];

export function listarUsuarios() {
  return usuarios;
}

export function buscarUsuarioPorCpf(cpf) {
  const digitos = (cpf || '').replace(/\D/g, '');
  return usuarios.find((u) => u.cpf === digitos);
}

export function buscarUsuarioPorLogin(login) {
  const valor = (login || '').trim().toLowerCase();
  return usuarios.find((u) => u.login.toLowerCase() === valor);
}

/**
 * Cadastra um novo usuário na base simulada.
 * Retorna { sucesso: boolean, mensagem?: string }.
 */
export function cadastrarUsuario({ nomeCompleto, email, cpf, senha }) {
  const digitosCpf = (cpf || '').replace(/\D/g, '');

  if (buscarUsuarioPorCpf(digitosCpf)) {
    return { sucesso: false, mensagem: 'Já existe uma conta cadastrada com esse CPF.' };
  }
  if (buscarUsuarioPorLogin(email)) {
    return { sucesso: false, mensagem: 'Já existe uma conta cadastrada com esse e-mail.' };
  }

  const novoUsuario = {
    nomeCompleto: nomeCompleto.trim(),
    cpf: digitosCpf,
    login: email.trim(),
    senha,
  };

  usuarios = [...usuarios, novoUsuario];
  return { sucesso: true };
}

/**
 * Simula a autenticação (RF02): confere login e senha na base em memória.
 * Retorna { sucesso: boolean, usuario?: object, mensagem?: string }.
 */
export function autenticarUsuario({ login, senha }) {
  const usuario = buscarUsuarioPorLogin(login);
  if (!usuario || usuario.senha !== senha) {
    return { sucesso: false, mensagem: 'Login ou senha inválidos.' };
  }
  return { sucesso: true, usuario };
}