
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Edit, Shield, Clock, CheckCircle } from 'lucide-react';

interface UserProfileProps {
  userEmail: string;
}

export function UserProfile({ userEmail }: UserProfileProps) {
  const userName = userEmail.split('@')[0];
  const currentTime = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return (
    <Card className="bg-black/40 backdrop-blur-md border-white/20 hover:shadow-2xl hover:shadow-lime-500/10 transition-all duration-500">
      <CardContent className="p-4 lg:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
          <Avatar className="h-16 w-16 lg:h-20 lg:w-20">
            <AvatarFallback className="bg-lime-500 text-black font-bold text-xl lg:text-2xl">
              {userName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg lg:text-xl capitalize">{userName}</h3>
            <p className="text-gray-400 text-sm lg:text-base">{userEmail}</p>
            <div className="flex items-center space-x-2 mt-2">
              <Clock className="w-4 h-4 text-gray-400" />
              <span className="text-gray-400 text-xs lg:text-sm">IST {currentTime}</span>
            </div>
          </div>
          <Button variant="outline" className="border-white/20 text-gray-300 hover:bg-white/10 hover:text-white hover:border-lime-500/50 text-sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3 lg:p-4 bg-lime-500/10 rounded-lg border border-lime-500/20">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-4 h-4 text-lime-400" />
              <span className="text-lime-400 text-xs lg:text-sm font-medium">Demat Account</span>
            </div>
            <p className="text-white font-semibold text-sm lg:text-base">Linked & Verified</p>
            <p className="text-gray-400 text-xs">NSE/BSE Trading Active</p>
          </div>
          
          <div className="p-3 lg:p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-xs lg:text-sm font-medium">Security Status</span>
            </div>
            <p className="text-white font-semibold text-sm lg:text-base">High Security</p>
            <p className="text-gray-400 text-xs">2FA Enabled</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
