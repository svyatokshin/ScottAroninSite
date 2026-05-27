'use client';

import { useRouter, useSearchParams } from 'next/navigation';

const SECTIONS = [
  { value: '', label: 'All' },
  { value: 'mind-body', label: 'Mind-Body' },
  { value: 'fitness', label: 'Fitness' },
  { value: 'nutrition', label: 'Nutrition' },
] as const;

export default function ResearchSectionTabs() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = searchParams.get('section') ?? '';

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('section', value);
    } else {
      params.delete('section');
    }
    router.push(`/admin/research?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      {SECTIONS.map((tab) => {
        const isActive = current === tab.value;
        return (
          <button
            key={tab.value}
            type="button"
            onClick={() => handleTabChange(tab.value)}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              isActive
                ? 'bg-zen-blue text-white'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
