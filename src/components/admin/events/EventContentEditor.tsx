
import { useEffect, useState } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { $createParagraphNode, $getRoot } from "lexical";
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html";
import * as fabric from "fabric";
import { Card, CardContent } from "@/components/ui/card";
import { EditorToolbar } from "./editor/EditorToolbar";
import { useToast } from "@/components/ui/use-toast";

interface EventContentEditorProps {
  initialContent?: string;
  onChange: (content: string) => void;
}

function EditorController({ onChange }: { onChange: (html: string) => void }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.registerUpdateListener(({ editorState }) => {
      editorState.read(() => {
        const htmlString = $generateHtmlFromNodes(editor);
        onChange(htmlString);
      });
    });
  }, [editor, onChange]);

  return null;
}

export const EventContentEditor = ({ initialContent, onChange }: EventContentEditorProps) => {
  const [selectedFont, setSelectedFont] = useState("Arial");
  const [fontSize, setFontSize] = useState("16");
  const [textColor, setTextColor] = useState("#000000");
  const { toast } = useToast();
  const [imageCanvas, setImageCanvas] = useState<fabric.Canvas | null>(null);

  const initialConfig = {
    namespace: "EventEditor",
    theme: {
      paragraph: "mb-2",
      text: {
        bold: "font-bold",
        italic: "italic",
        underline: "underline",
      },
    },
    onError: (error: Error) => {
      console.error(error);
      toast({
        title: "Editor Error",
        description: error.message,
        variant: "destructive",
      });
    },
  };

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
        const canvasElement = document.getElementById('image-canvas') as HTMLCanvasElement;
        if (canvasElement) {
          const imgSrc = canvasElement.toDataURL();
          const imageNode = document.createElement('img');
          imageNode.src = imgSrc;
          const selection = window.getSelection();
          if (selection?.rangeCount) {
            selection.getRangeAt(0).insertNode(imageNode);
          }
        }
      };
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const applyTextStyle = (style: string) => {
    const editor = document.querySelector('[contenteditable="true"]');
    if (!editor) return;

    const selection = window.getSelection();
    if (!selection?.rangeCount) return;

    switch (style) {
      case 'bold':
        document.execCommand('bold', false);
        break;
      case 'italic':
        document.execCommand('italic', false);
        break;
      case 'underline':
        document.execCommand('underline', false);
        break;
      case 'alignLeft':
        document.execCommand('justifyLeft', false);
        break;
      case 'alignCenter':
        document.execCommand('justifyCenter', false);
        break;
      case 'alignRight':
        document.execCommand('justifyRight', false);
        break;
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
          onAddText={() => {}}
          onImageUpload={handleImageUpload}
          onDelete={() => document.execCommand('delete', false)}
        />

        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <LexicalComposer initialConfig={initialConfig}>
            <div className="relative min-h-[400px] p-4">
              <RichTextPlugin
                contentEditable={
                  <ContentEditable className="min-h-[400px] outline-none" />
                }
                placeholder={
                  <div className="absolute top-4 left-4 text-gray-400">
                    Start typing...
                  </div>
                }
              />
              <HistoryPlugin />
              <EditorController onChange={onChange} />
            </div>
          </LexicalComposer>
          <canvas id="image-canvas" style={{ display: 'none' }} />
        </div>
      </CardContent>
    </Card>
  );
};
