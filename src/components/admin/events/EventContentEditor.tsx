import { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import { Card, CardContent } from "@/components/ui/card";
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
      isDrawingMode: false,
      selection: true,
    });

    if (initialContent) {
      fabricCanvas.loadFromJSON(initialContent, () => {
        fabricCanvas.renderAll();
      });
    }

    fabricCanvas.on('object:added', (e) => {
      if (e.target) {
        e.target.set({
          selectable: true,
          hasControls: true,
          hasBorders: true,
          lockMovementX: false,
          lockMovementY: false,
        });
      }
    });

    fabricCanvas.on('mouse:dblclick', (options) => {
      const pointer = fabricCanvas.getPointer(options.e);
      const text = new fabric.IText('Click to edit text', {
        left: pointer.x,
        top: pointer.y,
        fontFamily: selectedFont,
        fontSize: parseInt(fontSize),
        fill: textColor,
        width: 300,
        editable: true,
      });
      
      fabricCanvas.add(text);
      fabricCanvas.setActiveObject(text);
      text.enterEditing();
      text.selectAll();
      fabricCanvas.requestRenderAll();
      const json = fabricCanvas.toJSON();
      onChange(JSON.stringify(json));
    });

    fabricCanvas.on('text:changed', (e) => {
      fabricCanvas.requestRenderAll();
      const json = fabricCanvas.toJSON();
      onChange(JSON.stringify(json));
    });

    fabricCanvas.on("object:modified", () => {
      const json = fabricCanvas.toJSON();
      onChange(JSON.stringify(json));
    });

    fabricCanvas.on("object:moving", () => {
      const json = fabricCanvas.toJSON();
      onChange(JSON.stringify(json));
    });

    fabricCanvas.on("object:scaling", () => {
      const json = fabricCanvas.toJSON();
      onChange(JSON.stringify(json));
    });

    setCanvas(fabricCanvas);

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  const handleFontChange = (newFont: string) => {
    setSelectedFont(newFont);
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject instanceof fabric.IText) {
      activeObject.set('fontFamily', newFont);
      canvas.renderAll();
      const json = canvas.toJSON();
      onChange(JSON.stringify(json));
    }
  };

  const handleFontSizeChange = (newSize: string) => {
    setFontSize(newSize);
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject instanceof fabric.IText) {
      activeObject.set('fontSize', parseInt(newSize));
      canvas.renderAll();
      const json = canvas.toJSON();
      onChange(JSON.stringify(json));
    }
  };

  const handleColorChange = (newColor: string) => {
    setTextColor(newColor);
    if (!canvas) return;
    const activeObject = canvas.getActiveObject();
    if (activeObject && activeObject instanceof fabric.IText) {
      activeObject.set('fill', newColor);
      canvas.renderAll();
      const json = canvas.toJSON();
      onChange(JSON.stringify(json));
    }
  };

  const addText = () => {
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
    if (!canvas || !e.target.files?.[0]) return;
    console.log("Uploading image:", e.target.files[0].name);
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target?.result) return;
      console.log("Image loaded into FileReader");
      
      const imgElement = new Image();
      imgElement.src = event.target.result.toString();
      imgElement.onload = () => {
        const fabricImage = new fabric.Image(imgElement, {
          left: 50,
          top: 50,
          cornerSize: 10,
          hasControls: true,
          hasBorders: true,
          selectable: true,
        });

        const maxSize = 300;
        const scale = Math.min(maxSize / fabricImage.width!, maxSize / fabricImage.height!);
        fabricImage.scale(scale);

        canvas.add(fabricImage);
        canvas.setActiveObject(fabricImage);
        canvas.requestRenderAll();
        const json = canvas.toJSON();
        onChange(JSON.stringify(json));
      };
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
      canvas.requestRenderAll();
      const json = canvas.toJSON();
      onChange(JSON.stringify(json));
    }
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <EditorToolbar
          selectedFont={selectedFont}
          setSelectedFont={handleFontChange}
          fontSize={fontSize}
          setFontSize={handleFontSizeChange}
          textColor={textColor}
          setTextColor={handleColorChange}
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
