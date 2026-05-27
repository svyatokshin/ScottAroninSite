'use client';

import { useState } from 'react';
import { recordLessonComplete } from '@/app/actions/lessonProgress';
import { submitQuizAttempt } from '@/app/actions/quizzes';
import { FiCheck } from 'react-icons/fi';
import { getYouTubeEmbedUrl, isYouTubeUrl } from '@/lib/media';

interface QuizQuestion {
  id: string;
  question_text: string;
  question_type: 'multiple_choice' | 'true_false' | string;
  options: { text: string; is_correct: boolean }[];
  sort_order: number;
}

interface Lesson {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  media_type: string | null;
  media_path: string | null;
  duration_sec: number | null;
  sort_order: number;
  quiz_questions?: QuizQuestion[];
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
  completedLessonIds?: string[];
  courseSlug?: string;
}

/**
 * Renders course modules and lessons. Media only shown when enrolled.
 * Enrolled users can mark lessons complete; progress is tracked for dashboard.
 */
export default function CourseContent({
  modules,
  isEnrolled,
  supabaseUrl,
  completedLessonIds = [],
  courseSlug,
}: CourseContentProps) {
  const [localCompleted, setLocalCompleted] = useState<Set<string>>(() => new Set(completedLessonIds));
  const [markingId, setMarkingId] = useState<string | null>(null);

  const isCompleted = (lessonId: string) =>
    localCompleted.has(lessonId) || completedLessonIds.includes(lessonId);

  const handleMarkComplete = async (lessonId: string) => {
    if (isCompleted(lessonId)) return;
    setMarkingId(lessonId);
    const result = await recordLessonComplete(lessonId, courseSlug);
    if (result.error) {
      setMarkingId(null);
      return;
    }
    setLocalCompleted((prev) => new Set(prev).add(lessonId));
    setMarkingId(null);
  };

  const handleMediaEnded = (lessonId: string) => {
    if (!isCompleted(lessonId)) handleMarkComplete(lessonId);
  };

  const totalLessons = modules.reduce((count, module) => count + module.lessons.length, 0);
  const completedCount = modules.reduce((count, module) => {
    return (
      count +
      module.lessons.reduce((lessonCount, lesson) => {
        if (isCompleted(lesson.id)) return lessonCount + 1;
        return lessonCount;
      }, 0)
    );
  }, 0);

  return (
    <div className="space-y-8">
      <div
        className="relative rounded-3xl border border-bgDark-2/20 p-6 sm:p-8 overflow-hidden"
        style={{
          background: 'linear-gradient(to bottom right, #BBE9FF, #BBE9FF, #AFDDFF)',
          boxShadow: '0 10px 40px -12px rgba(0,70,201,0.15), 0 0 0 1px rgba(0,70,201,0.1)',
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(0,70,201,0.08),transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(16,85,201,0.06),transparent_50%)]" />
        <div className="relative z-10 flex flex-wrap items-center gap-3 sm:gap-4">
          <span className="inline-flex items-center rounded-full border border-bgDark-2/30 bg-white/70 px-4 py-1.5 text-xs font-semibold tracking-wider text-gray-800 uppercase">
            Course Curriculum
          </span>
          <span className="inline-flex items-center rounded-full border border-bgDark-2/20 bg-white/70 px-4 py-1.5 text-sm font-medium text-gray-800">
            {modules.length} modules
          </span>
          <span className="inline-flex items-center rounded-full border border-bgDark-2/20 bg-white/70 px-4 py-1.5 text-sm font-medium text-gray-800">
            {totalLessons} lessons
          </span>
          {isEnrolled && (
            <span className="inline-flex items-center rounded-full border border-bgDark-2/20 bg-white/70 px-4 py-1.5 text-sm font-medium text-gray-800">
              {completedCount}/{totalLessons} completed
            </span>
          )}
        </div>
      </div>

      {modules.map((mod, moduleIndex) => (
        <section
          key={mod.id}
          className="relative rounded-3xl border border-bgDark-2/20 bg-white overflow-hidden shadow-xl"
          style={{ boxShadow: '0 10px 40px -12px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50/30 to-white" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(0,0,0,0.02),transparent_45%)]" />
          <div className="relative z-10">
            <div className="px-6 sm:px-8 py-6 border-b border-gray-200/80">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="space-y-3">
                  <span className="inline-flex items-center rounded-full border border-bgDark-2/20 bg-bgDark-2/10 px-3 py-1 text-xs font-semibold tracking-wider text-gray-800 uppercase">
                    Module {moduleIndex + 1}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-playfair font-light text-gray-900 leading-tight">
                    {mod.title}
                  </h2>
                </div>
                <span className="inline-flex items-center rounded-full border border-bgDark-2/20 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                  {mod.lessons.length} {mod.lessons.length === 1 ? 'lesson' : 'lessons'}
                </span>
              </div>
            </div>

            <div className="px-4 sm:px-6 md:px-8 py-6 space-y-4 sm:space-y-6">
              {mod.lessons.map((lesson, lessonIndex) => {
              const done = isCompleted(lesson.id);
              return (
                <div
                  key={lesson.id}
                  id={`lesson-${lesson.id}`}
                  className="scroll-mt-24 rounded-2xl border border-bgDark-2/20 bg-white p-5 sm:p-6 shadow-lg"
                  style={{ boxShadow: '0 10px 32px -14px rgba(0,70,201,0.18), 0 0 0 1px rgba(0,70,201,0.06)' }}
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="flex-1 min-w-[240px]">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="inline-flex items-center rounded-full bg-bgDark-2/10 px-2.5 py-1 text-xs font-semibold text-gray-800">
                          Lesson {lessonIndex + 1}
                        </span>
                        {lesson.duration_sec && (
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
                            {formatDuration(lesson.duration_sec)}
                          </span>
                        )}
                        {lesson.media_type && (
                          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 capitalize">
                            {lesson.media_type}
                          </span>
                        )}
                        {!isEnrolled && lesson.media_path && (
                          <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-2.5 py-1 text-xs font-medium text-amber-800">
                            Locked media
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl sm:text-2xl font-playfair font-light text-gray-900 leading-tight">
                        {lesson.title}
                      </h3>
                    </div>
                    {isEnrolled && (
                      <button
                        type="button"
                        onClick={() => handleMarkComplete(lesson.id)}
                        disabled={done || markingId === lesson.id}
                        aria-label={done ? 'Lesson completed' : 'Mark lesson complete'}
                        aria-pressed={done}
                        className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors min-h-[44px] min-w-[44px] justify-center ${
                          done
                            ? 'bg-green-100 text-green-800 cursor-default border border-green-200'
                            : 'bg-zen-blue text-white hover:bg-zen-blue-dark disabled:opacity-50'
                        }`}
                      >
                        {done ? (
                          <>
                            <FiCheck aria-hidden />
                            Done
                          </>
                        ) : markingId === lesson.id ? (
                          'Saving...'
                        ) : (
                          'Mark complete'
                        )}
                      </button>
                    )}
                  </div>
                  {lesson.content && <LessonBody content={lesson.content} />}
                  {lesson.media_path && isEnrolled && (
                    <div className="mt-5 rounded-2xl border border-bgDark-2/15 bg-gray-50/70 p-3 sm:p-4">
                      {lesson.media_type === 'video' && isYouTubeUrl(lesson.media_path) ? (
                        <div className="relative aspect-video rounded-lg overflow-hidden">
                          <iframe
                            src={getYouTubeEmbedUrl(lesson.media_path) ?? ''}
                            title={lesson.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                          />
                        </div>
                      ) : lesson.media_type === 'video' ? (
                        <video
                          src={`${supabaseUrl}/storage/v1/object/public/course-media/${lesson.media_path}`}
                          controls
                          className="max-w-full rounded-lg"
                          onEnded={() => handleMediaEnded(lesson.id)}
                        />
                      ) : (
                        <audio
                          src={`${supabaseUrl}/storage/v1/object/public/course-media/${lesson.media_path}`}
                          controls
                          className="w-full mt-2"
                          onEnded={() => handleMediaEnded(lesson.id)}
                        />
                      )}
                    </div>
                  )}
                  {lesson.media_path && !isEnrolled && (
                    <p className="mt-2 text-sm text-gray-500 italic">
                      Enroll to access media
                    </p>
                  )}
                  {isEnrolled &&
                    lesson.quiz_questions &&
                    lesson.quiz_questions.length > 0 && (
                      <LessonQuiz questions={lesson.quiz_questions} />
                    )}
                </div>
              );
            })}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

function LessonBody({ content }: { content: string }) {
  const paragraphs = content
    .split('\n')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <div className="mt-4 space-y-4">
      {paragraphs.map((paragraph, index) => (
        <p
          key={`${paragraph.slice(0, 16)}-${index}`}
          className="text-base sm:text-lg text-gray-700/95 leading-relaxed tracking-wide"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
}

function formatDuration(durationSec: number) {
  const minutes = Math.floor(durationSec / 60);
  const seconds = durationSec % 60;

  if (minutes === 0) return `${seconds}s`;
  if (seconds === 0) return `${minutes}m`;
  return `${minutes}m ${seconds}s`;
}

/**
 * Mini-quiz for a lesson. Enrolled users can answer and see feedback.
 */
function LessonQuiz({
  questions,
}: {
  questions: QuizQuestion[];
}) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [results, setResults] = useState<Record<string, boolean | null>>({});
  const [submittingId, setSubmittingId] = useState<string | null>(null);

  const handleSubmit = async (questionId: string) => {
    const idx = answers[questionId];
    if (idx === undefined) return;
    setSubmittingId(questionId);
    const result = await submitQuizAttempt(questionId, idx);
    setResults((prev) => ({ ...prev, [questionId]: result.isCorrect ?? null }));
    setSubmittingId(null);
  };

  return (
    <div className="mt-6 rounded-2xl border border-bgDark-2/20 bg-gray-50/90 p-4 sm:p-5">
      <h4 className="text-sm font-semibold tracking-wide text-gray-900 mb-3 uppercase">
        Quick Quiz
      </h4>
      <div className="space-y-4">
        {questions.map((q) => (
          <div key={q.id} className="space-y-3 rounded-xl border border-bgDark-2/10 bg-white p-4">
            <p className="text-sm sm:text-base font-medium text-gray-800">{q.question_text}</p>
            <div className="grid gap-2" role="group" aria-label={q.question_text}>
              {q.options.map((opt, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-2 cursor-pointer rounded-lg border border-bgDark-2/10 px-3 py-2 hover:bg-bgDark-2/5 transition-colors"
                >
                  <input
                    type="radio"
                    name={`quiz-${q.id}`}
                    value={idx}
                    checked={answers[q.id] === idx}
                    onChange={() =>
                      setAnswers((prev) => ({ ...prev, [q.id]: idx }))
                    }
                    className="h-4 w-4 text-zen-blue border-gray-300 focus:ring-zen-blue/60"
                  />
                  <span className="text-sm text-gray-700">{opt.text}</span>
                </label>
              ))}
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleSubmit(q.id)}
                disabled={
                  answers[q.id] === undefined || submittingId === q.id
                }
                className="px-3 py-1.5 rounded text-sm font-medium bg-zen-blue text-white hover:bg-zen-blue-dark disabled:opacity-50 min-h-[44px]"
              >
                {submittingId === q.id ? 'Checking...' : 'Check answer'}
              </button>
              {results[q.id] === true && (
                <span className="text-sm text-green-700 font-medium">Correct!</span>
              )}
              {results[q.id] === false && (
                <span className="text-sm text-red-700 font-medium">Incorrect</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
