<p align="center">
  <img src="URL_DO_SEU_LOGO" width="150" alt="Logo Orçamento Familiar">
</p>

<h1 align="center">Orçamento Familiar Electron</h1>

<p align="center">
  <strong>Um aplicativo desktop simples e eficaz para gerenciar suas finanças pessoais.</strong>
  <br>
  Controle suas receitas, despesas e metas financeiras de forma local e segura.
</p>

<p align="center">
  <img src="https://img.shields.io/github/license/seu-usuario/orcamento-familiar-electron?style=for-the-badge" alt="Licença">
  <img src="https://img.shields.io/badge/versão-1.0.0-blue?style=for-the-badge" alt="Versão">
  <img src="https://img.shields.io/badge/electron-^28.0.0-blueviolet?style=for-the-badge" alt="Electron">
</p>

<br>

<p align="center">
  <img src="URL_DO_SEU_SCREENSHOT.png" alt="Demonstração do Aplicativo Orçamento Familiar" width="700">
</p>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [🚀 Funcionalidades](#-funcionalidades)
- [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [⚙️ Instalação e Execução](#️-instalação-e-execução)
- [📂 Estrutura do Projeto](#-estrutura-do-projeto)
- [🤝 Como Contribuir](#-como-contribuir)
- [📄 Licença](#-licença)

---

## 📝 Sobre o Projeto

O **Orçamento Familiar Electron** é um aplicativo desktop de código aberto, desenvolvido para simplificar o controle financeiro pessoal. Com ele, você pode cadastrar suas receitas e despesas, definir metas de economia e visualizar seu progresso através de gráficos intuitivos, tudo armazenado localmente no seu computador para garantir sua privacidade.

---

## 🚀 Funcionalidades

- ✅ **Cadastro Completo:** Registre receitas, despesas e metas financeiras.
- 📊 **Visualização Gráfica:** Gráficos mensais (via Chart.js) para uma análise clara das suas finanças.
- 🔎 **Filtros Avançados:** Filtre despesas por categoria e período.
- 📄 **Relatórios Simples:** Gere relatórios de despesas por categoria ou mês.
- 💻 **Interface Moderna:** Interface limpa, intuitiva e responsiva.
- 🔒 **Banco de Dados Local:** Utiliza SQLite para armazenamento seguro e local dos seus dados.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

- **[Electron](https://www.electronjs.org/):** Framework para criar aplicativos desktop com JavaScript, HTML e CSS.
- **[Node.js](https://nodejs.org/):** Ambiente de execução para o JavaScript no backend.
- **[SQLite3](https://www.sqlite.org/index.html):** Biblioteca para interação com o banco de dados SQLite.
- **[Chart.js](https://www.chartjs.org/):** Biblioteca para a criação de gráficos interativos.
- **HTML5, CSS3 e JavaScript:** Tecnologias web padrão para a construção da interface.

---

## ⚙️ Instalação e Execução

Siga os passos abaixo para executar o projeto em seu ambiente de desenvolvimento.

### Pré-requisitos

- **[Node.js](https://nodejs.org/)** (versão LTS recomendada)
- **NPM** (geralmente instalado com o Node.js)

> **⚠️ Atenção usuários Windows:** A instalação do `sqlite3` pode falhar caso você não tenha as ferramentas de build necessárias. Para resolver isso, instale o `windows-build-tools` executando o seguinte comando em um terminal com privilégios de administrador:
> ```bash
> npm install --global windows-build-tools
> ```
> Para mais detalhes, consulte a documentação do [node-gyp](https://github.com/nodejs/node-gyp#on-windows).

### Passos

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/orcamento-familiar-electron.git](https://github.com/seu-usuario/orcamento-familiar-electron.git)
    cd orcamento-familiar-electron
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Execute o aplicativo:**
    ```bash
    npm start
    ```
    Após a execução, a janela principal do aplicativo será aberta.

---

## 📂 Estrutura do Projeto

A estrutura de arquivos e pastas do projeto está organizada da seguinte forma:
