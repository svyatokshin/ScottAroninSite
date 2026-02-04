'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  createQuizQuestion,
  deleteQuizQuestion,
  updateQuizQuestion,
  type QuizOption,
} from '@/app/actions/quizzes';

interface QuizQuestion {
  id: string;
  question_text: string;
  question_type: 'multiple_choice' | 'true_false';
  options: QuizOption[];
  sort_order: number;
}

interface QuizManagerProps {
  lessonId: string;
  questions: QuizQuestion[];
  courseId: string;
}

const DEFAULT_OPTIONS: QuizOption[] = [
  { text: '', is_correct: false },
  { text: '', is_correct: false },
];

/**
 * Inline form for adding/editing a quiz question.
 */
function QuizQuestionForm({
  lessonId,
  initial,
  onCancel,
  onSuccess,
}: {
  lessonId: string;
  initial?: QuizQuestion;
  onCancel: () => void;
  onSuccess: () => void;
}) {
  const router = useRouter();
  const [questionText, setQuestionText] = useState(initial?.question_text ?? '');
  const [questionType, setQuestionType] = useState<
    'multiple_choice' | 'true_false'
  >(initial?.question_type ?? 'multiple_choice');
  const [options, setOptions] = useState<QuizOption[]>(
    initial?.options?.length ? initial.options : DEFAULT_OPTIONS
  );
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOptionChange = (idx: number, text: string) => {
    const next = [...options];
    next[idx] = { ...next[idx], text };
    setOptions(next);
  };

  const handleOptionCorrect = (idx: number) => {
    const next = options.map((o, i) => ({ ...o, is_correct: i === idx }));
    setOptions(next);
  };

  const handleAddOption = () => {
    setOptions([...options, { text: '', is_correct: false }]);
  };

  const handleRemoveOption = (idx: number) => {
    if (options.length <= 1) return;
    const next = options.filter((_, i) => i !== idx);
    setOptions(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    const validOptions = options.filter((o) => o.text.trim());
    if (!validOptions.length) {
      setError('Add at least one option');
      setIsSubmitting(false);
      return;
    }
    const payload = {
      question_text: questionText.trim(),
      question_type: questionType,
      options: validOptions,
      sort_order: initial?.sort_order ?? 0,
    };
    try {
      if (initial) {
        const r = await updateQuizQuestion(initial.id, payload);
        if (r.error) throw new Error(r.error);
      } else {
        const r = await createQuizQuestion(lessonId, payload);
        if (r.error) throw new Error(r.error);
      }
      router.refresh();
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-50 rounded-lg">
      {error && (
        <p className="text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Question
        </label>
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          required
          className="w-full px-4 py-2 border border-bgDark-2/50 rounded-lg focus:ring-2 focus:ring-bgDark-2/60 min-h-[44px]"
          placeholder="Enter your question"
          disabled={isSubmitting}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Type
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="qt"
              checked={questionType === 'multiple_choice'}
              onChange={() => {
                setQuestionType('multiple_choice');
                if (options.every((o) => o.text === 'True' || o.text === 'False')) {
                  setOptions(DEFAULT_OPTIONS);
                }
              }}
              disabled={isSubmitting}
            />
            Multiple choice
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="qt"
              checked={questionType === 'true_false'}
              onChange={() => {
                setQuestionType('true_false');
                setOptions([
                  { text: 'True', is_correct: false },
                  { text: 'False', is_correct: false },
                ]);
              }}
              disabled={isSubmitting}
            />
            True / False
          </label>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Options (select the correct one)
        </label>
        <div className="space-y-2">
          {(questionType === 'true_false'
            ? [
                { text: 'True', is_correct: options[0]?.is_correct ?? false },
                { text: 'False', is_correct: options[1]?.is_correct ?? false },
              ]
            : options
          ).map((opt, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="radio"
                name="correct"
                checked={opt.is_correct}
                onChange={() => handleOptionCorrect(idx)}
                disabled={isSubmitting}
                aria-label={`Mark "${opt.text}" as correct`}
              />
              {questionType === 'multiple_choice' ? (
                <>
                  <input
                    type="text"
                    value={options[idx]?.text ?? ''}
                    onChange={(e) => handleOptionChange(idx, e.target.value)}
                    className="flex-1 px-4 py-2 border border-bgDark-2/50 rounded-lg min-h-[44px]"
                    placeholder={`Option ${idx + 1}`}
                    disabled={isSubmitting}
                  />
                  {options.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(idx)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </>
              ) : (
                <span className="text-gray-700">{opt.text}</span>
              )}
            </div>
          ))}
          {questionType === 'multiple_choice' && (
            <button
              type="button"
              onClick={handleAddOption}
              className="text-sm text-bgDark-2 hover:underline"
            >
              + Add option
            </button>
          )}
        </div>
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 rounded-lg font-medium text-white bg-[#0D47A1] hover:bg-[#1565C0] disabled:opacity-50 min-h-[44px]"
        >
          {isSubmitting ? 'Saving...' : initial ? 'Update' : 'Add question'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 min-h-[44px]"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

/**
 * Manages mini-quiz questions for a lesson to boost engagement.
 */
export default function QuizManager({
  lessonId,
  questions,
  courseId,
}: QuizManagerProps) {
  const router = useRouter();
  const [showAdd, setShowAdd] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this question?')) return;
    const r = await deleteQuizQuestion(id);
    if (r.error) alert(r.error);
    else router.refresh();
  };

  const sortedQuestions = [...questions].sort(
    (a, b) => a.sort_order - b.sort_order
  );

  return (
    <section
      className="mt-8 pt-8 border-t border-gray-200"
      aria-labelledby="quiz-section"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 id="quiz-section" className="text-lg font-semibold text-gray-900">
          Mini Quiz (Engagement)
        </h2>
        {!showAdd && !editingId && (
          <button
            type="button"
            onClick={() => setShowAdd(true)}
            className="text-sm font-medium text-bgDark-2 hover:underline"
          >
            + Add question
          </button>
        )}
      </div>
      <p className="text-sm text-gray-500 mb-4">
        Add short quizzes to reinforce learning and keep learners engaged.
      </p>

      {showAdd && (
        <div className="mb-6">
          <QuizQuestionForm
            lessonId={lessonId}
            onCancel={() => setShowAdd(false)}
            onSuccess={() => setShowAdd(false)}
          />
        </div>
      )}

      {editingId && (
        <div className="mb-6">
          <QuizQuestionForm
            lessonId={lessonId}
            initial={questions.find((q) => q.id === editingId)}
            onCancel={() => setEditingId(null)}
            onSuccess={() => setEditingId(null)}
          />
        </div>
      )}

      {sortedQuestions.length === 0 && !showAdd && !editingId && (
        <p className="text-sm text-gray-500 py-4">No quiz questions yet.</p>
      )}

      {sortedQuestions.length > 0 && (
        <ul className="space-y-3" role="list">
          {sortedQuestions.map((q) =>
            editingId === q.id ? null : (
              <li
                key={q.id}
                className="flex items-center justify-between py-3 px-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">{q.question_text}</p>
                  <p className="text-xs text-gray-500 capitalize mt-0.5">
                    {q.question_type.replace('_', ' ')}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingId(q.id)}
                    className="text-sm text-bgDark-2 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(q.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </li>
            )
          )}
        </ul>
      )}
    </section>
  );
}
