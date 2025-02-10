
import { Canvas } from 'fabric';

interface EventContentRendererProps {
  content: string;
}

const EventContentRenderer = ({ content }: EventContentRendererProps) => {
  const renderContent = () => {
    try {
      if (!content) return null;
      const contentObj = JSON.parse(content);
      
      // If it's a Fabric.js canvas JSON
      if (contentObj.version && contentObj.objects) {
        return (
          <div className="mt-4">
            {contentObj.objects.map((obj: any, index: number) => {
              if (obj.type === 'text' || obj.type === 'i-text') {
                return (
                  <p
                    key={index}
                    style={{
                      fontFamily: obj.fontFamily,
                      fontSize: obj.fontSize,
                      color: obj.fill,
                      textAlign: obj.textAlign as any,
                    }}
                  >
                    {obj.text}
                  </p>
                );
              }
              return null;
            })}
          </div>
        );
      }
      
      // If it's regular HTML content
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    } catch (e) {
      // If parsing fails, treat it as regular HTML content
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }
  };

  return renderContent();
};

export default EventContentRenderer;
