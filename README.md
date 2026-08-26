cat > README.md << 'EOF'
# PetFácil — App Mobile (React Native)

Aplicativo de compras para pet shop com recomendações personalizadas, desenvolvido em React Native para a disciplina de Sistemas de Informação (Desenvolvimento Mobile).

**Fase 1:** front-end completo com dados simulados (mock), sem servidor, banco de dados ou autenticação real.

## Equipe

| Integrante | Responsabilidade |
|---|---|
| Igor | Login e Cadastro (RF01, RF02) |
| Israel | Catálogo e detalhe do produto (RF03) |
| Nathan | Carrinho e finalização de pedido (RF04–RF08) |
| Kaik | Assistente com IA e arquitetura de navegação (RF09) |

## Tecnologias

- React Native (via Expo)
- React Navigation
- React hooks (useState/useContext) para gerenciamento de estado
- Dados mockados em memória (sem back-end nesta fase)

## Como clonar e rodar o projeto

### 1. Clonar o repositório

```bash
git clone https://github.com/Igorarauj001/PetShop.git
cd PetShop
```

### 2. Instalar as dependências

```bash
npm install
```

### 3. Rodar o projeto

```bash
npx expo start
```

Vai aparecer um QR code no terminal. Você pode abrir o app de três formas:

- **Celular:** instale o app **Expo Go** (Android/iOS) e escaneie o QR code. O celular precisa estar na **mesma rede Wi-Fi** do computador.
- **Navegador:** aperte `w` no terminal.
- **Emulador Android:** aperte `a` (precisa ter um emulador configurado).

Se o Wi-Fi bloquear a conexão direta entre o celular e o computador (comum em redes de faculdade), use:
```bash
npx expo start --tunnel
```

### 4. Credenciais de teste (login)

Existe um usuário mock pré-cadastrado para testes rápidos:
- **Login:** `teste@petfacil.com`
- **Senha:** `123456`

Também é possível criar uma conta nova pela tela de Cadastro.

## Estrutura de pastas
screens/ -> Telas do app (Login, Cadastro, Produtos, Carrinho, etc.)
utils/ -> Funções auxiliares e dados mockados
App.js -> Ponto de entrada, configuração das rotas

## Observações importantes

- **Este projeto usa React Navigation, não Expo Router.** Se o `npx create-expo-app` for usado para recriar o ambiente do zero, o template padrão vem com `expo-router` instalado, que é **incompatível** com `@react-navigation/native` a partir do SDK 56. Caso isso aconteça, é necessário:
  1. `npm uninstall expo-router`
  2. Apagar a pasta `app/` gerada pelo router (se existir)
  3. No `app.json`: remover `"expo-router"` da lista de `plugins`, remover `"typedRoutes": true` de `experiments`, e trocar `"web": { "output": "static" }` para `"output": "single"`
  4. No `package.json`: garantir que `"main"` aponte para `"node_modules/expo/AppEntry.js"` (não `"expo-router/entry"`)
  5. Rodar `npx expo start -c` para limpar o cache

- Todos os dados (usuários, produtos, compras) são armazenados **em memória**, apenas durante a execução do app — nada é salvo entre reinícios. Isso é esperado na Fase 1 do projeto.

- A Fase 2 vai adicionar back-end real, banco de dados, autenticação com token e senhas criptografadas.


