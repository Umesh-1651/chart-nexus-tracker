
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Lock, Camera } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
}

export function ProfileModal({ isOpen, onClose, userEmail }: ProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');
  const [userName, setUserName] = useState(userEmail.split('@')[0]);
  const [email, setEmail] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const { toast } = useToast();

  const handleSaveProfile = () => {
    // Here you would typically save to your backend
    toast({
      title: "Profile Updated",
      description: "Your profile has been updated successfully.",
    });
  };

  const handlePasswordChange = () => {
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email to receive password reset instructions.",
        variant: "destructive",
      });
      return;
    }

    setIsChangingPassword(true);
    // Simulate sending email via Amazon SNS
    setTimeout(() => {
      setIsChangingPassword(false);
      toast({
        title: "Password Reset Email Sent",
        description: `Password reset instructions have been sent to ${email}`,
      });
      setEmail('');
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black/90 backdrop-blur-xl border-white/20 text-white max-w-md w-full mx-4">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Profile Settings</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Profile Picture */}
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="bg-lime-500 text-black font-bold text-2xl">
                  {userName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full bg-lime-500 hover:bg-lime-400 text-black p-0"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'profile'
                  ? 'bg-lime-500 text-black'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <User className="w-4 h-4 inline mr-2" />
              Profile
            </button>
            <button
              onClick={() => setActiveTab('password')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
                activeTab === 'password'
                  ? 'bg-lime-500 text-black'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <Lock className="w-4 h-4 inline mr-2" />
              Password
            </button>
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="username" className="text-gray-300">Display Name</Label>
                <Input
                  id="username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-lime-500"
                  placeholder="Enter your display name"
                />
              </div>
              <div>
                <Label htmlFor="userEmail" className="text-gray-300">Email</Label>
                <Input
                  id="userEmail"
                  value={userEmail}
                  disabled
                  className="bg-gray-500/20 border-white/20 text-gray-400"
                />
              </div>
              <Button
                onClick={handleSaveProfile}
                className="w-full bg-lime-500 hover:bg-lime-400 text-black font-semibold"
              >
                Save Changes
              </Button>
            </div>
          )}

          {/* Password Tab */}
          {activeTab === 'password' && (
            <div className="space-y-4">
              <div className="text-center p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <Mail className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <p className="text-sm text-gray-300 mb-3">
                  Enter your email to receive password reset instructions
                </p>
              </div>
              <div>
                <Label htmlFor="resetEmail" className="text-gray-300">Email Address</Label>
                <Input
                  id="resetEmail"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-lime-500"
                  placeholder="Enter your email address"
                />
              </div>
              <Button
                onClick={handlePasswordChange}
                disabled={isChangingPassword}
                className="w-full bg-blue-500 hover:bg-blue-400 text-white font-semibold"
              >
                {isChangingPassword ? 'Sending...' : 'Send Reset Email'}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
