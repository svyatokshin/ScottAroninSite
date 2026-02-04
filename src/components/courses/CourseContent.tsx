'use client';

interface Lesson {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  media_type: string | null;
  media_path: string | null;
  duration_sec: number | null;
  sort_order: number;
}

interface Module {
  id: string;
  title: string;
  sort_order: number;
  lessons: Lesson[];
}

interface CourseContentProps {
  modules: Module[];
  isEnrolled: boolean;
  supabaseUrl: string;
}

/**
 * Renders course modules and lessons. Media only shown when enrolled.
 */
export default function CourseContent({
  modules,
  isEnrolled,
  supabaseUrl,
}: CourseContentProps) {
  return (
    <div className="space-y-8">
      {modules.map((mod) => (
        <section
          key={mod.id}
          className="rounded-xl border border-bgDark-2/20 bg-white overflow-hidden"
        >
          <h2 className="px-6 py-4 bg-gray-50 font-semibold text-gray-900">
            {mod.title}
          </h2>
          <div className="divide-y divide-gray-100">
            {mod.lessons.map((lesson) => (
              <div key={lesson.id} className="p-6">
                <h3 className="font-medium text-gray-900">{lesson.title}</h3>
                {lesson.content && (
                  <p className="mt-2 text-gray-600 whitespace-pre-wrap">
                    {lesson.content}
                  </p>
                )}
                {lesson.media_path && isEnrolled && (
                  <div className="mt-4">
                    {lesson.media_type === 'video' ? (
                      <video
                        src={`${supabaseUrl}/storage/v1/object/public/course-media/${lesson.media_path}`}
                        controls
                        className="max-w-full rounded-lg"
                      />
                    ) : (
                      <audio
                        src={`${supabaseUrl}/storage/v1/object/public/course-media/${lesson.media_path}`}
                        controls
                        className="w-full mt-2"
                      />
                    )}
                  </div>
                )}
                {lesson.media_path && !isEnrolled && (
                  <p className="mt-2 text-sm text-gray-500 italic">
                    Enroll to access media
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
