// Aplicatia nativa 1911brain: o fereastra care deschide brain.danielbirtas.com.
// Creierul traieste pe server; asta e doar carcasa nativa (ca ChatGPT/Claude desktop).
const { app, BrowserWindow, shell } = require('electron');
const URL = 'https://brain.danielbirtas.com/';
function creeaza() {
  const win = new BrowserWindow({
    width: 1280, height: 860, minWidth: 760, minHeight: 560,
    title: '1911brain', backgroundColor: '#F2F4F8',
    webPreferences: { contextIsolation: true },
  });
  win.loadURL(URL);
  // linkurile externe se deschid in browserul normal, nu in aplicatie
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (!url.startsWith(URL)) { shell.openExternal(url); return { action: 'deny' }; }
    return { action: 'allow' };
  });
}
app.whenReady().then(() => {
  creeaza();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) creeaza(); });
});
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
