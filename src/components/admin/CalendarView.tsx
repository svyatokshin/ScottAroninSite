'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export interface CalendarAppointment {
  id: string;
  title: string;
  client_name: string | null;
  client_email: string | null;
  start_time: string;
  end_time: string;
  status: string;
  source: string;
  notes: string | null;
}

interface CalendarViewProps {
  appointments: CalendarAppointment[];
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

function isSameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

const STATUS_STYLES: Record<string, { dot: string; badge: string; label: string }> = {
  confirmed: {
    dot: 'bg-blue-500',
    badge: 'bg-blue-100 text-blue-800',
    label: 'Confirmed',
  },
  cancelled: {
    dot: 'bg-gray-400',
    badge: 'bg-gray-100 text-gray-600',
    label: 'Cancelled',
  },
  completed: {
    dot: 'bg-green-500',
    badge: 'bg-green-100 text-green-800',
    label: 'Completed',
  },
};

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function CalendarView({ appointments }: CalendarViewProps) {
  const router = useRouter();
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const appointmentsByDate = useMemo(() => {
    const map = new Map<string, CalendarAppointment[]>();
    for (const appt of appointments) {
      const d = new Date(appt.start_time);
      const key = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      const arr = map.get(key) ?? [];
      arr.push(appt);
      map.set(key, arr);
    }
    return map;
  }, [appointments]);

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfWeek(viewYear, viewMonth);

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
    setSelectedDate(null);
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
    setSelectedDate(null);
  };

  const handleToday = () => {
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    setSelectedDate(today);
  };

  const handleDeleteAppointment = async (id: string) => {
    if (!confirm('Are you sure you want to delete this appointment?')) return;
    const { deleteAppointment } = await import('@/app/actions/appointments');
    const result = await deleteAppointment(id);
    if (result.error) {
      alert(result.error);
    } else {
      router.refresh();
    }
  };

  const handleCancelAppointment = async (id: string) => {
    if (!confirm('Cancel this appointment?')) return;
    const { cancelAppointment } = await import('@/app/actions/appointments');
    const result = await cancelAppointment(id);
    if (result.error) {
      alert(result.error);
    } else {
      router.refresh();
    }
  };

  const selectedKey = selectedDate
    ? `${selectedDate.getFullYear()}-${selectedDate.getMonth()}-${selectedDate.getDate()}`
    : null;
  const selectedAppointments = selectedKey
    ? (appointmentsByDate.get(selectedKey) ?? [])
    : [];

  const calendarCells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) calendarCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d);
  while (calendarCells.length % 7 !== 0) calendarCells.push(null);

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Calendar Grid */}
      <div className="flex-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToday}
              className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Today
            </button>
            <button
              type="button"
              onClick={handlePrevMonth}
              className="p-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              aria-label="Previous month"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              className="p-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              aria-label="Next month"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 mb-1">
          {DAY_LABELS.map((label) => (
            <div
              key={label}
              className="text-center text-xs font-medium text-gray-500 py-2"
            >
              {label}
            </div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 border-t border-l border-gray-200">
          {calendarCells.map((day, idx) => {
            if (day === null) {
              return (
                <div
                  key={`empty-${idx}`}
                  className="border-r border-b border-gray-200 bg-gray-50 min-h-[80px]"
                />
              );
            }

            const cellDate = new Date(viewYear, viewMonth, day);
            const dateKey = `${viewYear}-${viewMonth}-${day}`;
            const dayAppointments = appointmentsByDate.get(dateKey) ?? [];
            const isToday = isSameDay(cellDate, today);
            const isSelected = selectedDate ? isSameDay(cellDate, selectedDate) : false;

            return (
              <button
                key={dateKey}
                type="button"
                onClick={() => setSelectedDate(cellDate)}
                className={`border-r border-b border-gray-200 min-h-[80px] p-1.5 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-zen-blue ${
                  isSelected
                    ? 'bg-blue-50 border-blue-300'
                    : 'hover:bg-gray-50'
                }`}
              >
                <span
                  className={`inline-flex items-center justify-center w-7 h-7 text-sm rounded-full ${
                    isToday
                      ? 'bg-zen-blue text-white font-semibold'
                      : 'text-gray-900'
                  }`}
                >
                  {day}
                </span>
                {dayAppointments.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {dayAppointments.slice(0, 3).map((appt) => {
                      const style = STATUS_STYLES[appt.status] ?? STATUS_STYLES.confirmed;
                      return (
                        <span
                          key={appt.id}
                          className={`w-2 h-2 rounded-full ${style.dot}`}
                          title={`${formatTime(appt.start_time)} - ${appt.title}`}
                        />
                      );
                    })}
                    {dayAppointments.length > 3 && (
                      <span className="text-[10px] text-gray-500">
                        +{dayAppointments.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Side panel */}
      <div className="w-full lg:w-80 flex-shrink-0">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm sticky top-6">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-medium text-gray-900">
              {selectedDate
                ? selectedDate.toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })
                : 'Select a day'}
            </h3>
          </div>
          <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto">
            {!selectedDate && (
              <p className="text-sm text-gray-500">
                Click a day on the calendar to view appointments.
              </p>
            )}
            {selectedDate && selectedAppointments.length === 0 && (
              <p className="text-sm text-gray-500">
                No appointments on this day.
              </p>
            )}
            {selectedAppointments.map((appt) => {
              const style = STATUS_STYLES[appt.status] ?? STATUS_STYLES.confirmed;
              return (
                <div
                  key={appt.id}
                  className="rounded-lg border border-gray-200 p-3 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="font-medium text-gray-900 text-sm leading-tight">
                      {appt.title}
                    </p>
                    <span
                      className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full whitespace-nowrap ${style.badge}`}
                    >
                      {style.label}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    {formatTime(appt.start_time)} &ndash;{' '}
                    {formatTime(appt.end_time)}
                  </p>
                  {appt.client_name && (
                    <p className="text-xs text-gray-600 mt-1">
                      {appt.client_name}
                      {appt.client_email && (
                        <span className="text-gray-400">
                          {' '}
                          &middot; {appt.client_email}
                        </span>
                      )}
                    </p>
                  )}
                  {appt.source === 'calendly' && (
                    <span className="inline-block mt-1 text-[10px] text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
                      Calendly
                    </span>
                  )}
                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-gray-100">
                    <Link
                      href={`/admin/scheduling/${appt.id}/edit`}
                      className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Edit
                    </Link>
                    {appt.status === 'confirmed' && (
                      <button
                        type="button"
                        onClick={() => handleCancelAppointment(appt.id)}
                        className="text-xs text-amber-600 hover:text-amber-800 transition-colors"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDeleteAppointment(appt.id)}
                      className="text-xs text-red-600 hover:text-red-800 transition-colors ml-auto"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
