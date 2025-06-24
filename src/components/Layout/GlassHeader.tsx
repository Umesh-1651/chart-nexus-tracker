
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Settings, LogOut, Menu, X } from 'lucide-react';

interface GlassHeaderProps {
  activeTab?: 'dashboard' | 'topcharts';
  onTabChange?: (tab: 'dashboard' | 'topcharts') => void;
  userEmail?: string;
  onLogout?: () => void;
  showAuth?: boolean;
}

export function GlassHeader({ activeTab, onTabChange, userEmail, onLogout, showAuth = false }: GlassHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Dynamic Island Style Header */}
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-11/12 max-w-6xl">
        <div className="bg-black/40 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-3 shadow-2xl">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-lime-500 rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-black font-bold text-sm">TT</span>
              </div>
              <span className="text-white font-semibold text-lg md:text-xl hidden sm:block">TradeTracker</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Dashboard Navigation */}
              {onTabChange && (
                <nav className="flex space-x-4">
                  <button
                    onClick={() => onTabChange('dashboard')}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 text-sm ${
                      activeTab === 'dashboard' 
                        ? 'bg-lime-500/90 text-black font-medium shadow-lg' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Dashboard
                  </button>
                  <button
                    onClick={() => onTabChange('topcharts')}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 text-sm ${
                      activeTab === 'topcharts' 
                        ? 'bg-lime-500/90 text-black font-medium shadow-lg' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    Top Charts
                  </button>
                </nav>
              )}
              
              {/* Auth Navigation */}
              {showAuth && (
                <nav className="flex space-x-4">
                  <button className="text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 text-sm">
                    Features
                  </button>
                  <button className="text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 text-sm">
                    Prices
                  </button>
                </nav>
              )}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-3">
              {showAuth && (
                <Button className="bg-lime-500/90 hover:bg-lime-400 text-black font-semibold px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm hidden sm:block">
                  Start Trading
                </Button>
              )}
              
              {/* Profile Dropdown */}
              {userEmail && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-lime-500 text-black font-semibold text-sm">
                          {userEmail.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 bg-black/80 backdrop-blur-md border-white/20 mt-2" align="end">
                    <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-white/10 transition-colors">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
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
                className="md:hidden h-8 w-8 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300"
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
          <div className="fixed top-20 left-4 right-4 bg-black/90 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-2xl">
            <div className="space-y-4">
              {/* Dashboard Navigation */}
              {onTabChange && (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      onTabChange('dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                      activeTab === 'dashboard' 
                        ? 'bg-lime-500/90 text-black font-medium' 
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
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                      activeTab === 'topcharts' 
                        ? 'bg-lime-500/90 text-black font-medium' 
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
                  <button className="w-full text-left text-gray-300 hover:text-white px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-300">
                    Features
                  </button>
                  <button className="w-full text-left text-gray-300 hover:text-white px-4 py-3 rounded-lg hover:bg-white/10 transition-all duration-300">
                    Prices
                  </button>
                  <Button className="w-full bg-lime-500/90 hover:bg-lime-400 text-black font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 mt-4">
                    Start Trading
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
