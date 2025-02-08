import { Button } from "../../../ui/button";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { Image, Trash2 } from "lucide-react";

interface ImageControlsProps {
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDelete: () => void;
}

export const ImageControls = ({ onImageUpload, onDelete }: ImageControlsProps) => {
  return (
    <div className="flex gap-2 items-center">
      <Input
        type="file"
        accept="image/*"
        onChange={onImageUpload}
        className="hidden"
        id="image-upload"
      />
      <Label htmlFor="image-upload">
        <Button variant="outline" asChild>
          <span>
            <Image className="w-4 h-4 mr-2" />
            Add Image
          </span>
        </Button>
      </Label>
      <Button variant="destructive" size="icon" onClick={onDelete}>
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};