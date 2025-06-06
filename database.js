const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbFolder = path.join(__dirname, 'assets');
if (!fs.existsSync(dbFolder)) {
  fs.mkdirSync(dbFolder);
}

const dbPath = path.join(dbFolder, 'orcamento_familiar.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Erro ao abrir o banco de dados:", err.message);
  }
});

// Criar tabelas (só uma vez)
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS receitas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL,
      valor REAL NOT NULL,
      data TEXT NOT NULL
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS despesas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL,
      valor REAL NOT NULL,
      data TEXT NOT NULL,
      categoria TEXT NOT NULL
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS metas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      descricao TEXT NOT NULL,
      valor REAL NOT NULL,
      valor_atual REAL DEFAULT 0
    )
  `);
});

module.exports = db;
