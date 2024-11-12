<h1 align="center">Template do Frontend da Empresa Aupi Soluções em TI</h1>

<p align="center" display="inline-block">
  <img src="https://img.shields.io/github/contributors/aupigit/aupi-web-frontend-boilerplate?style=for-the-badge"/>
  <img src="https://img.shields.io/github/issues/aupigit/aupi-web-frontend-boilerplate?style=for-the-badge"/>
  <img src="https://img.shields.io/github/forks/aupigit/aupi-web-frontend-boilerplate?style=for-the-badge"/>
  <img src="https://img.shields.io/github/stars/aupigit/aupi-web-frontend-boilerplate?style=for-the-badge"/>
  <img src="https://img.shields.io/github/license/aupigit/aupi-web-frontend-boilerplate?style=for-the-badge"/>
  <img src="https://img.shields.io/github/languages/top/aupigit/aupi-web-frontend-boilerplate?style=for-the-badge&logo=typescript"/>
</p>

<div align="center"> 
  <img src="./src/public/aupi_logo.jpeg">
</div>

<br>

<h3 align="center">Bem-vindo ao projeto de frontend da Empresa Aupi Soluções em TI! Este repositório serve como um template padrão para projetos de frontend, seguindo as melhores práticas e utilizando tecnologias modernas.</h3>

<hr>

### Visão Geral

Este projeto tem como objetivo fornecer uma estrutura inicial robusta e escalável para desenvolvimento frontend, adequada para aplicações web e mobile da Empresa.

### Tecnologias principais

<p align="left">
<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/axios-671ddf?&style=for-the-badge&logo=axios&logoColor=white"/>
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/>
<img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
<img src="https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white"/>
<img src="https://img.shields.io/badge/ReactQuery-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"/>
<img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white"/>
<img src="https://img.shields.io/badge/Eslint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white"/>
<img src="https://img.shields.io/badge/Postcss-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white"/>
<img src="https://img.shields.io/badge/ReactHookForm-EC5990?style=for-the-badge&logo=react-hook-form&logoColor=white"/>
</p>

### Estrutura de Diretórios

```bash
| .github/                 # Configurações específicas do GitHub (CI/CD, templates de issues, etc.)
| .husky/                  # Hooks do Husky para Git (pré-commit, etc.)
| assets/                  # Assets da aplicação (imagens, fontes, etc.)
| src/                     # Código-fonte da aplicação
|    |-- app/              # Componente principal da aplicação ou ponto de entrada
|    |-- components/       # Componentes reutilizáveis da aplicação
|    |-- contexts/         # Contextos do React para gerenciamento de estado global
|    |-- errors/           # Tratamento de erros da aplicação
|    |-- hooks/            # Hooks customizados do React
|    |-- interfaces/       # Interfaces TypeScript para tipagem
|    |-- layout/           # Componentes de layout da aplicação
|    |-- lib/              # Bibliotecas ou utilidades compartilhadas
|    |-- providers/        # Provedores de contexto ou serviços
|    |-- public/           # Arquivos públicos (index.html, robots.txt, etc.)
|    |-- services/         # Integrações com serviços externos (APIs, serviços de terceiros)
|    |-- styles/           # Estilos globais ou variáveis para CSS (Sass, CSS-in-JS, etc.)
|    |-- test/             # Configurações e utilidades de teste
|    |-- utils/            # Funções utilitárias ou helpers
| .env                     # Variáveis de ambiente (configurações locais, chaves de API, etc.)
| package.json             # Lista de dependências e scripts do projeto
| .eslintrc.json           # Configurações do ESLint para linting de código
| pnpm-lock.yaml           # Lock file para gerenciamento de dependências com pnpm
| tsconfig.json            # Configurações do TypeScript (se aplicável)
| .gitignore               # Arquivos e diretórios ignorados pelo Git
| .prettierrc              # Configurações do Prettier para formatação de código
| components.json          # Configurações ou metadados específicos de componentes (se aplicável)
| jest.config.js           # Configurações do Jest para testes unitários
| jest.setup.js            # Arquivo de setup do Jest
| next.config.mjs          # Configurações específicas do Next.js (se aplicável)
| playwright.config.ts     # Configurações do Playwright para testes de integração (se aplicável)
| postcss.config.js        # Configurações do PostCSS para transformação de CSS (se aplicável)
| tailwind.config.ts       # Configurações do Tailwind CSS (se aplicável)
```

### Configuração do Ambiente de Desenvolvimento

1. Clone o repositório
2. Instale as dependências usando npm ou pnpm:
```bash
npm install
pnpm install
```
3. Inicie o servidor de desenvolvimento:
```bash
npm start
pnpm start
```

### Scripts Disponíveis
- **start**: Inicia o servidor de desenvolvimento.
- **build**: Compila o projeto para produção.
- **test**: Executa os testes unitários.
- **lint**: Executa o ESLint para verificar e corrigir problemas no código.

### Contribuição

Contribuições são bem-vindas! Para sugestões, melhorias ou correções de bugs, por favor abra uma issue ou envie um pull request.

### Licença

Este projeto está licenciado sob a Licença MIT.
