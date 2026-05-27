import { NextRequest, NextResponse } from 'next/server';
import { getAdminSupabase } from '@/lib/auth/master';

/**
 * POST /api/course-media
 * Uploads audio/video to the course-media bucket. Admin only (Supabase or master).
 */
export async function POST(request: NextRequest) {
  const auth = await getAdminSupabase();
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const ext = file.name.split('.').pop() ?? 'mp4';
  const path = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;

  const { data, error } = await auth.supabase.storage
    .from('course-media')
    .upload(path, file, { upsert: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: urlData } = auth.supabase.storage.from('course-media').getPublicUrl(data.path);
  return NextResponse.json({ path: data.path, url: urlData.publicUrl });
}
