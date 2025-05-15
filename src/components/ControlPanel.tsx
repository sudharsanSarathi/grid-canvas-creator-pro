
import { CopyCheck, Copy } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { toast } from 'sonner';
import CustomColorPicker from './ColorPicker';

interface ControlPanelProps {
  backgroundColor: string;
  onBackgroundColorChange: (color: string) => void;
  onGenerateIframe: () => string;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
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
