'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized', supabase: null as never };
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  if (profile?.role !== 'admin') return { error: 'Forbidden', supabase: null as never };
  return { supabase };
}

export interface QuizOption {
  text: string;
  is_correct: boolean;
}

export interface QuizQuestionInput {
  question_text: string;
  question_type: 'multiple_choice' | 'true_false';
  options: QuizOption[];
  sort_order?: number;
}

export async function createQuizQuestion(
  lessonId: string,
  input: QuizQuestionInput
) {
  const r = await requireAdmin();
  if (r.error) return { error: r.error };

  if (!input.options.length) {
    return { error: 'At least one option required' };
  }
  const hasCorrect = input.options.some((o) => o.is_correct);
  if (!hasCorrect) {
    return { error: 'At least one option must be marked correct' };
  }

  const { data, error } = await r.supabase
    .from('quiz_questions')
    .insert({
      lesson_id: lessonId,
      question_text: input.question_text,
      question_type: input.question_type,
      options: input.options,
      sort_order: input.sort_order ?? 0,
    })
    .select('id')
    .single();

  if (error) return { error: error.message };
  revalidatePath('/admin/courses');
  return { data: { id: data.id } };
}

export async function updateQuizQuestion(
  id: string,
  input: QuizQuestionInput
) {
  const r = await requireAdmin();
  if (r.error) return { error: r.error };

  if (!input.options.length) {
    return { error: 'At least one option required' };
  }
  const hasCorrect = input.options.some((o) => o.is_correct);
  if (!hasCorrect) {
    return { error: 'At least one option must be marked correct' };
  }

  const { error } = await r.supabase
    .from('quiz_questions')
    .update({
      question_text: input.question_text,
      question_type: input.question_type,
      options: input.options,
      sort_order: input.sort_order ?? 0,
    })
    .eq('id', id);

  if (error) return { error: error.message };
  revalidatePath('/admin/courses');
  return {};
}

export async function deleteQuizQuestion(id: string) {
  const r = await requireAdmin();
  if (r.error) return { error: r.error };

  const { error } = await r.supabase.from('quiz_questions').delete().eq('id', id);
  if (error) return { error: error.message };
  revalidatePath('/admin/courses');
  return {};
}

/**
 * Submits a quiz answer for the current user. Learners only.
 */
export async function submitQuizAttempt(
  quizQuestionId: string,
  selectedOptionIndex: number
): Promise<{ error?: string; isCorrect?: boolean }> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const { data: question } = await supabase
    .from('quiz_questions')
    .select('options')
    .eq('id', quizQuestionId)
    .single();

  if (!question?.options) return { error: 'Question not found' };

  const options = question.options as { text: string; is_correct: boolean }[];
  const option = options[selectedOptionIndex];
  if (!option) return { error: 'Invalid option' };

  const isCorrect = !!option.is_correct;

  const { error } = await supabase.from('quiz_attempts').insert({
    user_id: user.id,
    quiz_question_id: quizQuestionId,
    selected_option_index: selectedOptionIndex,
    is_correct: isCorrect,
  });

  if (error) return { error: error.message };
  revalidatePath('/courses');
  return { isCorrect };
}
