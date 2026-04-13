import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDb } from './db.js';
import { registerTaskHandlers } from './ipc/taskHandlers.js';
import { registerNoteHandlers } from './ipc/noteHandlers.js';

// ESM doesn't have __dirname — reconstruct it from import.meta.url.
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// In dev, Vite runs a hot-reload server. In prod, we serve the built bundle.
const isDev = process.env.NODE_ENV !== 'production';

// Preload path computed once at startup.
const preloadPath = path.join(__dirname, '../preload.cjs');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    title: 'Notes & Todos',
    webPreferences: {
      // Security baseline: renderer has no access to Node APIs.
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      preload: preloadPath,
    },
  });

  if (isDev) {
    win.loadURL('http://localhost:5173');
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, '../../dist/renderer/index.html'));
  }
}

app.whenReady().then(() => {
  // DB must be open before handlers are registered so tables exist.
  getDb();
  registerTaskHandlers();
  registerNoteHandlers();
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
