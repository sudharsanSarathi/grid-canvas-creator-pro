
import { useState } from 'react';
import Header from '@/components/Header';
import ControlPanel from '@/components/ControlPanel';
import GridEditor from '@/components/GridEditor';
import Footer from '@/components/Footer';
import { Toaster } from 'sonner';

const Index = () => {
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');

  const generateIframeCode = () => {
    // This would generate actual iframe code in a real app
    const code = `<iframe src="https://gridforge.app/embed?bg=${encodeURIComponent(backgroundColor)}" width="100%" height="500" frameborder="0"></iframe>`;
    return code;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-background/80">
      <Toaster position="top-center" />
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">Create Your Grid Design</h1>
          <p className="text-muted-foreground text-center mb-8 max-w-lg mx-auto">
            Design beautiful grid layouts with custom backgrounds and media. Perfect for portfolios, galleries, and presentations.
          </p>
          
          <ControlPanel 
            backgroundColor={backgroundColor}
            onBackgroundColorChange={setBackgroundColor}
            onGenerateIframe={generateIframeCode}
          />
          
          <GridEditor backgroundColor={backgroundColor} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
