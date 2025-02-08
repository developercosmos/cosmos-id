import { useState } from "react";
import { Button } from "../../ui/button";
import { ImageSlider } from "./ImageSlider";
import { SERVER_URL } from "../../../config/serverConfig";
import { useToast } from "../../ui/use-toast";
import { FileInput } from "./image-upload/FileInput";
import { UploadProgress } from "./image-upload/UploadProgress";

interface ImageUploadProps {
  onUpload: (imageUrl: string) => void;
  existingImages: string[];
  onDelete?: (imageUrl: string) => void;
}

export const ImageUpload = ({ onUpload, existingImages, onDelete }: ImageUploadProps) => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleUpload = async () => {
    if (!selectedFiles) return;

    setIsUploading(true);
    setUploadProgress(0);
    const totalFiles = selectedFiles.length;
    let uploadedCount = 0;

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        const formData = new FormData();
        formData.append('image', selectedFiles[i]);

        console.log('Uploading image:', selectedFiles[i].name);
        const response = await fetch(`${SERVER_URL}/src/server/upload.php`, {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Upload failed with status ${response.status}`);
        }

        const data = await response.json();
        console.log('Upload response:', data);
        
        if (data.success && data.imageUrl) {
          const filename = data.imageUrl.split('/').pop();
          const imageUrl = `${SERVER_URL}/public/uploads/${filename}`;
          console.log('Constructed image URL:', imageUrl);
          onUpload(imageUrl);
          uploadedCount++;
          setUploadProgress((uploadedCount / totalFiles) * 100);
        } else {
          throw new Error(data.message || 'Upload failed');
        }
      }

      setSelectedFiles(null);
      const input = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (input) input.value = '';
      
      toast({
        title: "Success",
        description: `${uploadedCount} image${uploadedCount > 1 ? 's' : ''} uploaded successfully`,
      });
    } catch (error) {
      console.error('Error uploading images:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to upload images",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-end">
        <FileInput 
          onFileSelect={(files) => setSelectedFiles(files)}
          isUploading={isUploading}
        />
        <Button 
          type="button"
          onClick={handleUpload}
          disabled={!selectedFiles || isUploading}
        >
          {isUploading ? 'Uploading...' : 'Upload'}
        </Button>
      </div>

      <UploadProgress isUploading={isUploading} progress={uploadProgress} />
      
      {existingImages.length > 0 && (
        <div className="mt-4">
          <ImageSlider 
            images={existingImages.map(img => {
              if (img.startsWith('http')) return img;
              const filename = img.split('/').pop();
              return `${SERVER_URL}/public/uploads/${filename}`;
            })} 
            onDelete={onDelete}
          />
        </div>
      )}
    </div>
  );
};