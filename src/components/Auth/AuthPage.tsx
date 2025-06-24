
import { useState } from 'react';
import { LoginPage } from './LoginPage';
import { SignupPage } from './SignupPage';
import { GlassHeader } from '../Layout/GlassHeader';

interface AuthPageProps {
  onLogin: (email: string, password: string) => void;
  onSignup: (email: string, password: string, fullName: string) => void;
  onStartTrading?: () => void;
}

export function AuthPage({ onLogin, onSignup, onStartTrading }: AuthPageProps) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900">
      <GlassHeader showAuth={true} onStartTrading={onStartTrading} />
      
      <div className="pt-24 px-4 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto">
          {isLogin ? (
            <LoginPage 
              onLogin={onLogin} 
              onSwitchToSignup={() => setIsLogin(false)} 
            />
          ) : (
            <SignupPage 
              onSignup={onSignup} 
              onSwitchToLogin={() => setIsLogin(true)} 
            />
          )}
        </div>
      </div>
    </div>
  );
}
