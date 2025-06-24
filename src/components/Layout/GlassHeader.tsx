
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Settings, LogOut, Menu, X } from 'lucide-react';
import { ProfileModal } from '../Profile/ProfileModal';

interface GlassHeaderProps {
  activeTab?: 'dashboard' | 'topcharts';
  onTabChange?: (tab: 'dashboard' | 'topcharts') => void;
  userEmail?: string;
  onLogout?: () => void;
  showAuth?: boolean;
  onStartTrading?: () => void;
}

export function GlassHeader({ activeTab, onTabChange, userEmail, onLogout, showAuth = false, onStartTrading }: GlassHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const handleStartTrading = () => {
    if (onStartTrading) {
      onStartTrading();
    }
  };

  return (
    <>
      {/* Dynamic Island Style Header - Fixed size, smooth animations */}
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ease-out">
        <div className="bg-black/30 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 shadow-2xl shadow-black/20 w-11/12 max-w-5xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-lime-400 to-lime-600 rounded-lg flex items-center justify-center shadow-lg transform transition-transform duration-200 hover:scale-110 hover:rotate-3">
                <span className="text-black font-bold text-sm">TT</span>
              </div>
              <span className="text-white font-semibold text-xl hidden sm:block">TradeTracker</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Dashboard Navigation */}
              {onTabChange && (
                <nav className="flex space-x-2">
                  <button
                    onClick={() => onTabChange('dashboard')}
                    className={`px-4 py-2 rounded-xl transition-all duration-200 text-sm font-medium ${
                      activeTab === 'dashboard' 
                        ? 'bg-lime-500/90 text-black shadow-lg shadow-lime-500/25' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10 hover:shadow-lg'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => onTabChange('topcharts')}
                    className={`px-4 py-2 rounded-xl transition-all duration-200 text-sm font-medium ${
                      activeTab === 'topcharts' 
                        ? 'bg-lime-500/90 text-black shadow-lg shadow-lime-500/25' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10 hover:shadow-lg'
                    }`}
                  >
                    Top Charts
                  </button>
                </nav>
              )}
              
              {/* Auth Navigation */}
              {showAuth && (
                <nav className="flex space-x-4">
                  <button className="text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 text-sm font-medium">
                    Features
                  </button>
                  <button className="text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 text-sm font-medium">
                    Pricing
                  </button>
                </nav>
              )}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-3">
              {showAuth && (
                <Button 
                  onClick={handleStartTrading}
                  className="bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-400 hover:to-lime-500 text-black font-semibold px-6 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm hidden sm:block transform hover:scale-105"
                >
                  Start Trading
                </Button>
              )}
              
              {/* Profile Dropdown */}
              {userEmail && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-9 w-9 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-200 transform hover:scale-110">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-gradient-to-br from-lime-400 to-lime-600 text-black font-semibold text-sm">
                          {userEmail.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 bg-black/80 backdrop-blur-md border-white/20 mt-2" align="end">
                    <DropdownMenuItem 
                      className="text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                      onClick={() => setProfileModalOpen(true)}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Edit Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                      onClick={onLogout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                className="md:hidden h-9 w-9 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200 transform hover:scale-110"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-4 w-4 text-white" /> : <Menu className="h-4 w-4 text-white" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed top-20 left-4 right-4 bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl animate-slide-in-right">
            <div className="space-y-4">
              {/* Dashboard Navigation */}
              {onTabChange && (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      onTabChange('dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                      activeTab === 'dashboard' 
                        ? 'bg-lime-500/90 text-black' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => {
                      onTabChange('topcharts');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-200 font-medium ${
                      activeTab === 'topcharts' 
                        ? 'bg-lime-500/90 text-black' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Top Charts
                  </button>
                </div>
              )}
              
              {/* Auth Navigation */}
              {showAuth && (
                <div className="space-y-2 border-t border-white/20 pt-4">
                  <button className="w-full text-left text-gray-300 hover:text-white px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 font-medium">
                    Features
                  </button>
                  <button className="w-full text-left text-gray-300 hover:text-white px-4 py-3 rounded-xl hover:bg-white/10 transition-all duration-200 font-medium">
                    Pricing
                  </button>
                  <Button 
                    onClick={() => {
                      handleStartTrading();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-400 hover:to-lime-500 text-black font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 mt-4"
                  >
                    Start Trading
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Profile Modal */}
      <ProfileModal 
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        userEmail={userEmail || ''}
      />
    </>
  );
}
