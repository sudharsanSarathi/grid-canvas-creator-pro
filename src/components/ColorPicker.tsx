
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Palette } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

const presetColors = [
  '#FFFFFF', // White
  '#F8F9FA', // Light gray
  '#E9ECEF', // Off-white
  '#DEE2E6', // Light gray
  '#F2E9FF', // Light purple
  '#E5DEFF', // Soft purple
  '#C7BCFF', // Lilac
  '#F1F0FB', // Soft gray
  '#F7F7F7', // Almost white
];

// Additional colors for the interactive color wheel
const hueColors = [
  '#FF0000', // Red
  '#FF7F00', // Orange
  '#FFFF00', // Yellow
  '#00FF00', // Green
  '#0000FF', // Blue
  '#4B0082', // Indigo
  '#9400D3', // Violet
  '#FF00FF', // Magenta
  '#FF1493', // Deep Pink
];

const CustomColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const [open, setOpen] = useState(false);
  const [hexValue, setHexValue] = useState(color);
  const [showColorWheel, setShowColorWheel] = useState(false);

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    onChange(newColor);
    setHexValue(newColor);
  };

  const handleHexInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHexValue(value);
    
    // Only update the actual color if it's a valid hex code
    if (/^#([0-9A-F]{3}){1,2}$/i.test(value)) {
      onChange(value);
    }
  };

  const handleHexInputBlur = () => {
    // Ensure we have a valid hex on blur, otherwise revert to current color
    if (!/^#([0-9A-F]{3}){1,2}$/i.test(hexValue)) {
      setHexValue(color);
    } else {
      // Make sure to update the color if valid
      onChange(hexValue);
    }
  };

  const handlePresetClick = (preset: string) => {
    onChange(preset);
    setHexValue(preset);
  };

  const handleHueClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Get the position of the click relative to the color wheel
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate the center of the wheel
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate distance from center and angle
    const dx = x - centerX;
    const dy = y - centerY;
    const radius = Math.min(centerX, centerY);
    
    // Convert to polar coordinates
    const distance = Math.sqrt(dx * dx + dy * dy) / radius;
    const angle = Math.atan2(dy, dx) / Math.PI * 180;
    
    // Convert angle to hue (0-360)
    const hue = (angle + 360) % 360;
    
    // Calculate saturation (0-100) based on distance from center
    const saturation = Math.min(100, distance * 100);
    
    // Fixed lightness (50%)
    const lightness = 50;
    
    // Convert HSL to hex
    const hslColor = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    
    // Create a temporary div to get the computed RGB value
    const tempDiv = document.createElement('div');
    tempDiv.style.color = hslColor;
    document.body.appendChild(tempDiv);
    
    // Get the computed RGB value
    const rgbColor = window.getComputedStyle(tempDiv).color;
    document.body.removeChild(tempDiv);
    
    // Convert RGB to hex
    const rgbMatch = rgbColor.match(/\d+/g);
    if (rgbMatch) {
      const hex = '#' + rgbMatch.map(value => {
        const hexVal = parseInt(value).toString(16);
        return hexVal.length === 1 ? '0' + hexVal : hexVal;
      }).join('');
      
      onChange(hex);
      setHexValue(hex);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="gap-2 px-3"
          aria-label="Change background color"
        >
          <div 
            className="w-4 h-4 rounded-full border border-gray-300" 
            style={{ backgroundColor: color }}
          />
          <Palette className="h-4 w-4" />
          <span className="text-sm">Background</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="color-picker" className="text-sm font-medium">
              Color Picker
            </Label>
            <input
              id="color-picker"
              type="color"
              value={color}
              onChange={handleColorChange}
              className="w-full h-8 cursor-pointer rounded-md"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="hex-input" className="text-sm font-medium">
              Hex Value
            </Label>
            <Input
              id="hex-input"
              type="text"
              value={hexValue}
              onChange={handleHexInputChange}
              onBlur={handleHexInputBlur}
              placeholder="#FFFFFF"
              className="font-mono"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-medium">Interactive Color Wheel</Label>
            <div className="relative w-full">
              <AspectRatio ratio={1/1} className="overflow-hidden">
                <div 
                  className="w-full h-full rounded-full bg-white cursor-crosshair border border-gray-300 relative"
                  style={{
                    backgroundImage: `conic-gradient(red, yellow, lime, aqua, blue, magenta, red)`
                  }}
                  onClick={handleHueClick}
                />
                <div 
                  className="absolute inset-[15%] rounded-full bg-white cursor-crosshair"
                  style={{
                    backgroundImage: `radial-gradient(circle, white, transparent)`
                  }}
                />
              </AspectRatio>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-sm font-medium">Presets</Label>
            <div className="grid grid-cols-5 gap-2">
              {presetColors.map((preset) => (
                <button
                  key={preset}
                  className={`w-8 h-8 rounded-full border transition-all hover:scale-110 ${
                    preset === color ? 'border-primary ring-1 ring-primary' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: preset }}
                  onClick={() => handlePresetClick(preset)}
                  aria-label={`Select color ${preset}`}
                />
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CustomColorPicker;
