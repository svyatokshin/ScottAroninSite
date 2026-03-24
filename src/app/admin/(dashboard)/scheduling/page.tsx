import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import CalendarView, {
  type CalendarAppointment,
} from '@/components/admin/CalendarView';

export default async function SchedulingPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from('appointments')
    .select(
      'id, title, client_name, client_email, start_time, end_time, status, source, notes',
    )
    .order('start_time', { ascending: true });

  const appointments: CalendarAppointment[] = (data ?? []).map((a) => ({
    id: a.id,
    title: a.title,
    client_name: a.client_name,
    client_email: a.client_email,
    start_time: a.start_time,
    end_time: a.end_time,
    status: a.status,
    source: a.source,
    notes: a.notes,
  }));

  const upcoming = appointments.filter(
    (a) => a.status === 'confirmed' && new Date(a.start_time) >= new Date(),
  ).length;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-serif font-semibold text-gray-900">
            Scheduling
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            {upcoming} upcoming appointment{upcoming !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/scheduling/settings"
            className="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Settings
          </Link>
          <Link
            href="/admin/scheduling/new"
            className="px-4 py-2 text-sm font-medium rounded-lg bg-zen-blue text-white hover:bg-zen-blue/90 transition-colors"
          >
            New Appointment
          </Link>
        </div>
      </div>

      <CalendarView appointments={appointments} />
    </div>
  );
}
