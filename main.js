// main.js revisado para sqlite3 (assíncrono)

const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const db = require("./database");


// ================ BrowserWindow ===================
function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true
    }
  });

  win.loadFile("index.html");
}

// Cria a janela principal
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// ================== DESPESAS ==================
ipcMain.on("adicionar-despesa", (evento, dados) => {
  const stmt = `INSERT INTO despesas (descricao, valor, data, categoria) VALUES (?, ?, ?, ?)`;
  db.run(stmt, [dados.descricao, dados.valor, dados.data, dados.categoria], (err) => {
    if (err) {
      console.error(err);
    } else {
      enviarDespesas(evento);
    }
  });
});

ipcMain.on("carregar-despesas", (evento, categoria) => {
  enviarDespesas(evento, categoria);
});

function enviarDespesas(evento, categoria = "Todas") {
  let query = "SELECT * FROM despesas ORDER BY data DESC";
  let params = [];
  if (categoria !== "Todas") {
    query = "SELECT * FROM despesas WHERE categoria = ? ORDER BY data DESC";
    params.push(categoria);
  }
  db.all(query, params, (err, rows) => {
    if (err) {
      console.error(err);
    } else {
      evento.sender.send("despesas-atualizadas", rows);
    }
  });
}

// ================== RECEITAS ==================
ipcMain.on("adicionar-receita", (evento, dados) => {
  const stmt = `INSERT INTO receitas (descricao, valor, data) VALUES (?, ?, ?)`;
  db.run(stmt, [dados.descricao, dados.valor, dados.data], (err) => {
    if (err) {
      console.error(err);
    } else {
      enviarReceitas(evento);
    }
  });
});

ipcMain.on("carregar-receitas", (evento) => {
  enviarReceitas(evento);
});

function enviarReceitas(evento) {
  db.all("SELECT * FROM receitas ORDER BY data DESC", [], (err, rows) => {
    if (err) {
      console.error(err);
    } else {
      evento.sender.send("receitas-atualizadas", rows);
    }
  });
}

// ================== METAS ==================
ipcMain.on("adicionar-ou-atualizar-meta", (evento, dados) => {
  const selectStmt = `SELECT id FROM metas WHERE descricao = ?`;
  db.get(selectStmt, [dados.descricao], (err, row) => {
    if (err) {
      console.error(err);
    } else if (row) {
      const updateStmt = `UPDATE metas SET valor = ?, valor_atual = ? WHERE descricao = ?`;
      db.run(updateStmt, [dados.valor, dados.valor_atual, dados.descricao], (err) => {
        if (err) console.error(err);
        else enviarMetas(evento);
      });
    } else {
      const insertStmt = `INSERT INTO metas (descricao, valor, valor_atual) VALUES (?, ?, ?)`;
      db.run(insertStmt, [dados.descricao, dados.valor, dados.valor_atual], (err) => {
        if (err) console.error(err);
        else enviarMetas(evento);
      });
    }
  });
});

ipcMain.on("carregar-metas", (evento) => {
  enviarMetas(evento);
});

function enviarMetas(evento) {
  db.all("SELECT * FROM metas", [], (err, rows) => {
    if (err) {
      console.error(err);
    } else {
      evento.sender.send("metas-atualizadas", rows);
    }
  });
}

// ================== RESUMO ==================
ipcMain.on("carregar-resumo", (evento) => {
  db.get("SELECT SUM(valor) AS total FROM receitas", [], (err, rowReceitas) => {
    const receitas = rowReceitas?.total || 0;
    db.get("SELECT SUM(valor) AS total FROM despesas", [], (err, rowDespesas) => {
      const despesas = rowDespesas?.total || 0;
      const saldo = receitas - despesas;
      evento.sender.send("resumo-atualizado", {
        receitas,
        despesas,
        saldo
      });
    });
  });
});

// ================== GRÁFICO MENSAL ==================
ipcMain.on("carregar-grafico", (evento) => {
  const receitasPorMes = {};
  const despesasPorMes = {};

  db.all("SELECT data, valor FROM receitas", [], (err, rowsReceitas) => {
    if (err) {
      console.error(err);
      return;
    }

    rowsReceitas.forEach((r) => {
      const mes = r.data.substring(0, 7);
      receitasPorMes[mes] = (receitasPorMes[mes] || 0) + r.valor;
    });

    db.all("SELECT data, valor FROM despesas", [], (err, rowsDespesas) => {
      if (err) {
        console.error(err);
        return;
      }

      rowsDespesas.forEach((d) => {
        const mes = d.data.substring(0, 7);
        despesasPorMes[mes] = (despesasPorMes[mes] || 0) + d.valor;
      });

      const todosOsMeses = Array.from(new Set([...Object.keys(receitasPorMes), ...Object.keys(despesasPorMes)])).sort();
      const mesesFormatados = todosOsMeses.map(mes => {
        const [ano, mesNum] = mes.split("-");
        return `${mesNum}/${ano}`;
      });

      const receitasArray = todosOsMeses.map(mes => receitasPorMes[mes] || 0);
      const despesasArray = todosOsMeses.map(mes => despesasPorMes[mes] || 0);

      evento.sender.send("grafico-atualizado", {
        meses: mesesFormatados,
        receitas: receitasArray,
        despesas: despesasArray
      });
    });
  });
});

// ================== RELATÓRIO POR CATEGORIA ==================
ipcMain.on("carregar-relatorio-categoria", (evento) => {
  db.all("SELECT data, valor, categoria FROM despesas", [], (err, rowsDespesas) => {
    if (err) {
      console.error(err);
      return;
    }

    const dados = {};
    rowsDespesas.forEach((d) => {
      const mes = d.data.substring(0, 7);
      if (!dados[mes]) dados[mes] = {};
      if (!dados[mes][d.categoria]) dados[mes][d.categoria] = 0;
      dados[mes][d.categoria] += d.valor;
    });

    const meses = Object.keys(dados).sort().map(mes => {
      const [ano, mesNum] = mes.split("-");
      return `${mesNum}/${ano}`;
    });

    const categorias = Array.from(new Set(rowsDespesas.map(d => d.categoria)));

    const valores = {};
    categorias.forEach(cat => {
      valores[cat] = meses.map((mesLabel, index) => {
        const mesKey = Object.keys(dados).sort()[index];
        return dados[mesKey] && dados[mesKey][cat] ? dados[mesKey][cat] : 0;
      });
    });

    evento.sender.send("relatorio-categoria-atualizado", {
      meses,
      categorias,
      valores
    });
  });
});
