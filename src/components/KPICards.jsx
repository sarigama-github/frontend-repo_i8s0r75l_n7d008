import React from 'react';

const Card = ({ title, value, delta }) => {
  const isUp = delta?.startsWith('+');
  return (
    <div className="rounded-2xl bg-[#0f172a] border border-white/10 p-4 shadow-xl">
      <div className="text-slate-400 text-sm">{title}</div>
      <div className="mt-2 flex items-end gap-3">
        <div className="text-3xl font-semibold text-slate-100">{value}</div>
        <div className={`text-xs px-2 py-1 rounded-lg ${isUp ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>{delta}</div>
      </div>
      <div className="mt-2 text-xs text-slate-500">Increased from last month</div>
    </div>
  );
};

export default function KPICards() {
  const items = [
    { title: 'Total Projects', value: 128, delta: '+12%' },
    { title: 'Ended Projects', value: 52, delta: '+4%' },
    { title: 'Running Projects', value: 59, delta: '-2%' },
    { title: 'Pending Projects', value: 17, delta: '+1%' },
  ];
  return (
    <section aria-label="KPI Summary" className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 xl:gap-6">
      {items.map((it) => (
        <Card key={it.title} {...it} />
      ))}
    </section>
  );
}
