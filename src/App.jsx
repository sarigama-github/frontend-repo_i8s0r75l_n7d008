import React, { useRef, useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import KPICards from './components/KPICards';
import AnalyticsReminders from './components/AnalyticsReminders';
import ProjectTeamTime from './components/ProjectTeamTime';
import Spline from '@splinetool/react-spline';

export default function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showMeet, setShowMeet] = useState(false);
  const dialogRef = useRef(null);

  return (
    <div className="min-h-screen bg-[#0b1220] text-slate-100">
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={setSidebarCollapsed}
        onQuickNew={() => setShowAdd(true)}
      />

      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'pl-20' : 'pl-72'}`}>
        <Topbar onOpenAdd={() => setShowAdd(true)} onOpenImport={() => setShowImport(true)} />

        <section className="relative">
          <div className="h-[320px] md:h-[380px] lg:h-[440px]">
            <Spline scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#0b1220]/40 to-[#0b1220]" />
          <div className="absolute inset-x-0 bottom-0">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-6">
              <h1 className="text-2xl md:text-3xl font-semibold">Internal Office Dashboard</h1>
              <p className="text-slate-400 max-w-2xl">Manage projects, collaborate with your team, track time, and see insights — all in one place.</p>
            </div>
          </div>
        </section>

        <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
          <KPICards />
          <AnalyticsReminders onStartMeeting={() => setShowMeet(true)} />
          <ProjectTeamTime />
        </main>
      </div>

      {showAdd && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center p-4" ref={dialogRef}>
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowAdd(false)} />
          <div className="relative w-full max-w-lg rounded-2xl bg-[#0f172a] border border-white/10 p-4">
            <h3 className="text-lg font-semibold">Add Project</h3>
            <form
              className="mt-4 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                if (!fd.get('title') || !fd.get('due')) return alert('Title & Due date required');
                setShowAdd(false);
                e.currentTarget.reset();
              }}
            >
              <div>
                <label className="text-sm text-slate-300">Title</label>
                <input name="title" required className="mt-1 w-full rounded-xl bg-[#111827] border border-white/10 px-3 py-2 text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" />
              </div>
              <div>
                <label className="text-sm text-slate-300">Due date</label>
                <input type="date" name="due" required className="mt-1 w-full rounded-xl bg-[#111827] border border-white/10 px-3 py-2 text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setShowAdd(false)} className="rounded-xl px-3 py-2 bg-white/5 text-slate-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Cancel</button>
                <button type="submit" className="rounded-xl px-3 py-2 bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Create</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showImport && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowImport(false)} />
          <div className="relative w-full max-w-md rounded-2xl bg-[#0f172a] border border-white/10 p-4">
            <h3 className="text-lg font-semibold">Import Data</h3>
            <div className="mt-3 text-slate-400 text-sm">Drag and drop CSV or JSON file.</div>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setShowImport(false)} className="rounded-xl px-3 py-2 bg-white/5 text-slate-200 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">Close</button>
            </div>
          </div>
        </div>
      )}

      {showMeet && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-50 grid place-items-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowMeet(false)} />
          <div className="relative w-full max-w-md rounded-2xl bg-[#0f172a] border border-white/10 p-4">
            <h3 className="text-lg font-semibold">Meeting</h3>
            <p className="mt-2 text-slate-400 text-sm">Your meeting is ready. Use your preferred video app.</p>
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setShowMeet(false)} className="rounded-xl px-3 py-2 bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">OK</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
