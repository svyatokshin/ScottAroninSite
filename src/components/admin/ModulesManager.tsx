'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createModule, updateModule, deleteModule } from '@/app/actions/courses';

interface Module {
  id: string;
  title: string;
  sort_order: number;
  lessons?: { id: string }[];
}

interface ModulesManagerProps {
  courseId: string;
  modules: Module[];
}

/**
 * Manages course modules: add, edit title, delete.
 * Used on course edit page alongside CourseForm.
 */
export default function ModulesManager({
  courseId,
  modules: initialModules,
}: ModulesManagerProps) {
  const router = useRouter();
  const [modules, setModules] = useState(initialModules);
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [isAddingModule, setIsAddingModule] = useState(false);

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

  const handleStartEdit = (mod: Module) => {
    setEditingId(mod.id);
    setEditingTitle(mod.title);
  };

  const handleSaveEdit = async () => {
    if (!editingId || !editingTitle.trim()) return;
    const result = await updateModule(editingId, courseId, {
      title: editingTitle.trim(),
      sort_order: modules.find((m) => m.id === editingId)?.sort_order ?? 0,
    });
    if (result.error) alert(result.error);
    else {
      setEditingId(null);
      setEditingTitle('');
      router.refresh();
    }
  };

  const handleDeleteModule = async (moduleId: string) => {
    if (!confirm('Delete this module and all its lessons?')) return;
    const result = await deleteModule(moduleId, courseId);
    if (result.error) alert(result.error);
    else router.refresh();
  };

  return (
    <div className="mt-12 pt-8 border-t border-bgDark-2/20">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Modules</h2>
      <p className="text-sm text-gray-600 mb-4">
        Organize lessons into modules. Add lessons from the Lessons page.
      </p>

      <div className="space-y-3 mb-6">
        {modules.map((mod) => (
          <div
            key={mod.id}
            className="flex items-center gap-2 p-3 rounded-lg border border-bgDark-2/20 bg-white"
          >
            {editingId === mod.id ? (
              <>
                <input
                  type="text"
                  value={editingTitle}
                  onChange={(e) => setEditingTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSaveEdit();
                    if (e.key === 'Escape') {
                      setEditingId(null);
                      setEditingTitle('');
                    }
                  }}
                  className="flex-1 px-3 py-2 border border-bgDark-2/50 rounded-lg min-h-[44px]"
                  autoFocus
                  aria-label="Edit module title"
                />
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="px-3 py-2 rounded-lg font-medium text-white bg-zen-blue hover:bg-zen-blue-dark min-h-[44px]"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setEditingTitle('');
                  }}
                  className="px-3 py-2 rounded-lg font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 min-h-[44px]"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span className="flex-1 font-medium text-gray-900">{mod.title}</span>
                <span className="text-sm text-gray-500">
                  {mod.lessons?.length ?? 0} lesson{(mod.lessons?.length ?? 0) !== 1 ? 's' : ''}
                </span>
                <Link
                  href={`/admin/courses/${courseId}/lessons`}
                  className="text-sm text-bgDark-2 hover:underline"
                >
                  Manage
                </Link>
                <button
                  type="button"
                  onClick={() => handleStartEdit(mod)}
                  className="text-sm text-bgDark-2 hover:underline"
                  aria-label={`Edit ${mod.title}`}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteModule(mod.id)}
                  className="text-sm text-red-600 hover:underline"
                  aria-label={`Delete ${mod.title}`}
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>

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
          aria-label="New module title"
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
