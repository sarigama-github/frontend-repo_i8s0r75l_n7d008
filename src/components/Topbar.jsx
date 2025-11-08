import React, { useEffect, useRef, useState } from 'react';
import { Bell, Inbox, Sun, Moon, Search, ChevronDown, PlusCircle, Upload } from 'lucide-react';

export default function Topbar({ onOpenAdd, onOpenImport }) {
  const [dark, setDark] = useState(true);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('theme:dark');
    const isDark = saved !== '0';
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  useEffect(() => {
    function onDocClick(e) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme:dark', next ? '1' : '0');
  };

  return (
    <header className="sticky top-0 z-30 backdrop-blur bg-[#0b1220]/70 border-b border-white/10">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
        <div className="relative flex-1">
          <label htmlFor="global-search" className="sr-only">Search</label>
          <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            id="global-search"
            type="search"
            placeholder="Search..."
            className="w-full bg-[#0f172a] text-slate-200 placeholder-slate-500 rounded-xl pl-10 pr-14 py-2 border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label="Search"
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-500">⌘K</div>
        </div>

        <button onClick={onOpenAdd} className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-blue-600 text-white px-3 py-2 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
          <PlusCircle className="h-4 w-4" /> Add Project
        </button>
        <button onClick={onOpenImport} className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-white/5 text-slate-200 px-3 py-2 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
          <Upload className="h-4 w-4" /> Import Data
        </button>

        <button className="rounded-xl p-2 text-slate-300 hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </button>
        <button className="rounded-xl p-2 text-slate-300 hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" aria-label="Inbox">
          <Inbox className="h-5 w-5" />
        </button>
        <button onClick={toggleTheme} className="rounded-xl p-2 text-slate-300 hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" aria-label="Toggle theme">
          {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        <div className="relative" ref={menuRef}>
          <button onClick={() => setOpen((o) => !o)} className="inline-flex items-center gap-2 rounded-xl bg-white/5 px-2 py-1.5 border border-white/10 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" aria-haspopup="menu" aria-expanded={open}>
            <img src="https://i.pravatar.cc/40?img=9" alt="User avatar" className="h-7 w-7 rounded-lg" />
            <span className="hidden md:inline text-slate-200 text-sm">Alex</span>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
          {open && (
            <div role="menu" className="absolute right-0 mt-2 w-48 rounded-xl bg-[#0f172a] border border-white/10 shadow-lg p-1">
              <button role="menuitem" className="w-full text-left px-3 py-2 text-sm text-slate-200 rounded-lg hover:bg-white/5">Profile</button>
              <button role="menuitem" className="w-full text-left px-3 py-2 text-sm text-slate-200 rounded-lg hover:bg-white/5">Preferences</button>
              <button role="menuitem" className="w-full text-left px-3 py-2 text-sm text-red-300 rounded-lg hover:bg-white/5">Sign out</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
