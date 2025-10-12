import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Crown, Mail, User, Settings } from 'lucide-react';

interface Profile {
  full_name: string;
  email: string;
  membership_tier: 'silver' | 'gold' | 'platinum';
  email_notifications: boolean;
}

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate('/member-auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('full_name, email, membership_tier, email_notifications')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data);
    };

    fetchProfile();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">Loading...</div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum':
        return 'bg-gradient-to-r from-slate-700 to-slate-400 text-white';
      case 'gold':
        return 'bg-gradient-to-r from-yellow-600 to-yellow-400 text-white';
      case 'silver':
        return 'bg-gradient-to-r from-gray-500 to-gray-300 text-white';
      default:
        return 'bg-secondary';
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-serif gradient-text">Member Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {profile.full_name}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5" />
                  Membership Status
                </CardTitle>
                <CardDescription>Your current membership tier</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Badge className={`${getTierColor(profile.membership_tier)} text-lg py-2 px-4`}>
                  {profile.membership_tier.charAt(0).toUpperCase() + profile.membership_tier.slice(1)} Member
                </Badge>
                <div className="text-sm text-muted-foreground">
                  {profile.membership_tier === 'platinum' && (
                    <p>You have access to all premium features and exclusive properties.</p>
                  )}
                  {profile.membership_tier === 'gold' && (
                    <p>You have access to enhanced benefits and priority viewing.</p>
                  )}
                  {profile.membership_tier === 'silver' && (
                    <p>You have access to all basic membership benefits.</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <CardDescription>Your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{profile.full_name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Mail className="h-3 w-3" />
                    Email
                  </p>
                  <p className="font-medium">{profile.email}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage your account and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={() => navigate('/settings')} 
                className="w-full justify-start"
                variant="outline"
              >
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </Button>
              <Button 
                onClick={() => navigate('/properties')} 
                className="w-full justify-start"
                variant="outline"
              >
                Browse Properties
              </Button>
              <Button 
                onClick={() => navigate('/contact')} 
                className="w-full justify-start"
                variant="outline"
              >
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
