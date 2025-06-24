
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Settings, LogOut } from 'lucide-react';

interface GlassHeaderProps {
  activeTab?: 'dashboard' | 'topcharts';
  onTabChange?: (tab: 'dashboard' | 'topcharts') => void;
  userEmail?: string;
  onLogout?: () => void;
  showAuth?: boolean;
}

export function GlassHeader({ activeTab, onTabChange, userEmail, onLogout, showAuth = false }: GlassHeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-lime-500 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-black font-bold text-sm">TT</span>
            </div>
            <span className="text-white font-semibold text-xl">TradeTracker</span>
          </div>
          
          {/* Navigation Tabs */}
          {onTabChange && (
            <nav className="hidden md:flex space-x-6">
              <button
                onClick={() => onTabChange('dashboard')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm ${
                  activeTab === 'dashboard' 
                    ? 'bg-lime-500/90 text-black font-medium shadow-lg' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10 border border-white/20'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => onTabChange('topcharts')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 backdrop-blur-sm ${
                  activeTab === 'topcharts' 
                    ? 'bg-lime-500/90 text-black font-medium shadow-lg' 
                    : 'text-gray-300 hover:text-white hover:bg-white/10 border border-white/20'
                }`}
              >
                Top Charts
              </button>
            </nav>
          )}
          
          {/* Auth Navigation */}
          {showAuth && (
            <nav className="hidden md:flex space-x-6">
              <button className="text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300">
                Features
              </button>
              <button className="text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300">
                Prices
              </button>
              <button className="text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-300">
                Testimonials
              </button>
            </nav>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {showAuth && (
            <Button className="bg-lime-500/90 hover:bg-lime-400 text-black font-semibold px-6 py-2 rounded-lg backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
              Start Trading
            </Button>
          )}
          
          {/* Profile Dropdown */}
          {userEmail && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-lime-500 text-black font-semibold">
                      {userEmail.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-black/80 backdrop-blur-md border-white/20" align="end">
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
        </div>
      </div>
    </header>
  );
}
