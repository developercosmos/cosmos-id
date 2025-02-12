
import { useEffect, useRef } from "react";
import 'alloyeditor/dist/alloy-editor/assets/alloy-editor-ocean.css';
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

declare global {
  interface Window {
    AlloyEditor: any;
    CKEDITOR: any;
  }
}

interface EventContentEditorProps {
  initialContent?: string;
  onChange: (content: string) => void;
}

export const EventContentEditor = ({ initialContent, onChange }: EventContentEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<any>(null);
  const { toast } = useToast();

  useEffect(() => {
    const initializeEditor = () => {
      if (!editorRef.current || !window.AlloyEditor) return;

      const editor = window.AlloyEditor.editable(editorRef.current, {
        allowedContent: true,
        enterMode: window.CKEDITOR.ENTER_BR,
        toolbars: {
          add: {
            buttons: ['table'],
            tabIndex: 2
          },
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
                test: window.AlloyEditor.SelectionTest.text
              },
              {
                name: 'table',
                buttons: ['tableRow', 'tableColumn', 'tableCell', 'tableHeading'],
                test: window.AlloyEditor.SelectionTest.table
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

      if (initialContent) {
        editor.get('nativeEditor').setData(initialContent);
      }

      editor.get('nativeEditor').on('change', () => {
        const content = editor.get('nativeEditor').getData();
        onChange(content);
      });

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

      // Save the editor instance
      editorInstanceRef.current = editor;

      // Force a re-render of the editor UI
      editor.get('nativeEditor').fire('instanceReady');
    };

    // Check if both CKEDITOR and AlloyEditor are loaded
    const checkDependencies = setInterval(() => {
      if (window.CKEDITOR && window.AlloyEditor) {
        clearInterval(checkDependencies);
        initializeEditor();
      }
    }, 100);

    return () => {
      clearInterval(checkDependencies);
      if (editorInstanceRef.current) {
        editorInstanceRef.current.destroy();
      }
    };
  }, [initialContent, onChange]);

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
