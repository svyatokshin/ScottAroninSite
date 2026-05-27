-- Scheduling: appointments table + scheduling_settings (Calendly integration)

-- scheduling_settings: single-row config for Calendly and email preferences
CREATE TABLE public.scheduling_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  calendly_url TEXT,
  calendly_api_key TEXT,
  calendly_webhook_signing_key TEXT,
  reminder_hours_before INT NOT NULL DEFAULT 24,
  confirmation_email_enabled BOOLEAN NOT NULL DEFAULT true,
  reminder_email_enabled BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- appointments: both Calendly-synced and manually-created bookings
CREATE TABLE public.appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  client_name TEXT,
  client_email TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'cancelled', 'completed')),
  notes TEXT,
  calendly_event_uri TEXT,
  calendly_invitee_uri TEXT,
  source TEXT NOT NULL DEFAULT 'manual' CHECK (source IN ('calendly', 'manual')),
  reminder_sent BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- indexes
CREATE INDEX idx_appointments_start_time ON public.appointments(start_time);
CREATE INDEX idx_appointments_status ON public.appointments(status);
CREATE INDEX idx_appointments_client_email ON public.appointments(client_email);
CREATE INDEX idx_appointments_calendly_event ON public.appointments(calendly_event_uri);

-- RLS
ALTER TABLE public.scheduling_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- scheduling_settings: admin-only read/write
CREATE POLICY "Admins can read scheduling settings" ON public.scheduling_settings
  FOR SELECT USING (public.current_user_is_admin());

CREATE POLICY "Admins can manage scheduling settings" ON public.scheduling_settings
  FOR ALL USING (public.current_user_is_admin());

-- appointments: admin-only full CRUD
CREATE POLICY "Admins can read appointments" ON public.appointments
  FOR SELECT USING (public.current_user_is_admin());

CREATE POLICY "Admins can manage appointments" ON public.appointments
  FOR ALL USING (public.current_user_is_admin());

-- Seed a default settings row so upserts work
INSERT INTO public.scheduling_settings (id) VALUES (uuid_generate_v4());
