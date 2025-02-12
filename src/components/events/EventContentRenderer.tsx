
import { useEffect, useRef } from 'react';
import { Canvas } from 'fabric';

interface EventContentRendererProps {
  content: string;
}

const EventContentRenderer = ({ content }: EventContentRendererProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!content) return;

    try {
      // Try to parse as JSON (for Fabric.js canvas content)
      const contentObj = JSON.parse(content);
      
      if (contentObj.version && contentObj.objects && canvasRef.current) {
        const canvas = new Canvas(canvasRef.current);
        canvas.setDimensions({ width: 800, height: 400 });

        // Load the canvas state from JSON
        canvas.loadFromJSON(contentObj, () => {
          canvas.renderAll();
        });

        return () => {
          canvas.dispose();
        };
      }
    } catch (e) {
      // If parsing fails, it's HTML content
      if (contentRef.current) {
        contentRef.current.innerHTML = content;
      }
    }
  }, [content]);

  return (
    <div className="w-full">
      <canvas ref={canvasRef} className="w-full rounded-lg shadow-md" />
      <div 
        ref={contentRef}
        className="prose max-w-none"
      />
    </div>
  );
};

export default EventContentRenderer;
