import { ipcMain } from 'electron';
import { SQLiteNoteRepository } from '../repositories/SQLiteNoteRepository.js';
import { NoteService } from '../services/NoteService.js';

const service = new NoteService(new SQLiteNoteRepository());

export function registerNoteHandlers() {
  ipcMain.handle('notes:getAll',  ()               => service.getAllNotes());
  ipcMain.handle('notes:create',  (_, data)        => service.createNote(data));
  ipcMain.handle('notes:update',  (_, id, data)    => service.updateNote(id, data));
  ipcMain.handle('notes:delete',  (_, id)          => service.deleteNote(id));
}
