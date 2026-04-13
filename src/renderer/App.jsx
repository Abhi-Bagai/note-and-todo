import { useState } from 'react';
import { TaskProvider } from './context/TaskContext.jsx';
import { NoteProvider } from './context/NoteContext.jsx';
import { Sidebar } from './components/Sidebar.jsx';
import { NoteList } from './components/notes/NoteList.jsx';
import { NoteEditor } from './components/notes/NoteEditor.jsx';
import { TaskList } from './components/tasks/TaskList.jsx';

export default function App() {
  const [activeView, setActiveView] = useState('notes');

  return (
    <TaskProvider>
      <NoteProvider>
        <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
          {/* Navigation rail */}
          <Sidebar activeView={activeView} onViewChange={setActiveView} />

          {/* Main content — swaps between Notes and Tasks */}
          {activeView === 'notes' ? (
            <>
              {/* Note list panel */}
              <aside className="w-56 shrink-0 border-r border-gray-800 flex flex-col bg-gray-900">
                <NoteList />
              </aside>

              {/* Note editor — fills remaining space */}
              <main className="flex-1 flex flex-col overflow-hidden bg-gray-900">
                <NoteEditor />
              </main>
            </>
          ) : (
            <main className="flex-1 overflow-hidden bg-gray-900">
              <TaskList />
            </main>
          )}
        </div>
      </NoteProvider>
    </TaskProvider>
  );
}
