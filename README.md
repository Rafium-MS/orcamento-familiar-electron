# Orçamento Familiar Electron

Aplicativo desktop desenvolvido em Electron para gerenciar receitas, despesas e metas financeiras pessoais. Utiliza SQLite como banco de dados local e Chart.js para gráficos de receitas e despesas.

---

## 🚀 Funcionalidades

✅ Cadastro de receitas, despesas e metas  
✅ Filtro de despesas por categoria  
✅ Gráficos mensais de receitas e despesas  
✅ Relatórios de despesas por categoria/mês  
✅ Interface moderna e responsiva  
✅ Banco de dados local SQLite

---

## 🛠️ Tecnologias Utilizadas

- Electron
- Node.js
- SQLite3
- Chart.js
- HTML, CSS e JavaScript

---

## 📦 Instalação

1️⃣ Clone o repositório:
```bash
git clone https://github.com/seu-usuario/orcamento-familiar-electron.git
cd orcamento-familiar-electron

2️⃣ Instale as dependências:

```bash
npm install

3️⃣ (Opcional) Se estiver no Windows e o banco não abrir, certifique-se de que a pasta assets exista (ela é criada automaticamente, mas você pode criar manualmente se necessário).

▶️ Executar o Aplicativo
bash
npm start
O Electron irá abrir a janela principal com o dashboard do Orçamento Familiar.

📚 Estrutura do Projeto
bash
Copiar
Editar
orcamento-familiar-electron/
├── assets/                 # Banco de dados SQLite
├── styles/
│   └── style.css           # Arquivo de estilos
├── views/
│   ├── despesas.html
│   ├── receitas.html
│   ├── metas.html
│   └── resumo.html
├── main.js                 # Processo principal Electron
├── preload.js              # Comunicação segura com o renderer
├── database.js             # Criação e conexão com SQLite
├── index.html              # Página principal (tabs)
├── renderer.js             # Gerencia navegação entre abas
├── package.json            # Configuração do projeto
└── README.md               # Este arquivo
⚠️ Problemas Conhecidos
O sqlite3 pode falhar na instalação se você não tiver o Visual Studio Build Tools ou o Windows SDK no Windows.
➡️ Para resolver, siga a documentação do node-gyp.

👥 Contribuição
Contribuições são bem-vindas! Abra uma issue ou envie um pull request. 😊

📄 Licença
Este projeto está licenciado sob a Licença MIT.

"# orcamento-familiar-electron" 
