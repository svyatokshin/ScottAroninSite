'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  createResearchArticle,
  updateResearchArticle,
  type ResearchArticleInput,
  type ResearchFindingInput,
  type ResearchStatisticInput,
  type ResearchStudyInput,
  type ResearchSection,
} from '@/app/actions/research';

interface ResearchArticleFormProps {
  articleId?: string;
  initialData?: {
    section: ResearchSection;
    title: string;
    summary: string;
    key_findings: ResearchFindingInput[];
    statistics: ResearchStatisticInput[];
    related_studies: ResearchStudyInput[];
    sort_order: number;
  };
}

const EMPTY_FINDING: ResearchFindingInput = {
  finding: '',
  description: '',
  source: '',
};

const EMPTY_STAT: ResearchStatisticInput = {
  statistic: '',
  context: '',
  source: '',
};

const EMPTY_STUDY: ResearchStudyInput = {
  title: '',
  authors: '',
  year: new Date().getFullYear(),
  journal: '',
  url: '',
};

export default function ResearchArticleForm({
  articleId,
  initialData,
}: ResearchArticleFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [section, setSection] = useState<ResearchSection>(
    initialData?.section ?? 'mind-body',
  );
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [summary, setSummary] = useState(initialData?.summary ?? '');
  const [sortOrder, setSortOrder] = useState(initialData?.sort_order ?? 0);

  const [findings, setFindings] = useState<ResearchFindingInput[]>(
    initialData?.key_findings?.length ? initialData.key_findings : [{ ...EMPTY_FINDING }],
  );
  const [statistics, setStatistics] = useState<ResearchStatisticInput[]>(
    initialData?.statistics?.length ? initialData.statistics : [{ ...EMPTY_STAT }],
  );
  const [studies, setStudies] = useState<ResearchStudyInput[]>(
    initialData?.related_studies?.length ? initialData.related_studies : [{ ...EMPTY_STUDY }],
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    setIsSubmitting(true);

    const input: ResearchArticleInput = {
      section,
      title: title.trim(),
      summary: summary.trim() || undefined,
      key_findings: findings.filter((f) => f.finding.trim()),
      statistics: statistics.filter((s) => s.statistic.trim()),
      related_studies: studies.filter((s) => s.title.trim()),
      sort_order: sortOrder,
    };

    const result = articleId
      ? await updateResearchArticle(articleId, input)
      : await createResearchArticle(input);

    setIsSubmitting(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    router.push('/admin/research');
    router.refresh();
  };

  const inputClass =
    'w-full px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-zen-blue/40 focus:border-zen-blue transition-colors';
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1.5';

  const updateFinding = (idx: number, field: keyof ResearchFindingInput, value: string) => {
    const next = [...findings];
    next[idx] = { ...next[idx], [field]: value };
    setFindings(next);
  };

  const updateStat = (idx: number, field: keyof ResearchStatisticInput, value: string) => {
    const next = [...statistics];
    next[idx] = { ...next[idx], [field]: value };
    setStatistics(next);
  };

  const updateStudy = (idx: number, field: keyof ResearchStudyInput, value: string | number) => {
    const next = [...studies];
    next[idx] = { ...next[idx], [field]: value };
    setStudies(next);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-8">
      {error && (
        <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Basic Info */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">General</h2>

        <div>
          <label htmlFor="section" className={labelClass}>
            Section <span className="text-red-500">*</span>
          </label>
          <select
            id="section"
            value={section}
            onChange={(e) => setSection(e.target.value as ResearchSection)}
            className={inputClass}
          >
            <option value="mind-body">Mind-Body</option>
            <option value="fitness">Fitness</option>
            <option value="nutrition">Nutrition</option>
          </select>
        </div>

        <div>
          <label htmlFor="title" className={labelClass}>
            Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={inputClass}
            placeholder="e.g. Mindfulness and Mental Health"
            required
          />
        </div>

        <div>
          <label htmlFor="summary" className={labelClass}>
            Summary
          </label>
          <textarea
            id="summary"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className={`${inputClass} min-h-[100px] resize-y`}
            placeholder="A brief description of this research topic..."
          />
        </div>

        <div>
          <label htmlFor="sortOrder" className={labelClass}>
            Sort Order
          </label>
          <input
            id="sortOrder"
            type="number"
            value={sortOrder}
            onChange={(e) => setSortOrder(Number(e.target.value))}
            className={`${inputClass} max-w-[120px]`}
          />
          <p className="text-xs text-gray-500 mt-1">
            Lower numbers appear first within the same section.
          </p>
        </div>
      </section>

      {/* Key Findings */}
      <section className="rounded-xl border border-gray-200 bg-gray-50/50 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Key Findings</h2>
          <button
            type="button"
            onClick={() => setFindings([...findings, { ...EMPTY_FINDING }])}
            className="px-3 py-1.5 text-sm font-medium rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Add Finding
          </button>
        </div>

        {findings.map((f, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-gray-200 bg-white p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">
                Finding {idx + 1}
              </span>
              <button
                type="button"
                onClick={() => {
                  const next = findings.filter((_, i) => i !== idx);
                  setFindings(next.length ? next : [{ ...EMPTY_FINDING }]);
                }}
                className="text-xs text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
            <input
              type="text"
              value={f.finding}
              onChange={(e) => updateFinding(idx, 'finding', e.target.value)}
              className={inputClass}
              placeholder="Finding title (e.g. Mindfulness reduces stress by 30%)"
            />
            <textarea
              value={f.description}
              onChange={(e) => updateFinding(idx, 'description', e.target.value)}
              className={`${inputClass} min-h-[60px] resize-y`}
              placeholder="Description of this finding..."
            />
            <input
              type="text"
              value={f.source}
              onChange={(e) => updateFinding(idx, 'source', e.target.value)}
              className={inputClass}
              placeholder="Source (e.g. Journal of Clinical Psychology, 2023)"
            />
          </div>
        ))}
      </section>

      {/* Key Statistics */}
      <section className="rounded-xl border border-gray-200 bg-gray-50/50 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Key Statistics
          </h2>
          <button
            type="button"
            onClick={() => setStatistics([...statistics, { ...EMPTY_STAT }])}
            className="px-3 py-1.5 text-sm font-medium rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Add Statistic
          </button>
        </div>

        {statistics.map((s, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-gray-200 bg-white p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">
                Statistic {idx + 1}
              </span>
              <button
                type="button"
                onClick={() => {
                  const next = statistics.filter((_, i) => i !== idx);
                  setStatistics(next.length ? next : [{ ...EMPTY_STAT }]);
                }}
                className="text-xs text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
            <input
              type="text"
              value={s.statistic}
              onChange={(e) => updateStat(idx, 'statistic', e.target.value)}
              className={inputClass}
              placeholder="Statistic value (e.g. 85%)"
            />
            <input
              type="text"
              value={s.context}
              onChange={(e) => updateStat(idx, 'context', e.target.value)}
              className={inputClass}
              placeholder="Context (e.g. of participants reported improved sleep)"
            />
            <input
              type="text"
              value={s.source}
              onChange={(e) => updateStat(idx, 'source', e.target.value)}
              className={inputClass}
              placeholder="Source (e.g. Sleep Medicine Journal, 2023)"
            />
          </div>
        ))}
      </section>

      {/* Related Studies */}
      <section className="rounded-xl border border-gray-200 bg-gray-50/50 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            Related Studies
          </h2>
          <button
            type="button"
            onClick={() => setStudies([...studies, { ...EMPTY_STUDY }])}
            className="px-3 py-1.5 text-sm font-medium rounded-lg bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Add Study
          </button>
        </div>

        {studies.map((s, idx) => (
          <div
            key={idx}
            className="rounded-lg border border-gray-200 bg-white p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">
                Study {idx + 1}
              </span>
              <button
                type="button"
                onClick={() => {
                  const next = studies.filter((_, i) => i !== idx);
                  setStudies(next.length ? next : [{ ...EMPTY_STUDY }]);
                }}
                className="text-xs text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
            <input
              type="text"
              value={s.title}
              onChange={(e) => updateStudy(idx, 'title', e.target.value)}
              className={inputClass}
              placeholder="Study title"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input
                type="text"
                value={s.authors}
                onChange={(e) => updateStudy(idx, 'authors', e.target.value)}
                className={inputClass}
                placeholder="Authors (e.g. Dr. Sarah Johnson et al.)"
              />
              <input
                type="number"
                value={s.year}
                onChange={(e) =>
                  updateStudy(idx, 'year', Number(e.target.value))
                }
                className={inputClass}
                placeholder="Year"
              />
            </div>
            <input
              type="text"
              value={s.journal}
              onChange={(e) => updateStudy(idx, 'journal', e.target.value)}
              className={inputClass}
              placeholder="Journal name"
            />
            <input
              type="url"
              value={s.url}
              onChange={(e) => updateStudy(idx, 'url', e.target.value)}
              className={inputClass}
              placeholder="URL (e.g. https://doi.org/...)"
            />
          </div>
        ))}
      </section>

      {/* Submit */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 text-sm font-medium rounded-lg bg-zen-blue text-white hover:bg-zen-blue/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting
            ? 'Saving...'
            : articleId
              ? 'Save Changes'
              : 'Create Article'}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2.5 text-sm font-medium rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
