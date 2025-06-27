# Backend Service - GraphQL API

Este é um servidor GraphQL que fornece dados sobre galáxias.

## 📋 Pré-requisitos

Antes de executar o serviço, certifique-se de ter instalado:

- **Node.js** (versão 14 ou superior)
- **npm** (gerenciador de pacotes do Node.js)

### Verificando a instalação

```bash
node --version
npm --version
```

## 🚀 Como executar o serviço

### Passo 1: Navegar para o diretório do backend

```bash
cd backend
```

### Passo 2: Instalar as dependências

```bash
npm install
```

### Passo 3: Executar o servidor

```bash
npm start
```

### Passo 4: Verificar se o servidor está rodando

Após a execução, você verá a mensagem:

```
🚀  Mock GraphQL server ready at http://localhost:4000
```

## 🌐 Acessando a API

### GraphQL Playground

Acesse o GraphQL Playground em: `http://localhost:4000`

O GraphQL Playground é uma interface interativa onde você pode:

- Testar queries e mutations
- Visualizar a documentação da API
- Explorar o schema GraphQL

## 📊 Schema GraphQL

### Tipos disponíveis

#### Item

```graphql
type Item {
  id: ID!
  name: String!
  image: String!
  description: String!
  details: String!
  stars: [String]
}
```

### Queries disponíveis

#### Buscar itens com filtros

```graphql
query GetItems($search: String, $offset: Int, $limit: Int) {
  items(search: $search, offset: $offset, limit: $limit) {
    id
    name
    image
    description
    details
    stars
  }
}
```

#### Buscar item por ID

```graphql
query GetItem($id: ID!) {
  item(id: $id) {
    id
    name
    image
    description
    details
    stars
  }
}
```

## 🔧 Exemplos de uso

### Exemplo 1: Buscar todas as galáxias

```graphql
query {
  items {
    id
    name
    description
  }
}
```

### Exemplo 2: Buscar galáxias com paginação

```graphql
query {
  items(offset: 0, limit: 10) {
    id
    name
    image
  }
}
```

### Exemplo 3: Buscar galáxias por nome

```graphql
query {
  items(search: "Andromeda") {
    id
    name
    description
    stars
  }
}
```

### Exemplo 4: Buscar galáxia específica

```graphql
query {
  item(id: "1") {
    id
    name
    image
    description
    details
    stars
  }
}
```

## 🛠️ Estrutura do projeto

```
backend/
├── server.js      # Servidor principal
├── MOCK.js        # Dados mock das galáxias
├── package.json   # Dependências e scripts
└── README.md      # Este arquivo
```

## 🔍 Solução de problemas

### Porta já em uso

Se a porta 4000 estiver ocupada, você pode modificar o arquivo `server.js` e alterar a porta:

```javascript
server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`🚀  Mock GraphQL server ready at ${url}`);
});
```

### Erro de dependências

Se houver problemas com as dependências:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Verificar se o servidor está rodando

```bash
curl http://localhost:4000
```

## 📝 Notas importantes

- Este é um servidor de desenvolvimento com dados mock
- Os dados são carregados do arquivo `MOCK.js`
- O servidor suporta busca por nome e paginação
- Todas as queries são executadas em memória

## 🚪 Parando o servidor

Para parar o servidor, pressione `Ctrl + C` no terminal onde o servidor está rodando.
