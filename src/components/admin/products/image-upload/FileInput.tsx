import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { useToast } from "../../../ui/use-toast";

interface FileInputProps {
  onFileSelect: (files: FileList) => void;
  isUploading: boolean;
}

export const FileInput = ({ onFileSelect, isUploading }: FileInputProps) => {
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const oversizedFiles = files.filter(file => file.size > 10 * 1024 * 1024);
      
      if (oversizedFiles.length > 0) {
        toast({
          title: "Error",
          description: "Some files are too large. Maximum size is 10MB per file.",
          variant: "destructive",
        });
        return;
      }
      
      onFileSelect(e.target.files);
      console.log("Files selected:", e.target.files.length);
    }
  };

  return (
    <div>
      <Label>Product Images</Label>
      <Input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="flex-1"
        disabled={isUploading}
      />
    </div>
  );
};