'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createModule, updateModule, deleteModule, deleteLesson } from '@/app/actions/courses';

interface Lesson {
  id: string;
  title: string;
  slug: string;
  media_type: string | null;
  sort_order: number;
}

interface Module {
  id: string;
  title: string;
  sort_order: number;
  lessons: Lesson[];
}

interface LessonsManagerProps {
  courseId: string;
  courseTitle: string;
  modules: Module[];
}

/**
 * Manages modules and lessons for a course.
 */
export default function LessonsManager({
  courseId,
  courseTitle,
  modules: initialModules,
}: LessonsManagerProps) {
  const router = useRouter();
  const [modules, setModules] = useState(initialModules);
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [isAddingModule, setIsAddingModule] = useState(false);
  const [editingModuleId, setEditingModuleId] = useState<string | null>(null);
  const [editingModuleTitle, setEditingModuleTitle] = useState('');
  const [expandedModule, setExpandedModule] = useState<string | null>(
    initialModules[0]?.id ?? null
  );

  const handleAddModule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newModuleTitle.trim()) return;
    setIsAddingModule(true);
    const result = await createModule(courseId, {
      title: newModuleTitle.trim(),
      sort_order: modules.length,
    });
    if (result.error) {
      alert(result.error);
    } else {
      setNewModuleTitle('');
      router.refresh();
    }
    setIsAddingModule(false);
  };

  const handleStartEditModule = (mod: Module) => {
    setEditingModuleId(mod.id);
    setEditingModuleTitle(mod.title);
  };

  const handleSaveEditModule = async () => {
    if (!editingModuleId || !editingModuleTitle.trim()) return;
    const mod = modules.find((m) => m.id === editingModuleId);
    if (!mod) return;
    const result = await updateModule(editingModuleId, courseId, {
      title: editingModuleTitle.trim(),
      sort_order: mod.sort_order,
    });
    if (result.error) alert(result.error);
    else {
      setEditingModuleId(null);
      setEditingModuleTitle('');
      router.refresh();
    }
  };

  const handleDeleteModule = async (moduleId: string) => {
    if (!confirm('Delete this module and all its lessons?')) return;
    const result = await deleteModule(moduleId, courseId);
    if (result.error) alert(result.error);
    else router.refresh();
  };

  const handleDeleteLesson = async (lessonId: string) => {
    if (!confirm('Delete this lesson?')) return;
    const result = await deleteLesson(lessonId);
    if (result.error) alert(result.error);
    else router.refresh();
  };

  return (
    <div className="space-y-4">
      {modules.map((mod) => (
        <div
          key={mod.id}
          className="bg-white rounded-xl border border-bgDark-2/20 overflow-hidden"
        >
          <button
            type="button"
            onClick={() =>
              editingModuleId !== mod.id &&
              setExpandedModule(expandedModule === mod.id ? null : mod.id)
            }
            className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
          >
            {editingModuleId === mod.id ? (
              <div className="flex-1 flex gap-2" onClick={(e) => e.stopPropagation()}>
                <input
                  type="text"
                  value={editingModuleTitle}
                  onChange={(e) => setEditingModuleTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveEditModule();
                    if (e.key === 'Escape') {
                      setEditingModuleId(null);
                      setEditingModuleTitle('');
                    }
                  }}
                  className="flex-1 px-3 py-2 border border-bgDark-2/50 rounded-lg min-h-[44px]"
                  autoFocus
                  aria-label="Edit module title"
                />
                <button
                  type="button"
                  onClick={handleSaveEditModule}
                  className="px-3 py-2 rounded-lg font-medium text-white bg-zen-blue hover:bg-zen-blue-dark min-h-[44px]"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingModuleId(null);
                    setEditingModuleTitle('');
                  }}
                  className="px-3 py-2 rounded-lg font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 min-h-[44px]"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <span className="font-medium text-gray-900">{mod.title}</span>
                <span className="text-sm text-gray-500">
                  {mod.lessons.length} lesson{mod.lessons.length !== 1 ? 's' : ''}
                </span>
              </>
            )}
          </button>

          {expandedModule === mod.id && (
            <div className="border-t border-gray-100 px-6 py-4 space-y-2">
              {mod.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between py-2 px-3 rounded-lg bg-gray-50"
                >
                  <Link
                    href={`/admin/courses/${courseId}/lessons/${mod.id}/lesson/${lesson.id}/edit`}
                    className="text-bgDark-2 hover:underline font-medium"
                  >
                    {lesson.title}
                  </Link>
                  <div className="flex items-center gap-2">
                    {lesson.media_type && (
                      <span className="text-xs text-gray-500 capitalize">
                        {lesson.media_type}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDeleteLesson(lesson.id)}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
              <Link
                href={`/admin/courses/${courseId}/lessons/${mod.id}/lesson/new`}
                className="block py-2 text-sm text-bgDark-2 hover:underline"
              >
                + Add lesson
              </Link>
            </div>
          )}

          <div className="px-6 pb-4 flex gap-2">
            {editingModuleId !== mod.id && (
              <button
                type="button"
                onClick={() => handleStartEditModule(mod)}
                className="text-sm text-bgDark-2 hover:underline"
              >
                Edit
              </button>
            )}
            <button
              type="button"
              onClick={() => handleDeleteModule(mod.id)}
              className="text-sm text-red-600 hover:underline"
            >
              Delete module
            </button>
          </div>
        </div>
      ))}

      <form
        onSubmit={handleAddModule}
        className="flex gap-2 items-center p-4 bg-gray-50 rounded-xl"
      >
        <input
          type="text"
          value={newModuleTitle}
          onChange={(e) => setNewModuleTitle(e.target.value)}
          placeholder="New module title"
          className="flex-1 px-4 py-2 border border-bgDark-2/50 rounded-lg focus:ring-2 focus:ring-bgDark-2/60 min-h-[44px]"
          disabled={isAddingModule}
        />
        <button
          type="submit"
          disabled={isAddingModule || !newModuleTitle.trim()}
          className="px-4 py-2 rounded-lg font-medium text-white bg-zen-blue hover:bg-zen-blue-dark disabled:opacity-50 min-h-[44px]"
        >
          Add Module
        </button>
      </form>
    </div>
  );
}
