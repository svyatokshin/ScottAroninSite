import CourseForm from '@/components/admin/CourseForm';

/**
 * New course page.
 */
export default function NewCoursePage() {
  return (
    <div>
      <h1 className="text-2xl font-serif font-semibold text-gray-900 mb-8">
        New Course
      </h1>
      <CourseForm />
    </div>
  );
}
