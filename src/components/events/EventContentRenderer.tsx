
import { useEffect, useRef } from 'react';

interface EventContentRendererProps {
  content: string;
}

const EventContentRenderer = ({ content }: EventContentRendererProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!content) return;

    if (contentRef.current) {
      contentRef.current.innerHTML = content;
    }
  }, [content]);

  return (
    <div className="w-full">
      <div 
        ref={contentRef}
        className="prose max-w-none event-content"
      />
    </div>
  );
};

export default EventContentRenderer;
