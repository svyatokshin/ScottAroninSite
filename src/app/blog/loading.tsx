/**
 * Loading state for blog list.
 */
export default function BlogLoading() {
  return (
    <div className="min-h-screen py-16 flex items-center justify-center">
      <div className="animate-pulse text-gray-500">Loading blog...</div>
    </div>
  );
}
