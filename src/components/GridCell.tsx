
import { useState, useRef } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Image, SquareX } from 'lucide-react';

interface GridCellProps {
  onImageChange: (file: File | null) => void;
  image: string | null;
}

const GridCell: React.FC<GridCellProps> = ({ onImageChange, image }) => {
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    if (file) {
      onImageChange(file);
    }
  };

  const handleRemove = () => {
    onImageChange(null);
  };

  return (
    <div 
      className="grid-item"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {image ? (
        <>
          <img src={image} alt="Grid cell content" className="w-full h-full object-cover" />
          {isHovered && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center animate-fade-in">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="sm" className="text-xs">
                    Edit
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center">
                  <DropdownMenuItem onClick={handleUploadClick}>
                    <Image className="mr-2 h-4 w-4" />
                    <span>Replace image</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleRemove}>
                    <SquareX className="mr-2 h-4 w-4" />
                    <span>Remove image</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </>
      ) : (
        <div 
          className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
          onClick={handleUploadClick}
        >
          <Image className="w-6 h-6 text-muted-foreground/60" />
          <span className="text-xs text-muted-foreground mt-2">Add image</span>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*,video/gif"
      />
    </div>
  );
};

export default GridCell;
