
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle, Sparkles } from 'lucide-react';

export function AIAssistantButton() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleClick}
        className={`
          relative bg-lime-500 hover:bg-lime-600 text-black font-medium 
          px-6 py-3 rounded-full shadow-lg transition-all duration-300
          ${isClicked ? 'animate-pulse' : ''}
        `}
      >
        <MessageCircle className="w-5 h-5 mr-2" />
        AI Assistant
        <Sparkles className="w-4 h-4 ml-2" />
        
        {isClicked && (
          <div className="absolute inset-0 bg-lime-500 rounded-full animate-ping opacity-75"></div>
        )}
      </Button>
      
      {isClicked && (
        <div className="absolute bottom-16 right-0 bg-gray-900 border border-gray-700 rounded-lg p-4 shadow-xl">
          <div className="text-lime-500 font-bold text-lg relative">
            <span className="relative inline-block animate-bounce">COMING SOON</span>
          </div>
          <p className="text-gray-300 text-sm mt-1">AI-powered trading assistant</p>
        </div>
      )}
    </div>
  );
}
