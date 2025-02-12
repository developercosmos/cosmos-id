
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import { Color } from '@tiptap/extension-color';
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { EditorToolbar } from "./editor/EditorToolbar";
import { useToast } from "@/components/ui/use-toast";
import * as fabric from "fabric";

interface EventContentEditorProps {
  initialContent?: string;
  onChange: (content: string) => void;
}

export const EventContentEditor = ({ initialContent, onChange }: EventContentEditorProps) => {
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [fontSize, setFontSize] = useState("16");
  const [textColor, setTextColor] = useState("#000000");
  const { toast } = useToast();
  const [imageCanvas, setImageCanvas] = useState<fabric.Canvas | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      TextStyle,
      FontFamily,
      Color,
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor) {
      editor.commands.setFontFamily(selectedFont);
    }
  }, [selectedFont, editor]);

  useEffect(() => {
    if (editor) {
      editor.commands.setFontSize(fontSize + 'px');
    }
  }, [fontSize, editor]);

  useEffect(() => {
    if (editor) {
      editor.commands.setColor(textColor);
    }
  }, [textColor, editor]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      if (!event.target?.result) return;
      
      const img = new Image();
      img.src = event.target.result.toString();
      img.onload = () => {
        if (!imageCanvas) {
          const canvas = new fabric.Canvas('image-canvas', {
            width: 800,
            height: 400,
          });
          setImageCanvas(canvas);
        }

        const fabricImage = new fabric.Image(img, {
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

        imageCanvas?.clear();
        imageCanvas?.add(fabricImage);
        imageCanvas?.renderAll();

        // Insert the canvas into the editor
        if (editor) {
          const canvasElement = document.getElementById('image-canvas');
          if (canvasElement) {
            editor.commands.setImage({ src: canvasElement.toDataURL() });
          }
        }
      };
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const handleFontChange = (newFont: string) => {
    setSelectedFont(newFont);
    if (editor) {
      editor.chain().focus().setFontFamily(newFont).run();
    }
  };

  const handleFontSizeChange = (newSize: string) => {
    setFontSize(newSize);
    if (editor) {
      editor.chain().focus().setFontSize(newSize + 'px').run();
    }
  };

  const handleColorChange = (newColor: string) => {
    setTextColor(newColor);
    if (editor) {
      editor.chain().focus().setColor(newColor).run();
    }
  };

  const applyTextStyle = (style: string) => {
    if (!editor) return;

    switch (style) {
      case 'bold':
        editor.chain().focus().toggleBold().run();
        break;
      case 'italic':
        editor.chain().focus().toggleItalic().run();
        break;
      case 'underline':
        editor.chain().focus().toggleUnderline().run();
        break;
      case 'alignLeft':
        editor.chain().focus().setTextAlign('left').run();
        break;
      case 'alignCenter':
        editor.chain().focus().setTextAlign('center').run();
        break;
      case 'alignRight':
        editor.chain().focus().setTextAlign('right').run();
        break;
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
          onAddText={() => editor?.commands.focus()}
          onImageUpload={handleImageUpload}
          onDelete={() => editor?.commands.deleteSelection()}
        />

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <EditorContent editor={editor} className="prose max-w-none p-4" />
          <canvas id="image-canvas" style={{ display: 'none' }} />
        </div>
      </CardContent>
    </Card>
  );
};
