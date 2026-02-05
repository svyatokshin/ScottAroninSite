import Link from 'next/link';

/**
 * Custom 404 page. Styled to match site branding.
 */
export default function NotFound() {
  return (
    <div className="min-h-screen py-24 flex flex-col items-center justify-center px-4">
      <h1 className="text-6xl sm:text-8xl font-serif font-light text-gray-900 mb-4">
        404
      </h1>
      <p className="text-xl text-gray-600 mb-8 text-center">
        Page not found
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-lg font-semibold text-white bg-[#0D47A1] hover:bg-[#1565C0] transition-colors min-h-[44px] inline-flex items-center justify-center"
      >
        Go home
      </Link>
    </div>
  );
}
