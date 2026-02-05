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
    <div className={className}>
      <ReactMarkdown
        components={{
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1C6ED5] hover:underline"
            >
              {children}
            </a>
          ),
          strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
          ul: ({ children }) => <ul className="list-disc pl-6 my-3 space-y-1">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal pl-6 my-3 space-y-1">{children}</ol>,
          p: ({ children }) => <p className="my-3">{children}</p>,
          h2: ({ children }) => (
            <h2 className="text-xl font-semibold text-gray-900 mt-6 mb-2">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">{children}</h3>
          ),
          code: ({ children }) => (
            <code className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-800 text-sm font-mono">
              {children}
            </code>
          ),
          pre: ({ children }) => (
            <pre className="my-3 p-4 rounded-lg bg-gray-100 overflow-x-auto text-sm">
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
