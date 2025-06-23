
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
          <div className="text-lime-500 font-bold text-lg glitch" data-text="COMING SOON">
            COMING SOON
          </div>
          <p className="text-gray-300 text-sm mt-1">AI-powered trading assistant</p>
        </div>
      )}
      
      <style jsx>{`
        .glitch {
          position: relative;
          color: #84cc16;
          font-weight: bold;
          animation: glitch 1s infinite;
        }
        
        .glitch::before,
        .glitch::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .glitch::before {
          color: #ff0000;
          animation: glitch-1 0.5s infinite;
          clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
        }
        
        .glitch::after {
          color: #0000ff;
          animation: glitch-2 0.5s infinite;
          clip-path: polygon(0 80%, 100% 20%, 100% 100%, 0 100%);
        }
        
        @keyframes glitch {
          0%, 100% { transform: translate(0); }
          10% { transform: translate(-2px, -2px); }
          20% { transform: translate(2px, 2px); }
          30% { transform: translate(-2px, 2px); }
          40% { transform: translate(2px, -2px); }
          50% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          70% { transform: translate(-2px, 2px); }
          80% { transform: translate(2px, -2px); }
          90% { transform: translate(-2px, -2px); }
        }
        
        @keyframes glitch-1 {
          0%, 100% { transform: translate(0); }
          10% { transform: translate(-2px, -2px); }
          20% { transform: translate(2px, 2px); }
          30% { transform: translate(-2px, 2px); }
          40% { transform: translate(2px, -2px); }
          50% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          70% { transform: translate(-2px, 2px); }
          80% { transform: translate(2px, -2px); }
          90% { transform: translate(-2px, -2px); }
        }
        
        @keyframes glitch-2 {
          0%, 100% { transform: translate(0); }
          10% { transform: translate(2px, 2px); }
          20% { transform: translate(-2px, -2px); }
          30% { transform: translate(2px, -2px); }
          40% { transform: translate(-2px, 2px); }
          50% { transform: translate(2px, 2px); }
          60% { transform: translate(-2px, -2px); }
          70% { transform: translate(2px, -2px); }
          80% { transform: translate(-2px, 2px); }
          90% { transform: translate(2px, 2px); }
        }
      `}</style>
    </div>
  );
}
