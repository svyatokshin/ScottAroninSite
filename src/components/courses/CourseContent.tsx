'use client';

import { useState } from 'react';
import { recordLessonComplete } from '@/app/actions/lessonProgress';
import { submitQuizAttempt } from '@/app/actions/quizzes';
import { FiCheck } from 'react-icons/fi';

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
            {mod.lessons.map((lesson) => {
              const done = isCompleted(lesson.id);
              return (
                <div
                  key={lesson.id}
                  id={`lesson-${lesson.id}`}
                  className="p-6 scroll-mt-24"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-medium text-gray-900 flex-1">
                      {lesson.title}
                    </h3>
                    {isEnrolled && (
                      <button
                        type="button"
                        onClick={() => handleMarkComplete(lesson.id)}
                        disabled={done || markingId === lesson.id}
                        aria-label={done ? 'Lesson completed' : 'Mark lesson complete'}
                        aria-pressed={done}
                        className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors min-h-[44px] min-w-[44px] justify-center ${
                          done
                            ? 'bg-green-100 text-green-800 cursor-default'
                            : 'bg-[#0D47A1] text-white hover:bg-[#1565C0] disabled:opacity-50'
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
        </section>
      ))}
    </div>
  );
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
    <div className="mt-6 rounded-lg border border-bgDark-2/20 bg-gray-50 p-4">
      <h4 className="text-sm font-semibold text-gray-900 mb-3">
        Quick Quiz
      </h4>
      <div className="space-y-4">
        {questions.map((q) => (
          <div key={q.id} className="space-y-2">
            <p className="text-sm font-medium text-gray-800">{q.question_text}</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label={q.question_text}>
              {q.options.map((opt, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`quiz-${q.id}`}
                    value={idx}
                    checked={answers[q.id] === idx}
                    onChange={() =>
                      setAnswers((prev) => ({ ...prev, [q.id]: idx }))
                    }
                    className="h-4 w-4 text-[#0D47A1] border-gray-300 focus:ring-bgDark-2/60"
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
                className="px-3 py-1.5 rounded text-sm font-medium bg-[#0D47A1] text-white hover:bg-[#1565C0] disabled:opacity-50 min-h-[44px]"
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
