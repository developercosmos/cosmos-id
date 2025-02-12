
import { useState, useCallback } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { $generateHtmlFromNodes } from '@lexical/html';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { HeadingNode } from "@lexical/rich-text";
import { ListNode, ListItemNode } from "@lexical/list";
import { LinkNode } from "@lexical/link";
import { EditorToolbar } from "./editor/EditorToolbar";
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';

interface EventContentEditorProps {
  initialContent?: string;
  onChange: (content: string) => void;
}

const theme = {
  paragraph: "mb-2",
  heading: {
    h1: "text-3xl font-bold mb-4",
    h2: "text-2xl font-bold mb-3",
    h3: "text-xl font-bold mb-2",
  },
  list: {
    ul: "list-disc ml-4 mb-4",
    ol: "list-decimal ml-4 mb-4",
  },
  link: "text-blue-500 underline",
};

export const EventContentEditor = ({ initialContent, onChange }: EventContentEditorProps) => {
  const { toast } = useToast();

  const initialConfig = {
    namespace: 'EventContentEditor',
    theme,
    nodes: [HeadingNode, ListNode, ListItemNode, LinkNode],
    onError: (error: Error) => {
      console.error(error);
      toast({
        title: "Editor Error",
        description: "An error occurred in the editor",
        variant: "destructive",
      });
    },
  };

  const handleChange = useCallback((editorState: any) => {
    editorState.read(() => {
      const htmlString = $generateHtmlFromNodes(editorState);
      onChange(htmlString);
    });
  }, [onChange]);

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
          <LexicalComposer initialConfig={initialConfig}>
            <div className="relative">
              <EditorToolbar />
              <div className="min-h-[400px] p-4">
                <RichTextPlugin
                  contentEditable={
                    <ContentEditable 
                      className="outline-none min-h-[300px] prose prose-sm max-w-none"
                    />
                  }
                  placeholder={
                    <div className="absolute top-0 left-0 p-4 text-gray-400">
                      Enter your content here...
                    </div>
                  }
                  ErrorBoundary={LexicalErrorBoundary}
                />
                <HistoryPlugin />
                <AutoFocusPlugin />
                <ListPlugin />
                <LinkPlugin />
                <OnChangePlugin onChange={handleChange} />
              </div>
            </div>
          </LexicalComposer>
        </div>
      </CardContent>
    </Card>
  );
};
