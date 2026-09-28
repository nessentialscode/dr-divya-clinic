export interface AppointmentStatsData {
  total: number;
  pending: number;
  confirmed: number;
  today: number;
  completed: number;
  cancelled: number;
}

interface AppointmentStatsProps {
  stats: AppointmentStatsData;
}

export function AppointmentStats({ stats }: AppointmentStatsProps) {
  const cards = [
    {
      label: "TOTAL INQUIRIES",
      value: stats.total,
      textColor: "text-slate-900",
      borderColor: "border-slate-200/80",
    },
    {
      label: "PENDING",
      value: stats.pending,
      textColor: "text-amber-600",
      borderColor: "border-amber-300/80",
    },
    {
      label: "CONFIRMED",
      value: stats.confirmed,
      textColor: "text-sky-600",
      borderColor: "border-sky-300/80",
    },
    {
      label: "TODAY'S APPOINTMENTS",
      value: stats.today,
      textColor: "text-indigo-600",
      borderColor: "border-indigo-300/80",
    },
    {
      label: "COMPLETED",
      value: stats.completed,
      textColor: "text-emerald-600",
      borderColor: "border-emerald-300/80",
    },
    {
      label: "CANCELLED",
      value: stats.cancelled,
      textColor: "text-slate-500",
      borderColor: "border-slate-300/80",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
      {cards.map((card) => (
        <div
          key={card.label}
          className={`bg-white rounded-2xl border ${card.borderColor} shadow-[0_4px_20px_-4px_rgba(15,23,42,0.03)] p-4 sm:p-5 flex flex-col justify-between`}
        >
          <span className="text-[10px] sm:text-[11px] font-bold tracking-wider uppercase text-slate-500">
            {card.label}
          </span>
          <span className={`text-2xl sm:text-3xl font-extrabold mt-2 tracking-tight ${card.textColor}`}>
            {card.value}
          </span>
        </div>
      ))}
    </div>
  );
}
