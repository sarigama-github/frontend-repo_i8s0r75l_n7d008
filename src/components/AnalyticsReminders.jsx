import React, { useEffect, useRef } from 'react';
import { Play } from 'lucide-react';

export default function AnalyticsReminders({ onStartMeeting }) {
  const barRef = useRef(null);
  const donutRef = useRef(null);

  useEffect(() => {
    // Chart.js dynamic import to avoid SSR issues
    let bar, donut;
    import('chart.js/auto').then(({ default: Chart }) => {
      const textColor = '#e5e7eb';
      const gridColor = 'rgba(255,255,255,0.08)';
      bar = new Chart(barRef.current, {
        type: 'bar',
        data: {
          labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
          datasets: [
            {
              label: 'Projects',
              data: [12, 19, 7, 15, 12, 18, 10],
              backgroundColor: 'rgba(37, 99, 235, 0.6)',
              borderRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false }, ticks: { color: textColor } },
            y: { grid: { color: gridColor }, ticks: { color: textColor, stepSize: 5 } },
          },
        },
      });

      donut = new Chart(donutRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Completed', 'Running', 'Pending'],
          datasets: [
            {
              data: [52, 59, 17],
              backgroundColor: ['#22c55e', '#2563eb', '#f59e0b'],
              borderWidth: 0,
            },
          ],
        },
        options: {
          cutout: '70%',
          plugins: {
            legend: { display: true, labels: { color: textColor } },
          },
        },
      });
    });
    return () => {
      bar?.destroy();
      donut?.destroy();
    };
  }, []);

  return (
    <section className="grid grid-cols-1 xl:grid-cols-12 gap-4 xl:gap-6">
      <div className="xl:col-span-7 rounded-2xl bg-[#0f172a] border border-white/10 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-slate-100 font-semibold">Project Analytics</h3>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <canvas ref={barRef} role="img" aria-label="Bar chart of projects by day" />
            <noscript>
              <div class="h-36 rounded-xl bg-white/5" aria-hidden="true"></div>
            </noscript>
          </div>
          <div className="md:col-span-1">
            <canvas ref={donutRef} role="img" aria-label="Donut chart of project statuses" />
            <noscript>
              <div class="h-36 rounded-xl bg-white/5" aria-hidden="true"></div>
            </noscript>
          </div>
        </div>
      </div>

      <div className="xl:col-span-5 rounded-2xl bg-[#0f172a] border border-white/10 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-slate-100 font-semibold">Reminders</h3>
        </div>
        <div className="mt-4 space-y-3">
          <div className="rounded-xl bg-white/5 p-3 flex items-center justify-between">
            <div>
              <div className="text-slate-200 font-medium">Weekly Sync</div>
              <div className="text-slate-400 text-sm">10:00–10:45 • Zoom</div>
            </div>
            <button onClick={onStartMeeting} className="inline-flex items-center gap-2 rounded-xl bg-blue-600 text-white px-3 py-2 hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500">
              <Play className="h-4 w-4" /> Start Meeting
            </button>
          </div>
          <div className="rounded-xl bg-white/5 p-3">
            <div className="text-slate-200 font-medium">Design Review</div>
            <div className="text-slate-400 text-sm">14:00–15:00 • Room A</div>
          </div>
        </div>
      </div>
    </section>
  );
}
