
import { useState } from 'react';
import { LoginPage } from '@/components/Auth/LoginPage';
import { SignupPage } from '@/components/Auth/SignupPage';
import { LinkDematPage } from '@/components/Auth/LinkDematPage';
import { DashboardPage } from '@/components/Dashboard/DashboardPage';
import { TopChartsPage } from '@/components/Dashboard/TopChartsPage';
import { AIAssistantButton } from '@/components/AIAssistant/AIAssistantButton';

type AuthState = 'login' | 'signup' | 'link-demat' | 'dashboard';
type DashboardTab = 'dashboard' | 'topcharts';

const Index = () => {
  const [authState, setAuthState] = useState<AuthState>('login');
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
    setActiveTab('topcharts');
  };

  const handleSkipDemat = () => {
    console.log('Demat linking skipped');
    setAuthState('dashboard');
    setActiveTab('topcharts');
  };

  const handleTabChange = (tab: DashboardTab) => {
    setActiveTab(tab);
  };

  const handleLogout = () => {
    setAuthState('login');
    setUserEmail('');
    setActiveTab('dashboard');
  };

  if (authState === 'login') {
    return (
      <LoginPage
        onLogin={handleLogin}
        onSwitchToSignup={() => setAuthState('signup')}
      />
    );
  }

  if (authState === 'signup') {
    return (
      <SignupPage
        onSignup={handleSignup}
        onSwitchToLogin={() => setAuthState('login')}
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
        />
      ) : (
        <TopChartsPage
          userEmail={userEmail}
          onTabChange={handleTabChange}
          onLogout={handleLogout}
        />
      )}
      <AIAssistantButton />
    </div>
  );
};

export default Index;
