
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import { Card, CardContent } from "../../ui/card";
import { EditorToolbar } from "./editor/EditorToolbar";
import { useEffect } from 'react';

interface EventContentEditorProps {
  initialContent?: string;
  onChange: (content: string) => void;
}

export const EventContentEditor = ({ initialContent, onChange }: EventContentEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Underline,
      TextStyle,
      FontFamily,
      Color,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content: initialContent || '',
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [editor, initialContent]);

  const addText = () => {
    if (!editor) return;
    editor.commands.insertContent('<p>New text</p>');
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editor || !e.target.files?.[0]) return;
    
    const file = e.target.files[0];
    const reader = new FileReader();
    
    reader.onload = (event) => {
      if (!event.target?.result) return;
      editor.commands.setImage({ src: event.target.result.toString() });
    };
    
    reader.readAsDataURL(file);
  };

  const applyTextStyle = (style: string) => {
    if (!editor) return;

    switch (style) {
      case 'bold':
        editor.commands.toggleBold();
        break;
      case 'italic':
        editor.commands.toggleItalic();
        break;
      case 'underline':
        editor.commands.toggleUnderline();
        break;
      case 'alignLeft':
        editor.commands.setTextAlign('left');
        break;
      case 'alignCenter':
        editor.commands.setTextAlign('center');
        break;
      case 'alignRight':
        editor.commands.setTextAlign('right');
        break;
      case 'h1':
        editor.commands.toggleHeading({ level: 1 });
        break;
      case 'h2':
        editor.commands.toggleHeading({ level: 2 });
        break;
      case 'quote':
        editor.commands.toggleBlockquote();
        break;
      case 'bulletList':
        editor.commands.toggleBulletList();
        break;
      case 'numberedList':
        editor.commands.toggleOrderedList();
        break;
    }
  };

  const deleteSelected = () => {
    if (!editor) return;
    editor.commands.deleteSelection();
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full">
      <Card className="w-full">
        <CardContent className="p-6">
          <EditorToolbar
            selectedFont={editor.isActive('textStyle') ? 'Arial' : 'Arial'}
            setSelectedFont={(font) => editor.chain().focus().setFontFamily(font).run()}
            fontSize={editor.isActive('textStyle') ? '16' : '16'}
            setFontSize={(size) => editor.chain().focus().setFontSize(size).run()}
            textColor={editor.isActive('textStyle') ? '#000000' : '#000000'}
            setTextColor={(color) => editor.chain().focus().setColor(color).run()}
            onStyleClick={applyTextStyle}
            onAddText={addText}
            onImageUpload={handleImageUpload}
            onDelete={deleteSelected}
          />

          <div className="border border-gray-200 rounded-lg overflow-hidden mt-4 min-h-[400px] p-4">
            <EditorContent editor={editor} className="prose max-w-none" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
