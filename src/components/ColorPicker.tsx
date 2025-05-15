
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Palette } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

const CustomColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const [open, setOpen] = useState(false);
  const [hexValue, setHexValue] = useState(color);

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
