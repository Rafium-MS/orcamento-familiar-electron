const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  enviar: (canal, dados) => ipcRenderer.send(canal, dados),
  receber: (canal, func) => ipcRenderer.on(canal, (evento, ...args) => func(...args))
});
