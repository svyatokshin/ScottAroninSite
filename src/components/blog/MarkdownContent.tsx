'use client';

import ReactMarkdown from 'react-markdown';

interface MarkdownContentProps {
  content: string;
  className?: string;
}

/**
 * Renders markdown blog content with prose styling. Supports **bold**, *italic*,
 * headings, lists, links, and code. Links open in a new tab.
 */
export default function MarkdownContent({ content, className = '' }: MarkdownContentProps) {
  if (!content?.trim()) return null;

  return (
    <div className={`text-gray-800 ${className}`}>
      <ReactMarkdown
        components={{
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#1C6ED5] underline decoration-[#1C6ED5]/30 underline-offset-4 transition-colors hover:text-[#1558ab]"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
          p: ({ children }) => (
            <p className="my-5 text-base leading-8 text-gray-700 sm:text-lg">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="my-5 list-disc space-y-2 pl-6 text-base leading-8 text-gray-700 marker:text-[#1C6ED5] sm:text-lg">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-5 list-decimal space-y-2 pl-6 text-base leading-8 text-gray-700 marker:font-semibold marker:text-[#1C6ED5] sm:text-lg">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="pl-1">{children}</li>,
          h1: ({ children }) => (
            <h1 className="mt-12 mb-5 font-playfair text-4xl font-light leading-tight text-gray-900 sm:text-5xl">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="mt-12 mb-4 font-playfair text-3xl font-light leading-tight text-gray-900 sm:text-4xl">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-10 mb-3 text-xl font-semibold text-gray-900 sm:text-2xl">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="mt-8 mb-3 text-lg font-semibold text-gray-900 sm:text-xl">{children}</h4>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-8 rounded-r-2xl border-l-4 border-[#1C6ED5]/70 bg-[#1C6ED5]/5 py-4 pl-5 pr-4 text-lg font-medium leading-relaxed text-gray-900">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="my-10 border-gray-200" />,
          code: ({ children }) => (
            <code className="rounded bg-gray-100 px-1.5 py-0.5 font-mono text-[0.95em] text-gray-800">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="my-6 overflow-x-auto rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm leading-6 text-gray-800 sm:p-5">
              {children}
            </pre>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
