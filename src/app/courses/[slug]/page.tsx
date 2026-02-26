import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CourseContent from '@/components/courses/CourseContent';
import EnrollButton from '@/components/courses/EnrollButton';
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
    .select('id, title, slug, description, self_enroll_enabled')
    .eq('slug', slug);

  if (!isPreview || !isAdmin) {
    courseQuery.eq('published', true);
  }

  const { data: course } = await courseQuery.single();

  if (!course) notFound();

  const { data: { user } } = await supabase.auth.getUser();
  let isEnrolled = false;
  if (user) {
    const { data: enr } = await supabase
      .from('course_enrollments')
      .select('id')
      .eq('user_id', user.id)
      .eq('course_id', course.id)
      .single();
    isEnrolled = !!enr;
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
  const { progress } = isEnrolled ? await getLessonProgressForCourse(course.id) : { progress: null };
  const completedLessonIds = progress?.completedLessonIds ?? [];
  const showPreviewBanner = isPreview && isAdmin;
  const returnHref = (returnTo && returnTo.startsWith('/admin')) ? returnTo : `/admin/courses/${course.id}/edit`;
  /** Preview shows exact user experience: media only when enrolled */
  const canAccessMedia = isEnrolled;

  return (
    <div className="min-h-screen py-16 sm:py-24">
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

        <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-gray-900 mb-4">
          {course.title}
        </h1>
        {course.description && (
          <p className="text-lg text-gray-600 mb-10">{course.description}</p>
        )}

        {!canAccessMedia && (
          <div className="rounded-xl border border-bgDark-2/20 bg-white p-6 mb-10">
            <p className="text-gray-700">
              {user
                ? course.self_enroll_enabled
                  ? 'Enroll to access lesson content, including audio and video.'
                  : 'Contact us to be enrolled in this course.'
                : 'Sign in and enroll to access lesson content, including audio and video.'}
            </p>
            {user ? (
              course.self_enroll_enabled ? (
                <EnrollButton courseId={course.id} />
              ) : (
                <Link
                  href="/contact"
                  className="inline-block mt-4 px-6 py-3 rounded-lg font-semibold text-white bg-[#0D47A1] hover:bg-[#1565C0] transition-colors"
                >
                  Contact Us
                </Link>
              )
            ) : (
              <Link
                href="/login"
                className="inline-block mt-4 px-6 py-3 rounded-lg font-semibold text-white bg-[#0D47A1] hover:bg-[#1565C0] transition-colors"
              >
                Sign In
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
