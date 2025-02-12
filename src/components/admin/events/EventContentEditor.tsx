
import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { Card, CardContent } from "../../ui/card";
import { EditorToolbar } from "./editor/EditorToolbar";

interface EventContentEditorProps {
  initialContent?: string;
  onChange: (content: string) => void;
}

export const EventContentEditor = ({ initialContent, onChange }: EventContentEditorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [fontSize, setFontSize] = useState("16");
  const [textColor, setTextColor] = useState("#000000");

  // Setup canvas and load initial content
  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "#ffffff",
    });

    setCanvas(fabricCanvas);

    // Set up event listeners
    const handleModification = () => {
      const json = fabricCanvas.toJSON();
      onChange(JSON.stringify(json));
    };

    fabricCanvas.on('object:modified', handleModification);
    fabricCanvas.on('text:changed', handleModification);

    // Immediately load initial content if available
    if (initialContent) {
      try {
        fabricCanvas.loadFromJSON(initialContent, () => {
          fabricCanvas.renderAll();
          console.log("Initial content loaded successfully");
        });
      } catch (error) {
        console.error("Error loading initial content:", error);
      }
    }

    return () => {
      fabricCanvas.off('object:modified', handleModification);
      fabricCanvas.off('text:changed', handleModification);
      fabricCanvas.dispose();
    };
  }, [initialContent]); // Added initialContent as dependency

  // Handle double-click for adding text
  useEffect(() => {
    if (!canvas) return;

    const handleDblClick = (options: fabric.TPointerEventInfo<fabric.TPointerEvent>) => {
      const pointer = canvas.getPointer(options.e);
      const text = new fabric.IText('Click to edit text', {
        left: pointer.x,
        top: pointer.y,
        fontFamily: selectedFont,
        fontSize: parseInt(fontSize),
        fill: textColor,
        width: 300,
        editable: true,
      });
      
      canvas.add(text);
      canvas.setActiveObject(text);
      text.enterEditing();
      text.selectAll();
      canvas.requestRenderAll();
      const json = canvas.toJSON();
      onChange(JSON.stringify(json));
    };

    canvas.on('mouse:dblclick', handleDblClick);

    return () => {
      canvas.off('mouse:dblclick', handleDblClick);
    };
  }, [canvas, selectedFont, fontSize, textColor]);

  const addText = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!canvas) return;
    
    const text = new fabric.IText("Click to edit text", {
      left: 50,
      top: 50,
      fontFamily: selectedFont,
      fontSize: parseInt(fontSize),
      fill: textColor,
      width: 300,
      editable: true,
    });
    
    canvas.add(text);
    canvas.setActiveObject(text);
    text.enterEditing();
    text.selectAll();
    canvas.requestRenderAll();
    const json = canvas.toJSON();
    onChange(JSON.stringify(json));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!canvas || !e.target.files?.[0]) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target?.result) return;
      
      fabric.Image.fromURL(event.target.result.toString(), {
        crossOrigin: 'anonymous'
      }).then((img) => {
        img.scale(0.5);
        canvas.add(img);
        canvas.setActiveObject(img);
        const json = canvas.toJSON();
        onChange(JSON.stringify(json));
      });
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const applyTextStyle = (style: string) => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (!activeObject || !(activeObject instanceof fabric.IText)) return;

    switch (style) {
      case 'bold':
        activeObject.set('fontWeight', activeObject.fontWeight === 'bold' ? 'normal' : 'bold');
        break;
      case 'italic':
        activeObject.set('fontStyle', activeObject.fontStyle === 'italic' ? 'normal' : 'italic');
        break;
      case 'underline':
        activeObject.set('underline', !activeObject.underline);
        break;
      case 'alignLeft':
        activeObject.set('textAlign', 'left');
        break;
      case 'alignCenter':
        activeObject.set('textAlign', 'center');
        break;
      case 'alignRight':
        activeObject.set('textAlign', 'right');
        break;
      case 'h1':
        activeObject.set('fontSize', 32);
        break;
      case 'h2':
        activeObject.set('fontSize', 24);
        break;
      case 'quote':
        activeObject.set({
          fontStyle: 'italic',
          textAlign: 'center',
          padding: 20
        });
        break;
      case 'bulletList':
        activeObject.set('text', '• ' + activeObject.text);
        break;
      case 'numberedList':
        activeObject.set('text', '1. ' + activeObject.text);
        break;
    }

    canvas.renderAll();
    const json = canvas.toJSON();
    onChange(JSON.stringify(json));
  };

  const deleteSelected = () => {
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject) {
      canvas.remove(activeObject);
      const json = canvas.toJSON();
      onChange(JSON.stringify(json));
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-full">
      <Card className="w-full">
        <CardContent className="p-6">
          <EditorToolbar
            selectedFont={selectedFont}
            setSelectedFont={setSelectedFont}
            fontSize={fontSize}
            setFontSize={setFontSize}
            textColor={textColor}
            setTextColor={setTextColor}
            onStyleClick={applyTextStyle}
            onAddText={addText}
            onImageUpload={handleImageUpload}
            onDelete={deleteSelected}
          />

          <div className="border border-gray-200 rounded-lg overflow-hidden mt-4">
            <canvas ref={canvasRef} className="max-w-full" />
          </div>
        </CardContent>
      </Card>
    </form>
  );
};
