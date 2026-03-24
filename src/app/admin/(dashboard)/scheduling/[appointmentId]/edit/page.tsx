import { notFound } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import AppointmentForm from '@/components/admin/AppointmentForm';

interface EditAppointmentPageProps {
  params: Promise<{ appointmentId: string }>;
}

export default async function EditAppointmentPage({
  params,
}: EditAppointmentPageProps) {
  const { appointmentId } = await params;
  const supabase = await createClient();

  const { data: appointment } = await supabase
    .from('appointments')
    .select('*')
    .eq('id', appointmentId)
    .single();

  if (!appointment) notFound();

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/scheduling"
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          &larr; Back to Scheduling
        </Link>
      </div>
      <h1 className="text-2xl font-serif font-semibold text-gray-900 mb-8">
        Edit Appointment
      </h1>
      <AppointmentForm
        mode="edit"
        appointmentId={appointmentId}
        defaultValues={{
          title: appointment.title,
          client_name: appointment.client_name ?? '',
          client_email: appointment.client_email ?? '',
          start_time: appointment.start_time,
          end_time: appointment.end_time,
          status: appointment.status,
          notes: appointment.notes ?? '',
        }}
      />
    </div>
  );
}
