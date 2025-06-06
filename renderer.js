function carregarTela(tela) {
  fetch(`views/${tela}.html`)
    .then(res => res.text())
    .then(html => {
      document.getElementById("conteudo").innerHTML = html;
      if (window[tela + "Init"]) {
        window[tela + "Init"](); // inicializar JS da tela
      }
    });
}

// Carrega a tela de resumo por padrão
window.onload = () => {
  carregarTela("resumo");
};
