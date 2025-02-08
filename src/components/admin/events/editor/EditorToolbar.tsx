import { TextControls } from "./TextControls";
import { ImageControls } from "./ImageControls";
import { Button } from "../../../ui/button";
import { Type } from "lucide-react";

interface EditorToolbarProps {
  selectedFont: string;
  setSelectedFont: (font: string) => void;
  fontSize: string;
  setFontSize: (size: string) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  onStyleClick: (style: string) => void;
  onAddText: () => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
}

export const EditorToolbar = ({
  selectedFont,
  setSelectedFont,
  fontSize,
  setFontSize,
  textColor,
  setTextColor,
  onStyleClick,
  onAddText,
  onImageUpload,
  onDelete,
}: EditorToolbarProps) => {
  return (
    <div className="flex flex-wrap gap-4 mb-4 items-center border-b pb-4">
      <Button variant="outline" onClick={onAddText}>
        <Type className="w-4 h-4 mr-2" />
        Add Text
      </Button>

      <TextControls
        selectedFont={selectedFont}
        setSelectedFont={setSelectedFont}
        fontSize={fontSize}
        setFontSize={setFontSize}
        textColor={textColor}
        setTextColor={setTextColor}
        onStyleClick={onStyleClick}
      />

      <ImageControls
        onImageUpload={onImageUpload}
        onDelete={onDelete}
      />
    </div>
  );
};