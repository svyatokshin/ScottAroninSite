'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  createAppointment,
  updateAppointment,
  type AppointmentInput,
} from '@/app/actions/appointments';

interface AppointmentFormProps {
  mode: 'create' | 'edit';
  appointmentId?: string;
  defaultValues?: Partial<AppointmentInput> & { status?: string };
}

function toLocalDateTimeValue(iso: string | undefined): string {
  if (!iso) return '';
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export default function AppointmentForm({
  mode,
  appointmentId,
  defaultValues,
}: AppointmentFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [title, setTitle] = useState(defaultValues?.title ?? '');
  const [clientName, setClientName] = useState(defaultValues?.client_name ?? '');
  const [clientEmail, setClientEmail] = useState(defaultValues?.client_email ?? '');
  const [startTime, setStartTime] = useState(
    toLocalDateTimeValue(defaultValues?.start_time),
  );
  const [endTime, setEndTime] = useState(
    toLocalDateTimeValue(defaultValues?.end_time),
  );
  const [status, setStatus] = useState<'confirmed' | 'cancelled' | 'completed'>(
    (defaultValues?.status as 'confirmed' | 'cancelled' | 'completed') ?? 'confirmed',
  );
  const [notes, setNotes] = useState(defaultValues?.notes ?? '');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (!startTime || !endTime) {
      setError('Start and end times are required');
      return;
    }
    if (new Date(endTime) <= new Date(startTime)) {
      setError('End time must be after start time');
      return;
    }

    setIsSubmitting(true);

    const input: AppointmentInput = {
      title: title.trim(),
      client_name: clientName.trim() || undefined,
      client_email: clientEmail.trim() || undefined,
      start_time: new Date(startTime).toISOString(),
      end_time: new Date(endTime).toISOString(),
      status: status as AppointmentInput['status'],
      notes: notes.trim() || undefined,
    };

    const result =
      mode === 'create'
        ? await createAppointment(input)
        : await updateAppointment(appointmentId!, input);

    setIsSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    router.push('/admin/scheduling');
    router.refresh();
  };

  const fieldClasses =
    'w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-zen-blue/40 focus:border-zen-blue transition-colors';
  const labelClasses = 'block text-sm font-medium text-gray-700 mb-1.5';

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      <div>
        <label htmlFor="title" className={labelClasses}>
          Title <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={fieldClasses}
          placeholder="e.g. Wellness Session"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="clientName" className={labelClasses}>
            Client Name
          </label>
          <input
            id="clientName"
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className={fieldClasses}
            placeholder="John Doe"
          />
        </div>
        <div>
          <label htmlFor="clientEmail" className={labelClasses}>
            Client Email
          </label>
          <input
            id="clientEmail"
            type="email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            className={fieldClasses}
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="startTime" className={labelClasses}>
            Start Time <span className="text-red-500">*</span>
          </label>
          <input
            id="startTime"
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className={fieldClasses}
            required
          />
        </div>
        <div>
          <label htmlFor="endTime" className={labelClasses}>
            End Time <span className="text-red-500">*</span>
          </label>
          <input
            id="endTime"
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className={fieldClasses}
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="status" className={labelClasses}>
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as 'confirmed' | 'cancelled' | 'completed')}
          className={fieldClasses}
        >
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div>
        <label htmlFor="notes" className={labelClasses}>
          Notes
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className={`${fieldClasses} min-h-[100px] resize-y`}
          placeholder="Any additional notes..."
        />
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 text-sm font-medium rounded-lg bg-zen-blue text-white hover:bg-zen-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? 'Saving...'
            : mode === 'create'
              ? 'Create Appointment'
              : 'Save Changes'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
