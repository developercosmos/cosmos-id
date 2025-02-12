
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  Type,
  Heading,
  Heading2,
  Image as ImageIcon,
} from "lucide-react";
import {
  $getSelection,
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  $createParagraphNode,
  $createTextNode,
} from "lexical";
import { $setBlocksType } from "@lexical/selection";
import { 
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { HeadingTagType, $createHeadingNode } from "@lexical/rich-text";

export const EditorToolbar = () => {
  const [editor] = useLexicalComposerContext();

  const formatHeading = (headingSize: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(headingSize));
      }
    });
  };

  const handleImageUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = () => {
      const file = input.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          const url = reader.result;
          if (typeof url === 'string') {
            editor.update(() => {
              const selection = $getSelection();
              if ($isRangeSelection(selection)) {
                const imageNode = $createParagraphNode();
                const textNode = $createTextNode(`![${file.name}](${url})`);
                imageNode.append(textNode);
                selection.insertNodes([imageNode]);
              }
            });
          }
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  return (
    <div className="border-b border-gray-200 p-2 flex flex-wrap gap-1 bg-white">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
      >
        <Underline className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-gray-200 mx-2" />

      <Button
        variant="ghost"
        size="sm"
        onClick={() => formatHeading("h1")}
      >
        <Heading className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => formatHeading("h2")}
      >
        <Heading2 className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => formatHeading("h2")}
      >
        <Type className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-gray-200 mx-2" />

      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined)}
      >
        <List className="h-4 w-4 line-through" />
      </Button>

      <div className="w-px h-6 bg-gray-200 mx-2" />

      <Button
        variant="ghost"
        size="sm"
        onClick={handleImageUpload}
      >
        <ImageIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};
