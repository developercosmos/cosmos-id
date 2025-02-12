
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
  Heading1,
  Heading2,
  Quote,
  List,
  ListOrdered
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

      <div className="h-6 w-px bg-gray-200" />

      <div className="flex gap-1">
        <Button 
          type="button" 
          size="icon" 
          variant="ghost" 
          onClick={() => onStyleClick('bold')}
          className="h-8 w-8"
        >
          <Bold className="w-4 h-4" />
        </Button>
        <Button 
          type="button" 
          size="icon" 
          variant="ghost" 
          onClick={() => onStyleClick('italic')}
          className="h-8 w-8"
        >
          <Italic className="w-4 h-4" />
        </Button>
        <Button 
          type="button" 
          size="icon" 
          variant="ghost" 
          onClick={() => onStyleClick('underline')}
          className="h-8 w-8"
        >
          <Underline className="w-4 h-4" />
        </Button>
      </div>

      <div className="h-6 w-px bg-gray-200" />

      <div className="flex gap-1">
        <Button 
          type="button" 
          size="icon" 
          variant="ghost" 
          onClick={() => onStyleClick('h1')}
          className="h-8 w-8"
        >
          <Heading1 className="w-4 h-4" />
        </Button>
        <Button 
          type="button" 
          size="icon" 
          variant="ghost" 
          onClick={() => onStyleClick('h2')}
          className="h-8 w-8"
        >
          <Heading2 className="w-4 h-4" />
        </Button>
        <Button 
          type="button" 
          size="icon" 
          variant="ghost" 
          onClick={() => onStyleClick('quote')}
          className="h-8 w-8"
        >
          <Quote className="w-4 h-4" />
        </Button>
      </div>

      <div className="h-6 w-px bg-gray-200" />

      <div className="flex gap-1">
        <Button 
          type="button" 
          size="icon" 
          variant="ghost" 
          onClick={() => onStyleClick('alignLeft')}
          className="h-8 w-8"
        >
          <AlignLeft className="w-4 h-4" />
        </Button>
        <Button 
          type="button" 
          size="icon" 
          variant="ghost" 
          onClick={() => onStyleClick('alignCenter')}
          className="h-8 w-8"
        >
          <AlignCenter className="w-4 h-4" />
        </Button>
        <Button 
          type="button" 
          size="icon" 
          variant="ghost" 
          onClick={() => onStyleClick('alignRight')}
          className="h-8 w-8"
        >
          <AlignRight className="w-4 h-4" />
        </Button>
      </div>

      <div className="h-6 w-px bg-gray-200" />

      <div className="flex gap-1">
        <Button 
          type="button" 
          size="icon" 
          variant="ghost" 
          onClick={() => onStyleClick('bulletList')}
          className="h-8 w-8"
        >
          <List className="w-4 h-4" />
        </Button>
        <Button 
          type="button" 
          size="icon" 
          variant="ghost" 
          onClick={() => onStyleClick('numberedList')}
          className="h-8 w-8"
        >
          <ListOrdered className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
