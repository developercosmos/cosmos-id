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

  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "#ffffff",
    });

    if (initialContent) {
      fabricCanvas.loadFromJSON(initialContent, () => {
        fabricCanvas.renderAll();
      });
    }

    fabricCanvas.on("object:modified", () => {
      const json = fabricCanvas.toJSON();
      onChange(JSON.stringify(json));
    });

    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  const addText = () => {
    if (!canvas) return;
    const text = new fabric.IText("Click to edit text", {
      left: 50,
      top: 50,
      fontFamily: selectedFont,
      fontSize: parseInt(fontSize),
      fill: textColor,
      width: 300,
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    const json = canvas.toJSON();
    onChange(JSON.stringify(json));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!canvas || !e.target.files?.[0]) return;
    console.log("Uploading image:", e.target.files[0].name);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target?.result) return;
      console.log("Image loaded into FileReader");
      
      fabric.Image.fromURL(event.target.result.toString(), {
        crossOrigin: 'anonymous'
      }).then((img) => {
        console.log("Image created from URL");
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

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <canvas ref={canvasRef} className="max-w-full" />
        </div>
      </CardContent>
    </Card>
  );
};