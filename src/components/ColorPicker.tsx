
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Palette } from 'lucide-react';
import { Button } from "@/components/ui/button";

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

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handlePresetClick = (preset: string) => {
    onChange(preset);
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
            <label htmlFor="color-picker" className="text-sm font-medium">
              Custom Color
            </label>
            <input
              id="color-picker"
              type="color"
              value={color}
              onChange={handleColorChange}
              className="w-full h-8 cursor-pointer rounded-md"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Presets</label>
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
