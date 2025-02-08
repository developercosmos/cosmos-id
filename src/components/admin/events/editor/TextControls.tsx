import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../ui/select";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react";

interface TextControlsProps {
  selectedFont: string;
  setSelectedFont: (font: string) => void;
  fontSize: string;
  setFontSize: (size: string) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  onStyleClick: (style: string) => void;
}

export const TextControls = ({
  selectedFont,
  setSelectedFont,
  fontSize,
  setFontSize,
  textColor,
  setTextColor,
  onStyleClick,
}: TextControlsProps) => {
  const fonts = [
    "Arial",
    "Times New Roman",
    "Helvetica",
    "Georgia",
    "Verdana",
    "Courier New"
  ];

  const fontSizes = [
    "12", "14", "16", "18", "20", "24", "28", "32", "36", "48"
  ];

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Select value={selectedFont} onValueChange={setSelectedFont}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Font" />
        </SelectTrigger>
        <SelectContent>
          {fonts.map((font) => (
            <SelectItem key={font} value={font}>
              {font}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={fontSize} onValueChange={setFontSize}>
        <SelectTrigger className="w-24">
          <SelectValue placeholder="Size" />
        </SelectTrigger>
        <SelectContent>
          {fontSizes.map((size) => (
            <SelectItem key={size} value={size}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="color"
        value={textColor}
        onChange={(e) => setTextColor(e.target.value)}
        className="w-12 h-8 p-0 border-none"
      />

      <div className="flex gap-1">
        <Button size="icon" variant="outline" onClick={() => onStyleClick('bold')}>
          <Bold className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="outline" onClick={() => onStyleClick('italic')}>
          <Italic className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="outline" onClick={() => onStyleClick('underline')}>
          <Underline className="w-4 h-4" />
        </Button>
      </div>

      <div className="flex gap-1">
        <Button size="icon" variant="outline" onClick={() => onStyleClick('alignLeft')}>
          <AlignLeft className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="outline" onClick={() => onStyleClick('alignCenter')}>
          <AlignCenter className="w-4 h-4" />
        </Button>
        <Button size="icon" variant="outline" onClick={() => onStyleClick('alignRight')}>
          <AlignRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};