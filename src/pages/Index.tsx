
import { useState } from 'react';
import { AuthPage } from '@/components/Auth/AuthPage';
import { LinkDematPage } from '@/components/Auth/LinkDematPage';
import { DashboardPage } from '@/components/Dashboard/DashboardPage';
import { TopChartsPage } from '@/components/Dashboard/TopChartsPage';
import { AIAssistantButton } from '@/components/AIAssistant/AIAssistantButton';

type AuthState = 'auth' | 'link-demat' | 'dashboard';
type DashboardTab = 'dashboard' | 'topcharts';

const Index = () => {
  const [authState, setAuthState] = useState<AuthState>('auth');
  const [activeTab, setActiveTab] = useState<DashboardTab>('dashboard');
  const [userEmail, setUserEmail] = useState<string>('');

  const handleLogin = (email: string, password: string) => {
    console.log('Login:', { email, password });
    setUserEmail(email);
    setAuthState('link-demat');
  };

  const handleSignup = (email: string, password: string, fullName: string) => {
    console.log('Signup:', { email, password, fullName });
    setUserEmail(email);
    setAuthState('link-demat');
  };

  const handleLinkDematComplete = () => {
    console.log('Demat account linked');
    setAuthState('dashboard');
    setActiveTab('dashboard');
  };

  const handleSkipDemat = () => {
    console.log('Demat linking skipped');
    setAuthState('dashboard');
    setActiveTab('dashboard');
  };

  const handleTabChange = (tab: DashboardTab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    setAuthState('auth');
    setUserEmail('');
    setActiveTab('dashboard');
  };

  const handleStartTrading = () => {
    // Navigate to auth page when "Start Trading" is clicked
    setAuthState('auth');
  };

  if (authState === 'auth') {
    return (
      <AuthPage
        onLogin={handleLogin}
        onSignup={handleSignup}
        onStartTrading={handleStartTrading}
      />
    );
  }

  if (authState === 'link-demat') {
    return (
      <LinkDematPage
        onComplete={handleLinkDematComplete}
        onSkip={handleSkipDemat}
        userEmail={userEmail}
      />
    );
  }

  return (
    <div className="relative">
      {activeTab === 'dashboard' ? (
        <DashboardPage
          userEmail={userEmail}
          onTabChange={handleTabChange}
          onLogout={handleLogout}
          onStartTrading={handleStartTrading}
        />
      ) : (
        <TopChartsPage
          userEmail={userEmail}
          onTabChange={handleTabChange}
          onLogout={handleLogout}
          onStartTrading={handleStartTrading}
        />
      )}
      <AIAssistantButton />
    </div>
  );
};

export default Index;
