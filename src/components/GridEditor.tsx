
import { useState } from 'react';
import { toast } from 'sonner';
import { X, Upload, Image } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface GridEditorProps {
  backgroundColor: string;
}

interface UploadedImage {
  id: string;
  url: string;
  file: File;
}

const GridEditor: React.FC<GridEditorProps> = ({ backgroundColor }) => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addNewImages(Array.from(e.target.files));
    }
  };

  const addNewImages = (files: File[]) => {
    const newImages = files.map(file => ({
      id: `img-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      url: URL.createObjectURL(file),
      file
    }));
    
    setImages(prev => [...prev, ...newImages]);
    
    if (files.length === 1) {
      toast.success('Image uploaded successfully!');
    } else {
      toast.success(`${files.length} images uploaded successfully!`);
    }
  };

  const removeImage = (id: string) => {
    setImages(prev => {
      const filtered = prev.filter(img => img.id !== id);
      const removed = prev.find(img => img.id === id);
      if (removed) {
        URL.revokeObjectURL(removed.url);
      }
      return filtered;
    });
    toast.success('Image removed');
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addNewImages(Array.from(e.dataTransfer.files));
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div 
        className={`upload-area border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
          isDragging ? 'border-primary bg-primary/5' : 'border-gray-300'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center py-3">
          <Upload className="w-8 h-8 text-muted-foreground mb-2" />
          <h3 className="text-base font-medium mb-1">Drag images here or click to browse</h3>
          <p className="text-sm text-muted-foreground mb-2">Add as many images as possible to make your grid look more interesting!</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => document.getElementById('image-upload')?.click()}
            className="mt-1"
          >
            <Image className="mr-2 h-4 w-4" /> Upload Images
          </Button>
          <input
            id="image-upload"
            type="file"
            multiple
            accept="image/*,image/gif"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>

      {images.length > 0 && (
        <div>
          <h3 className="text-lg font-medium mb-4">Uploaded Images ({images.length})</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {images.map((image) => (
              <div key={image.id} className="relative group">
                <img 
                  src={image.url} 
                  alt="Uploaded image" 
                  className="w-full h-24 object-cover rounded-md"
                />
                <button
                  className="absolute top-1 right-1 bg-black/70 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeImage(image.id)}
                  aria-label="Remove image"
                >
                  <X className="h-4 w-4 text-white" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid-placeholder mt-12 p-8 border-2 border-dashed border-gray-300 rounded-lg" style={{ backgroundColor }}>
        <div className="text-center py-20">
          <h3 className="text-xl font-medium mb-2">Grid Placeholder</h3>
          <p className="text-muted-foreground">Your grid will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default GridEditor;
