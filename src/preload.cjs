// Preload runs in a sandboxed context between main and renderer.
// contextBridge is the ONLY safe way to expose APIs — never use nodeIntegration.
// The .cjs extension is required because package.json sets "type":"module";
// Electron's sandboxed preload needs CJS to call require('electron').
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  tasks: {
    getAll:       ()            => ipcRenderer.invoke('tasks:getAll'),
    create:       (data)        => ipcRenderer.invoke('tasks:create', data),
    updateStatus: (id, status)  => ipcRenderer.invoke('tasks:updateStatus', id, status),
    delete:       (id)          => ipcRenderer.invoke('tasks:delete', id),
  },
  notes: {
    getAll:  ()          => ipcRenderer.invoke('notes:getAll'),
    create:  (data)      => ipcRenderer.invoke('notes:create', data),
    update:  (id, data)  => ipcRenderer.invoke('notes:update', id, data),
    delete:  (id)        => ipcRenderer.invoke('notes:delete', id),
  },
});
