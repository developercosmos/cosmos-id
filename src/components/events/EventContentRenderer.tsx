
import { useEffect, useRef } from 'react';
import { Canvas } from 'fabric';

interface EventContentRendererProps {
  content: string;
}

const EventContentRenderer = ({ content }: EventContentRendererProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !content) return;

    try {
      const contentObj = JSON.parse(content);
      
      // If it's a Fabric.js canvas JSON
      if (contentObj.version && contentObj.objects) {
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
      console.error('Error parsing content:', e);
      // If parsing fails, treat it as regular HTML content
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }
  }, [content]);

  return (
    <div className="w-full">
      {content && (
        <div className="mt-4">
          <canvas ref={canvasRef} className="w-full rounded-lg shadow-md" />
        </div>
      )}
    </div>
  );
};

export default EventContentRenderer;
