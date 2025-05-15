
import { Palette } from 'lucide-react';
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="w-full py-4 px-6 border-b border-border flex items-center justify-between mb-8 glass-effect">
      <div className="flex items-center gap-2">
        <Palette className="h-6 w-6 text-brand-300" />
        <h1 className="text-xl font-semibold text-foreground">GridForge</h1>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          About
        </Button>
        <Button variant="outline" size="sm">
          Templates
        </Button>
        <Button className="bg-brand-300 hover:bg-brand-400" size="sm">
          Share
        </Button>
      </div>
    </header>
  );
};

export default Header;
