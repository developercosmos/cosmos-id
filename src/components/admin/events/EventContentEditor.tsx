
import { useState, useEffect } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface EventContentEditorProps {
  initialContent?: string;
  onChange: (content: string) => void;
}

export const EventContentEditor = ({ initialContent, onChange }: EventContentEditorProps) => {
  const { toast } = useToast();
  const [editorState, setEditorState] = useState(() => {
    if (initialContent) {
      const contentBlock = htmlToDraft(initialContent);
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      return EditorState.createWithContent(contentState);
    }
    return EditorState.createEmpty();
  });

  useEffect(() => {
    const currentContent = editorState.getCurrentContent();
    const htmlContent = draftToHtml(convertToRaw(currentContent));
    onChange(htmlContent);
  }, [editorState, onChange]);

  const handleEditorStateChange = (newEditorState: EditorState) => {
    setEditorState(newEditorState);
  };

  const uploadCallback = (file: File): Promise<{ data: { link: string } }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve({ data: { link: e.target?.result as string } });
      };
      reader.onerror = (error) => {
        toast({
          title: "Upload Error",
          description: "Failed to upload image",
          variant: "destructive",
        });
        reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const editorStyle = {
    padding: '1rem',
    minHeight: '400px',
    backgroundColor: 'white',
  };

  const toolbarStyle = {
    backgroundColor: 'white',
    borderBottom: '1px solid #e5e7eb',
    marginBottom: '0.5rem',
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
          <Editor
            editorState={editorState}
            onEditorStateChange={handleEditorStateChange}
            wrapperClassName="rounded-lg border border-gray-200"
            editorClassName="px-4 py-2 min-h-[400px] focus:outline-none"
            toolbarClassName="border-b border-gray-200"
            editorStyle={editorStyle}
            toolbarStyle={toolbarStyle}
            toolbar={{
              options: [
                'inline', 
                'blockType', 
                'fontSize', 
                'fontFamily',
                'list', 
                'textAlign', 
                'colorPicker', 
                'link', 
                'embedded', 
                'emoji', 
                'image', 
                'remove', 
                'history'
              ],
              inline: {
                options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
              },
              image: {
                uploadCallback,
                previewImage: true,
                inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                alt: { present: true, mandatory: false },
                defaultSize: {
                  height: '300px',
                  width: 'auto',
                },
              },
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};
