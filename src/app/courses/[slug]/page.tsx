import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CourseContent from '@/components/courses/CourseContent';
import PreviewBanner from '@/components/admin/PreviewBanner';
import { getLessonProgressForCourse } from '@/app/actions/lessonProgress';

/**
 * Public course detail. Shows modules/lessons.
 * Lesson media (audio/video) only visible to enrolled users.
 * Admins can use ?preview=true to view draft content.
 */
export default async function CourseDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string; returnTo?: string }>;
}) {
  const { slug } = await params;
  const { preview, returnTo } = await searchParams;
  const supabase = await createClient();

  const isPreview = preview === 'true';
  let isAdmin = false;
  if (isPreview) {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
      isAdmin = profile?.role === 'admin';
    }
  }

  const courseQuery = supabase
    .from('courses')
    .select('id, title, slug, description')
    .eq('slug', slug);

  if (!isPreview || !isAdmin) {
    courseQuery.eq('published', true);
  }

  const { data: course } = await courseQuery.single();

  if (!course) notFound();

  const { data: { user } } = await supabase.auth.getUser();
  let isEnrolled = false;
  if (user) {
    const enrollmentResponse = await supabase
      .from('course_enrollments')
      .select('id')
      .eq('user_id', user.id)
      .eq('course_id', course.id)
      .maybeSingle();
    isEnrolled = !!enrollmentResponse.data;
  }

  const { data: modules } = await supabase
    .from('modules')
    .select(`
      id,
      title,
      sort_order,
      lessons (
        id,
        title,
        slug,
        content,
        media_type,
        media_path,
        duration_sec,
        sort_order,
        quiz_questions (
          id,
          question_text,
          question_type,
          options,
          sort_order
        )
      )
    `)
    .eq('course_id', course.id)
    .order('sort_order', { ascending: true });

  const modulesWithLessons = (modules ?? []).map((m) => {
    const rawLessons = (m.lessons ?? []) as {
      id: string;
      title: string;
      slug: string;
      content: string | null;
      media_type: string | null;
      media_path: string | null;
      duration_sec: number | null;
      sort_order: number;
      quiz_questions?: { id: string; question_text: string; question_type: 'multiple_choice' | 'true_false'; options: { text: string; is_correct: boolean }[]; sort_order: number }[];
    }[];
    const sortedLessons = rawLessons
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((l) => ({
        ...l,
        quiz_questions: (l.quiz_questions ?? []).sort(
          (a, b) => a.sort_order - b.sort_order
        ),
      }));
    return { ...m, lessons: sortedLessons };
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
  const canAccessMedia = isEnrolled;
  const { progress } = canAccessMedia ? await getLessonProgressForCourse(course.id) : { progress: null };
  const completedLessonIds = progress?.completedLessonIds ?? [];
  const showPreviewBanner = isPreview && isAdmin;
  const returnHref = (returnTo && returnTo.startsWith('/admin')) ? returnTo : `/admin/courses/${course.id}/edit`;
  /** Preview shows exact user experience: media only for entitled users */

  return (
    <div className="min-h-screen py-16 sm:py-24 bg-gradient-to-br from-bgLight-4 via-bgLight-4 to-bgLight-3">
      {showPreviewBanner && <PreviewBanner returnHref={returnHref} />}
      <div className="container mx-auto px-4 max-w-4xl">
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <li><Link href="/" className="hover:text-bgDark-2">Home</Link></li>
            <li aria-hidden>/</li>
            <li><Link href="/courses" className="hover:text-bgDark-2">Courses</Link></li>
            <li aria-hidden>/</li>
            <li className="text-gray-900 font-medium" aria-current="page">{course.title}</li>
          </ol>
        </nav>

        <section
          className="relative rounded-3xl border border-bgDark-2/20 p-6 sm:p-8 md:p-10 mb-10 overflow-hidden"
          style={{
            background: 'linear-gradient(to bottom right, #BBE9FF, #BBE9FF, #AFDDFF)',
            boxShadow: '0 10px 40px -12px rgba(0,70,201,0.15), 0 0 0 1px rgba(0,70,201,0.1)',
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,70,201,0.08),transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(16,85,201,0.06),transparent_50%)]" />
          <div className="relative z-10">
            <span className="inline-flex items-center rounded-full border border-bgDark-2/20 bg-white/70 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-gray-800 mb-4">
              Wellness Course
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-playfair font-light text-gray-900 mb-4 leading-tight">
              {course.title}
            </h1>
            {course.description && (
              <p className="text-base sm:text-lg text-gray-700/95 max-w-3xl leading-relaxed">
                {course.description}
              </p>
            )}
          </div>
        </section>

        {!canAccessMedia && (
          <div className="rounded-2xl border border-bgDark-2/20 bg-white p-6 sm:p-7 mb-10 shadow-lg">
            <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
              {user
                ? 'Enrollment is required to unlock all lesson content, including audio and video.'
                : 'Sign in to view your enrollment status and request access to this course.'}
            </p>
            {user ? (
              <Link
                href="/contact"
                className="inline-block mt-5 px-6 py-3 rounded-lg font-semibold text-white bg-zen-blue hover:bg-zen-blue-dark transition-colors"
              >
                Contact to Request Enrollment
              </Link>
            ) : (
              <Link
                href={`/login?redirect=${encodeURIComponent(`/courses/${course.slug}`)}`}
                className="inline-block mt-5 px-6 py-3 rounded-lg font-semibold text-white bg-zen-blue hover:bg-zen-blue-dark transition-colors"
              >
                Sign In to Continue
              </Link>
            )}
          </div>
        )}

        <CourseContent
          modules={modulesWithLessons}
          isEnrolled={canAccessMedia}
          supabaseUrl={supabaseUrl}
          completedLessonIds={completedLessonIds}
          courseSlug={course.slug}
        />
      </div>
    </div>
  );
}
