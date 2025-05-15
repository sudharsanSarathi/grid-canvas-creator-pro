
import { CopyCheck, Copy, Grid2x2, Grid3x3 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useState } from 'react';
import { toast } from 'sonner';
import CustomColorPicker from './ColorPicker';

interface ControlPanelProps {
  gridType: '2x2' | '3x3';
  onGridChange: (type: '2x2' | '3x3') => void;
  backgroundColor: string;
  onBackgroundColorChange: (color: string) => void;
  onGenerateIframe: () => string;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  gridType,
  onGridChange,
  backgroundColor,
  onBackgroundColorChange,
  onGenerateIframe
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyIframe = () => {
    const iframe = onGenerateIframe();
    navigator.clipboard.writeText(iframe);
    setCopied(true);
    toast.success('Iframe code copied to clipboard!');
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Grid:</span>
        <ToggleGroup type="single" value={gridType} onValueChange={(value) => value && onGridChange(value as '2x2' | '3x3')}>
          <ToggleGroupItem value="2x2" aria-label="2x2 Grid">
            <Grid2x2 className="h-4 w-4" />
            <span className="ml-2">2×2</span>
          </ToggleGroupItem>
          <ToggleGroupItem value="3x3" aria-label="3x3 Grid">
            <Grid3x3 className="h-4 w-4" />
            <span className="ml-2">3×3</span>
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="flex items-center">
        <CustomColorPicker color={backgroundColor} onChange={onBackgroundColorChange} />
      </div>

      <Button 
        variant="outline" 
        onClick={handleCopyIframe} 
        className="gap-2 transition-all"
      >
        {copied ? <CopyCheck className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        {copied ? "Copied!" : "Copy iframe"}
      </Button>
    </div>
  );
};

export default ControlPanel;
