import { useRef, useState } from 'react';

interface Props {
  onTitleTap: () => void;
  onTitleLongPress: () => void;
}

const DEFAULT_NOTES = [
  { id: 1, title: 'Shopping list', preview: 'Milk, eggs, bread, pasta...', date: 'Today' },
  { id: 2, title: 'Meeting notes', preview: 'Discuss Q4 targets, budget review', date: 'Yesterday' },
  { id: 3, title: 'Gym routine', preview: 'Mon: chest/tri, Wed: back/bi...', date: 'Mon' },
  { id: 4, title: 'Book recommendations', preview: 'Atomic Habits, The Lean Startup...', date: 'Sun' },
];

export function NotesTheme({ onTitleTap, onTitleLongPress }: Props) {
  const [notes] = useState(DEFAULT_NOTES);
  const longPressTimer = useRef<ReturnType<typeof setTimeout>>();

  return (
    <div className="min-h-screen bg-amber-50">
      <div
        className="bg-amber-50 px-4 pt-14 pb-3 border-b border-amber-200 cursor-default select-none"
        onClick={onTitleTap}
        onPointerDown={() => { longPressTimer.current = setTimeout(onTitleLongPress, 2000); }}
        onPointerUp={() => clearTimeout(longPressTimer.current)}
        onPointerLeave={() => clearTimeout(longPressTimer.current)}
      >
        <h1 className="text-2xl font-bold text-amber-900">Notes</h1>
        <p className="text-amber-600 text-xs mt-1">{notes.length} notes</p>
      </div>

      <div className="px-4 pt-3">
        <input
          readOnly
          placeholder="Search"
          className="w-full bg-amber-100 rounded-xl px-4 py-2 text-amber-800 text-sm mb-3 focus:outline-none"
        />
      </div>

      <div className="divide-y divide-amber-100">
        {notes.map(n => (
          <div key={n.id} className="px-4 py-3">
            <div className="flex justify-between items-baseline mb-0.5">
              <span className="font-semibold text-amber-950 text-sm">{n.title}</span>
              <span className="text-amber-400 text-xs ml-2 shrink-0">{n.date}</span>
            </div>
            <p className="text-amber-700 text-xs truncate">{n.preview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
