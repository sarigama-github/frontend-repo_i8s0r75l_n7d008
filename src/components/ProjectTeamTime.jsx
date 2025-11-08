import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Pause, Play, Square } from 'lucide-react';

function fmt(ms) {
  const total = Math.floor(ms / 1000);
  const h = String(Math.floor(total / 3600)).padStart(2, '0');
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, '0');
  const s = String(total % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export default function ProjectTeamTime() {
  // Dummy data
  const projects = useMemo(
    () => [
      { id: 1, title: 'Payment Gateway', owner: 'Alex', status: 'completed', dueDate: '2025-11-20' },
      { id: 2, title: 'Mobile App', owner: 'Rina', status: 'running', dueDate: '2025-12-02' },
      { id: 3, title: 'Marketing Site', owner: 'Ken', status: 'pending', dueDate: '2025-11-12' },
      { id: 4, title: 'Data Lake', owner: 'Sam', status: 'running', dueDate: '2026-01-05' },
    ],
    []
  );

  const team = [
    { name: 'Alex', role: 'PM', avatar: 'https://i.pravatar.cc/40?img=9', taskStatus: 'Completed' },
    { name: 'Rina', role: 'Engineer', avatar: 'https://i.pravatar.cc/40?img=5', taskStatus: 'In Progress' },
    { name: 'Ken', role: 'Designer', avatar: 'https://i.pravatar.cc/40?img=11', taskStatus: 'Stuck' },
    { name: 'Sam', role: 'Data', avatar: 'https://i.pravatar.cc/40?img=15', taskStatus: 'In Progress' },
  ];

  const [state, setState] = useState(() => {
    const raw = localStorage.getItem('timer');
    return raw ? JSON.parse(raw) : { running: false, startAt: 0, elapsed: 0 };
  });
  const tickRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('timer', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    if (state.running) {
      tickRef.current = setInterval(() => {
        setState((s) => ({ ...s, elapsed: s.elapsed + 1000 }));
      }, 1000);
    } else if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
    return () => tickRef.current && clearInterval(tickRef.current);
  }, [state.running]);

  const onPlayPause = () => {
    setState((s) => ({ ...s, running: !s.running, startAt: Date.now() }));
  };
  const onStop = () => setState({ running: false, startAt: 0, elapsed: 0 });

  const chip = (status) => {
    const map = {
      completed: 'bg-green-500/10 text-green-400',
      running: 'bg-blue-500/10 text-blue-400',
      pending: 'bg-yellow-500/10 text-yellow-400',
    };
    return <span className={`text-xs px-2 py-1 rounded-lg ${map[status]}`}>{status}</span>;
  };

  return (
    <section className="grid grid-cols-1 xl:grid-cols-12 gap-4 xl:gap-6">
      <div className="xl:col-span-7 rounded-2xl bg-[#0f172a] border border-white/10 p-4">
        <h3 className="text-slate-100 font-semibold">Project List</h3>
        <div className="mt-4 space-y-2">
          {projects.map((p) => (
            <div key={p.id} className="rounded-xl bg-white/5 p-3 flex items-center justify-between">
              <div>
                <div className="text-slate-200 font-medium">{p.title}</div>
                <div className="text-slate-400 text-sm">Owner: {p.owner} • Due {p.dueDate}</div>
              </div>
              {chip(p.status)}
            </div>
          ))}
        </div>
      </div>

      <div className="xl:col-span-5 rounded-2xl bg-[#0f172a] border border-white/10 p-4">
        <h3 className="text-slate-100 font-semibold">Team Collaboration</h3>
        <ul className="mt-4 space-y-3">
          {team.map((m) => (
            <li key={m.name} className="rounded-xl bg-white/5 p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img src={m.avatar} alt="" className="h-9 w-9 rounded-lg" />
                <div>
                  <div className="text-slate-200 font-medium">{m.name}</div>
                  <div className="text-slate-400 text-xs">{m.role}</div>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-lg ${
                m.taskStatus === 'Completed'
                  ? 'bg-green-500/10 text-green-400'
                  : m.taskStatus === 'In Progress'
                  ? 'bg-blue-500/10 text-blue-400'
                  : 'bg-red-500/10 text-red-400'
              }`}>{m.taskStatus}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="xl:col-span-7 rounded-2xl bg-[#0f172a] border border-white/10 p-4">
        <h3 className="text-slate-100 font-semibold">Time Tracker</h3>
        <div className="mt-4 flex items-center justify-between bg-white/5 rounded-xl p-4">
          <div className="text-3xl font-semibold text-slate-100" aria-live="polite">{fmt(state.elapsed)}</div>
          <div className="flex items-center gap-2">
            <button onClick={onPlayPause} className="rounded-xl px-3 py-2 bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              {state.running ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
            </button>
            <button onClick={onStop} className="rounded-xl px-3 py-2 bg-white/10 text-white hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              <Square className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="xl:col-span-5 rounded-2xl bg-[#0f172a] border border-white/10 p-4">
        <h3 className="text-slate-100 font-semibold">Project Progress</h3>
        <div className="mt-4 grid place-items-center">
          <svg viewBox="0 0 100 50" className="w-full max-w-sm">
            <defs>
              <linearGradient id="g" x1="0" x2="1">
                <stop offset="0%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#22c55e" />
              </linearGradient>
            </defs>
            <path d="M10 50 A40 40 0 1 1 90 50" fill="none" stroke="#1f2937" strokeWidth="10" strokeLinecap="round" />
            <path d="M10 50 A40 40 0 1 1 90 50" fill="none" stroke="url(#g)" strokeWidth="10" strokeLinecap="round" strokeDasharray="180" strokeDashoffset="106" />
            <text x="50" y="40" textAnchor="middle" className="fill-slate-200 text-[10px]">41% Project Ended</text>
          </svg>
          <div className="mt-2 text-slate-400 text-sm">Completed • Running • Pending</div>
        </div>
      </div>
    </section>
  );
}
