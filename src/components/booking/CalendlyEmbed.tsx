'use client';

import { useEffect, useRef } from 'react';

interface CalendlyEmbedProps {
  url: string;
  className?: string;
}

export default function CalendlyEmbed({ url, className }: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (scriptLoadedRef.current) {
      initWidget();
      return;
    }

    const existing = document.querySelector(
      'script[src="https://assets.calendly.com/assets/external/widget.js"]',
    );
    if (existing) {
      scriptLoadedRef.current = true;
      initWidget();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => {
      scriptLoadedRef.current = true;
      initWidget();
    };
    document.head.appendChild(script);

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://assets.calendly.com/assets/external/widget.css';
    document.head.appendChild(link);

    function initWidget() {
      const win = window as unknown as Record<string, unknown>;
      if (win.Calendly && containerRef.current) {
        (win.Calendly as { initInlineWidget: (opts: Record<string, unknown>) => void }).initInlineWidget({
          url,
          parentElement: containerRef.current,
        });
      }
    }
  }, [url]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ minWidth: '320px', height: '700px' }}
      aria-label="Schedule an appointment"
    />
  );
}
