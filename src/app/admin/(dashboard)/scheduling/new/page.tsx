import Link from 'next/link';
import AppointmentForm from '@/components/admin/AppointmentForm';

export default function NewAppointmentPage() {
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
        New Appointment
      </h1>
      <AppointmentForm mode="create" />
    </div>
  );
}
