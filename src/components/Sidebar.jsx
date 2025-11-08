import React, { useEffect, useMemo, useState } from 'react';
import {
  Home,
  CheckSquare,
  Calendar,
  BarChart2,
  Users,
  FileText,
  CreditCard,
  Package,
  Settings,
  HelpCircle,
  LogOut,
  Plus
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: Home },
  { label: 'Tasks', icon: CheckSquare },
  { label: 'Calendar', icon: Calendar },
  { label: 'Analytics', icon: BarChart2 },
  { label: 'Team', icon: Users },
  { label: 'Documents', icon: FileText },
  { label: 'Finance', icon: CreditCard },
  { label: 'Inventory', icon: Package },
];

const secondaryItems = [
  { label: 'Settings', icon: Settings },
  { label: 'Help / Support', icon: HelpCircle },
  { label: 'Logout', icon: LogOut },
];

export default function Sidebar({ collapsed, onToggle, onQuickNew }) {
  const [isCollapsed, setIsCollapsed] = useState(collapsed ?? false);

  useEffect(() => {
    const saved = localStorage.getItem('sidebar:collapsed');
    if (saved !== null) setIsCollapsed(saved === '1');
  }, []);

  useEffect(() => {
    localStorage.setItem('sidebar:collapsed', isCollapsed ? '1' : '0');
    onToggle?.(isCollapsed);
  }, [isCollapsed, onToggle]);

  const widthClass = isCollapsed ? 'w-20' : 'w-72';

  const Item = useMemo(
    () =>
      function Item({ item }) {
        const Icon = item.icon;
        return (
          <button
            className="group flex items-center gap-3 w-full px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label={item.label}
          >
            <Icon className="h-5 w-5 shrink-0" />
            {!isCollapsed && <span className="truncate">{item.label}</span>}
          </button>
        );
      },
    [isCollapsed]
  );

  return (
    <aside
      aria-label="Primary"
      className={`fixed inset-y-0 left-0 ${widthClass} transition-[width] duration-300 bg-[#0b1220] border-r border-white/10 flex flex-col z-40`}
    >
      <div className="flex items-center justify-between gap-2 px-3 py-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-blue-600/20 grid place-items-center ring-1 ring-white/10">
            <div className="h-3 w-3 rounded-sm bg-blue-500" />
          </div>
          {!isCollapsed && (
            <div className="leading-tight">
              <div className="text-sm text-slate-400">Flames</div>
              <div className="text-white font-semibold">OfficeOS</div>
            </div>
          )}
        </div>
        <button
          onClick={() => setIsCollapsed((s) => !s)}
          className="ml-auto rounded-xl px-3 py-2 text-slate-300 hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-pressed={isCollapsed}
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? '›' : '‹'}
        </button>
      </div>

      <div className="px-3 pb-3">
        <button
          onClick={onQuickNew}
          className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white px-3 py-2 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Create new"
        >
          <Plus className="h-5 w-5" />
          {!isCollapsed && <span>New</span>}
        </button>
      </div>

      <nav className="px-2 flex-1 overflow-y-auto">
        <div className="text-[10px] tracking-wider text-slate-500 px-2 py-2">GENERAL</div>
        <ul className="space-y-1" role="list">
          {navItems.map((it) => (
            <li key={it.label}>
              <Item item={it} />
            </li>
          ))}
        </ul>

        <div className="mt-6 border-t border-white/10" />
        <ul className="mt-3 space-y-1" role="list">
          {secondaryItems.map((it) => (
            <li key={it.label}>
              <Item item={it} />
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-3 mt-auto">
        <div className="rounded-2xl bg-gradient-to-br from-blue-600/15 to-indigo-700/20 ring-1 ring-white/10 p-3">
          <div className="text-sm text-white font-semibold">Get the app</div>
          <div className="text-xs text-slate-400">Work faster with our desktop app.</div>
          <button className="mt-2 w-full rounded-xl bg-white/10 text-white text-sm py-2 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
            Download
          </button>
        </div>
      </div>
    </aside>
  );
}
