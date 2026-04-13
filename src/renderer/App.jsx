import { useState } from 'react';
import { TaskProvider } from './context/TaskContext.jsx';
import { NoteProvider } from './context/NoteContext.jsx';
import { Sidebar } from './components/Sidebar.jsx';
import { NoteList } from './components/notes/NoteList.jsx';
import { NoteGrid } from './components/notes/NoteGrid.jsx';
import { NoteEditor } from './components/notes/NoteEditor.jsx';
import { TaskList } from './components/tasks/TaskList.jsx';

export default function App() {
  const [activeView, setActiveView] = useState('notes');
  // noteView persists while switching between Notes and Tasks.
  const [noteView, setNoteView] = useState('list');
  const [taskView, setTaskView] = useState('list');

  return (
    <TaskProvider>
      <NoteProvider>
        <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
          <Sidebar activeView={activeView} onViewChange={setActiveView} />

          {activeView === 'notes' ? (
            noteView === 'list' ? (
              // List mode: narrow sidebar + flex-1 editor (original layout)
              <>
                <aside className="w-56 shrink-0 border-r border-gray-800 flex flex-col bg-gray-900">
                  <NoteList view={noteView} onViewChange={setNoteView} />
                </aside>
                <main className="flex-1 flex flex-col overflow-hidden bg-gray-900">
                  <NoteEditor />
                </main>
              </>
            ) : (
              // Grid mode: flex-1 grid + fixed-width editor
              <>
                <div className="flex-1 flex flex-col overflow-hidden bg-gray-900 border-r border-gray-800">
                  <NoteGrid view={noteView} onViewChange={setNoteView} />
                </div>
                <aside className="w-96 shrink-0 flex flex-col overflow-hidden bg-gray-900">
                  <NoteEditor />
                </aside>
              </>
            )
          ) : (
            <main className="flex-1 overflow-hidden bg-gray-900 flex flex-col">
              <TaskList view={taskView} onViewChange={setTaskView} />
            </main>
          )}
        </div>
      </NoteProvider>
    </TaskProvider>
  );
}
