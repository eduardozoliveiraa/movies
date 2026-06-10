# CineStream

Catálogo responsivo de filmes e séries desenvolvido com Next.js. O projeto permite explorar títulos, consultar detalhes, pesquisar conteúdos e manter uma lista pessoal de favoritos.

## Funcionalidades

- Página inicial com destaques e carrosséis por categoria
- Catálogos separados de filmes e séries
- Busca por título
- Navegação por gêneros
- Páginas de detalhes com sinopse, avaliação, elenco e trailer
- Páginas individuais de atores e atrizes
- Lista de favoritos persistida no `localStorage`
- Menu responsivo para dispositivos móveis
- Dados de demonstração disponíveis sem configuração externa
- Integração opcional com a API do TMDB

## Tecnologias

- [Next.js](https://nextjs.org/) com App Router
- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- CSS Modules
- [Lucide React](https://lucide.dev/) para ícones
- [TMDB API](https://developer.themoviedb.org/docs/getting-started) para dados de filmes e séries

## Como executar

### Pré-requisitos

- Node.js 20 ou superior
- npm

### Instalação

```bash
git clone <url-do-repositorio>
cd filme
npm install
```

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_TMDB_API_KEY=sua_chave_do_tmdb
```

A chave é opcional. Quando ela não é informada, a aplicação utiliza um catálogo local de demonstração.

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o ambiente de desenvolvimento |
| `npm run build` | Gera a versão de produção |
| `npm run start` | Executa a versão de produção |
| `npm run lint` | Analisa o código com ESLint |

## Rotas principais

| Rota | Conteúdo |
| --- | --- |
| `/` | Destaques e categorias |
| `/movies` | Catálogo de filmes |
| `/tv` | Catálogo de séries |
| `/genres` | Lista de gêneros |
| `/genre/[id]` | Títulos de um gênero |
| `/search?q=termo` | Resultados da pesquisa |
| `/movie/[id]` | Detalhes de um filme |
| `/tv/[id]` | Detalhes de uma série |
| `/person/[id]` | Perfil e trabalhos de uma pessoa |
| `/my-list` | Títulos favoritos |

## Estrutura do projeto

```text
app/          Rotas, páginas e estilos globais
components/   Componentes reutilizáveis da interface
context/      Estado global dos favoritos
lib/          Integração com o TMDB e dados de demonstração
public/       Arquivos estáticos
```

## Build de produção

```bash
npm run build
npm run start
```

Os dados recebidos do TMDB são revalidados a cada hora. Os favoritos permanecem armazenados somente no navegador do usuário.
