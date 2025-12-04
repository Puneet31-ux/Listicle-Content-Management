import { useState } from 'react';
import { useUIStore } from '../stores/uiStore';
import { useProjectStore } from '../stores/projectStore';
import { CATEGORY_INFO, type OfferCategory } from '../types';
import { cn } from '../lib/utils';

export function CategoryDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedCategory, setSelectedCategory } = useUIStore();
  const { projects } = useProjectStore();

  console.log('CategoryDropdown rendering', { selectedCategory, projects });

  const categories: (OfferCategory | 'all')[] = [
    'all',
    'financial',
    'home-services',
    'health-wellness',
    'technology',
    'education',
    'automotive'
  ];

  const getProjectCount = (category: OfferCategory | 'all') => {
    if (!projects) return 0;
    if (category === 'all') return projects.length;
    return projects.filter(p => p.category === category).length;
  };

  const selectedInfo = selectedCategory === 'all'
    ? { label: 'All Categories', icon: '📁', color: 'bg-gray-500' }
    : CATEGORY_INFO[selectedCategory];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">{selectedInfo.icon}</span>
          <span className="font-medium">{selectedInfo.label}</span>
          <span className="text-sm text-gray-500">({getProjectCount(selectedCategory)})</span>
        </div>
        <svg
          className={cn('w-5 h-5 transition-transform', isOpen && 'rotate-180')}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute z-20 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-96 overflow-y-auto">
            {categories.map((category) => {
              const info = category === 'all'
                ? { label: 'All Categories', icon: '📁', color: 'bg-gray-500' }
                : CATEGORY_INFO[category];

              const count = getProjectCount(category);

              return (
                <button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsOpen(false);
                  }}
                  className={cn(
                    'w-full px-4 py-3 hover:bg-gray-50 flex items-center justify-between',
                    selectedCategory === category && 'bg-blue-50'
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{info.icon}</span>
                    <span className="font-medium">{info.label}</span>
                  </div>
                  <span className="text-sm text-gray-500">{count}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
