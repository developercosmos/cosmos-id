
import { useEffect, useRef } from "react";
import AlloyEditor from 'alloyeditor';
import 'alloyeditor/dist/alloy-editor/assets/alloy-editor-ocean.css';
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface EventContentEditorProps {
  initialContent?: string;
  onChange: (content: string) => void;
}

export const EventContentEditor = ({ initialContent, onChange }: EventContentEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!editorRef.current) return;

    // Initialize AlloyEditor
    const editor = AlloyEditor.editable(editorRef.current, {
      allowedContent: true,
      enterMode: 2, // ENTER_BR
      toolbars: {
        styles: {
          selections: [
            {
              name: 'text',
              buttons: [
                'bold',
                'italic',
                'underline',
                'link',
                'paragraphLeft',
                'paragraphCenter',
                'paragraphRight',
                'h1',
                'h2',
                'ul',
                'ol',
                'quote',
                'image',
                'table'
              ],
              test: AlloyEditor.SelectionTest.text
            },
            {
              name: 'table',
              buttons: ['tableRow', 'tableColumn', 'tableCell', 'tableHeading'],
              test: AlloyEditor.SelectionTest.table
            }
          ],
          tabIndex: 1
        }
      },
      extraPlugins: [
        'ae_autolink',
        'ae_dragresize',
        'ae_imagealignment',
        'ae_placeholder',
        'ae_selectionregion',
        'ae_uicore',
        'ae_tableresize',
        'table',
        'tabletools'
      ],
      removePlugins: 'contextmenu,elementspath,resize',
      height: '400px',
      placeholder: 'Start writing your content...'
    });

    // Set initial content if provided
    if (initialContent) {
      editor.get('nativeEditor').setData(initialContent);
    }

    // Handle content changes
    editor.get('nativeEditor').on('change', () => {
      const content = editor.get('nativeEditor').getData();
      onChange(content);
    });

    // Handle image uploads
    editor.get('nativeEditor').on('fileUploadRequest', (event: any) => {
      const fileLoader = event.data.fileLoader;
      const file = fileLoader.file;
      const reader = new FileReader();

      reader.onload = function(e) {
        if (e.target?.result) {
          fileLoader.uploadUrl = e.target.result as string;
          event.stop();
          fileLoader.uploaded = true;
          fileLoader.xhr = {
            status: 200,
            responseText: JSON.stringify({
              uploaded: 1,
              url: e.target.result
            })
          };
          fileLoader.fire('uploaded');
          toast({
            title: "Success",
            description: "Image uploaded successfully",
          });
        }
      };

      reader.onerror = () => {
        toast({
          title: "Error",
          description: "Failed to upload image",
          variant: "destructive",
        });
      };

      reader.readAsDataURL(file);
      event.stop();
    });

    editorInstanceRef.current = editor;

    // Cleanup
    return () => {
      if (editorInstanceRef.current) {
        editorInstanceRef.current.destroy();
      }
    };
  }, []);

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
          <div
            ref={editorRef}
            className="min-h-[400px] p-4"
            contentEditable={true}
          />
        </div>
      </CardContent>
    </Card>
  );
};
