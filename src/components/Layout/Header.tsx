
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Settings, LogOut } from 'lucide-react';

interface HeaderProps {
  activeTab?: 'dashboard' | 'topcharts';
  onTabChange?: (tab: 'dashboard' | 'topcharts') => void;
  userEmail?: string;
  onLogout?: () => void;
}

export function Header({ activeTab, onTabChange, userEmail, onLogout }: HeaderProps) {
  return (
    <header className="bg-black/80 backdrop-blur-md border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-lime-500 rounded-lg flex items-center justify-center">
              <span className="text-black font-bold text-sm">TT</span>
            </div>
            <span className="text-white font-semibold text-xl">TradeTracker</span>
          </div>
          
          {/* Navigation Tabs */}
          {onTabChange && (
            <nav className="flex space-x-6">
              <button
                onClick={() => onTabChange('dashboard')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'dashboard' 
                    ? 'bg-lime-500 text-black font-medium' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => onTabChange('topcharts')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === 'topcharts' 
                    ? 'bg-lime-500 text-black font-medium' 
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                Top Charts
              </button>
            </nav>
          )}
        </div>

        {/* Profile Dropdown */}
        {userEmail && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-lime-500 text-black">
                    {userEmail.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-gray-900 border-gray-700" align="end">
              <DropdownMenuItem className="text-gray-300 hover:text-white hover:bg-gray-800">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={onLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
}
