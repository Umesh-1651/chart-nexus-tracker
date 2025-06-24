
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle, Sparkles, Zap } from 'lucide-react';

export function AIAssistantButton() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 3000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Button
        onClick={handleClick}
        className={`
          relative bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-400 hover:to-emerald-400 
          text-black font-bold px-6 py-4 rounded-full shadow-2xl transition-all duration-500
          transform hover:scale-110 hover:shadow-lime-500/50
          ${isClicked ? 'animate-pulse scale-110' : ''}
        `}
      >
        <MessageCircle className="w-5 h-5 mr-2" />
        AI Assistant
        <Sparkles className="w-4 h-4 ml-2 animate-spin" />
        
        {/* Glowing ring effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-lime-500 to-emerald-500 opacity-20 scale-110 animate-ping"></div>
        
        {/* Floating particles */}
        {isClicked && (
          <>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-lime-400 rounded-full animate-bounce"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </>
        )}
      </Button>
      
      {isClicked && (
        <div className="absolute bottom-20 right-0 bg-gradient-to-br from-gray-900/95 to-gray-800/95 border border-lime-500/30 rounded-xl p-6 shadow-2xl backdrop-blur-md animate-fade-in max-w-xs">
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <Zap className="w-8 h-8 text-lime-400 animate-pulse mr-2" />
              <div className="text-lime-400 font-bold text-xl">
                <span className="inline-block animate-bounce" style={{ animationDelay: '0s' }}>C</span>
                <span className="inline-block animate-bounce" style={{ animationDelay: '0.1s' }}>O</span>
                <span className="inline-block animate-bounce" style={{ animationDelay: '0.2s' }}>M</span>
                <span className="inline-block animate-bounce" style={{ animationDelay: '0.3s' }}>I</span>
                <span className="inline-block animate-bounce" style={{ animationDelay: '0.4s' }}>N</span>
                <span className="inline-block animate-bounce" style={{ animationDelay: '0.5s' }}>G</span>
                <span className="mx-2"></span>
                <span className="inline-block animate-bounce" style={{ animationDelay: '0.6s' }}>S</span>
                <span className="inline-block animate-bounce" style={{ animationDelay: '0.7s' }}>O</span>
                <span className="inline-block animate-bounce" style={{ animationDelay: '0.8s' }}>O</span>
                <span className="inline-block animate-bounce" style={{ animationDelay: '0.9s' }}>N</span>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              AI-powered trading assistant with advanced market analysis
            </p>
            <div className="mt-4 flex justify-center">
              <div className="flex space-x-1">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
          
          {/* Animated border */}
          <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-lime-500/20 via-emerald-500/20 to-lime-500/20 animate-pulse"></div>
        </div>
      )}
    </div>
  );
}
