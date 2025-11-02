// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '@/contexts/AuthContext';
// import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Button } from '@/components/ui/button';
// import { Badge } from '@/components/ui/badge';
// import { supabase } from '@/integrations/supabase/client';
// import { Crown, Mail, User, Settings, Home, HeadphonesIcon, Star, Calendar, Shield, Zap, LogOut } from 'lucide-react';

// interface Profile {
//   full_name: string;
//   email: string;
//   membership_tier: 'silver' | 'gold' | 'platinum';
//   email_notifications: boolean;
// }

// export default function Dashboard() {
//   const { user, loading, signOut } = useAuth();
//   const navigate = useNavigate();
//   const [profile, setProfile] = useState<Profile | null>(null);

//   useEffect(() => {
//     if (!loading && !user) {
//       navigate('/member-auth');
//     }
//   }, [user, loading, navigate]);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       if (!user) return;

//       const { data, error } = await supabase
//         .from('profiles')
//         .select('full_name, email, membership_tier, email_notifications')
//         .eq('id', user.id)
//         .single();

//       if (error) {
//         console.error('Error fetching profile:', error);
//         return;
//       }

//       setProfile(data);
//     };

//     fetchProfile();
//   }, [user]);

//   const handleSignOut = async () => {
//     try {
//       await signOut();
//       navigate('/member-auth');
//     } catch (error) {
//       console.error('Error signing out:', error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50">
//         <div className="text-center space-y-4">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
//           <p className="text-gray-600">Loading your dashboard...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!user || !profile) {
//     return null;
//   }

//   const getTierColor = (tier: string) => {
//     switch (tier) {
//       case 'platinum':
//         return 'bg-gradient-to-r from-slate-700 via-slate-600 to-slate-500 text-white shadow-lg';
//       case 'gold':
//         return 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 text-white shadow-lg';
//       case 'silver':
//         return 'bg-gradient-to-r from-gray-500 via-gray-400 to-gray-300 text-white shadow-md';
//       default:
//         return 'bg-secondary';
//     }
//   };

//   const getTierIcon = (tier: string) => {
//     switch (tier) {
//       case 'platinum':
//         return <Crown className="h-6 w-6" />;
//       case 'gold':
//         return <Star className="h-6 w-6" />;
//       case 'silver':
//         return <Shield className="h-6 w-6" />;
//       default:
//         return <User className="h-6 w-6" />;
//     }
//   };

//   const getTierBenefits = (tier: string) => {
//     const benefits = {
//       platinum: [
//         'Exclusive luxury properties',
//         '24/7 dedicated concierge',
//         'Priority viewing appointments',
//         'Market trend reports',
//         'Investment advisory'
//       ],
//       gold: [
//         'Premium property access',
//         'Extended viewing hours',
//         'Market updates',
//         'Priority support',
//         'Flexible scheduling'
//       ],
//       silver: [
//         'Standard property listings',
//         'Email notifications',
//         'Basic support',
//         'Online scheduling',
//         'Market overview'
//       ]
//     };
//     return benefits[tier as keyof typeof benefits] || benefits.silver;
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-50">
//       <Navbar />
      
//       <main className="flex-1 container mx-auto px-4 pt-24 pb-8"> {/* Increased pt-24 to push content down further */}
//         {/* Welcome Section - Moved further down */}
//         <div className="max-w-6xl mx-auto mb-8">
//           <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center relative">
//             {/* Sign Out Button */}
//             <div className="absolute top-4 right-4">
//               <Button 
//                 onClick={handleSignOut}
//                 variant="outline"
//                 size="sm"
//                 className="flex items-center gap-2 text-gold-600 hover:text-black hover:border-gold-200"
//               >
//                 <LogOut className="h-4 w-4" />
//                 Sign Out
//               </Button>
//             </div>
            
//             <div className="max-w-2xl mx-auto pt-4"> {/* Added pt-4 to account for sign out button */}
//               <h1 className="text-4xl font-bold text-gray-900 mb-3">
//                 Welcome back, {profile.full_name}!
//               </h1>
//               <p className="text-xl text-gray-600 mb-6">
//                 Here's everything you need to manage your membership and explore properties.
//               </p>
//               <div className="flex flex-wrap justify-center gap-3">
//                 <Badge variant="secondary" className="px-3 py-1">
//                   <Zap className="h-3 w-3 mr-1" />
//                   Active Member
//                 </Badge>
//                 <Badge variant="secondary" className="px-3 py-1">
//                   <Calendar className="h-3 w-3 mr-1" />
//                   Joined Recently
//                 </Badge>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="max-w-6xl mx-auto space-y-8">
//           {/* Main Dashboard Grid */}
//           <div className="grid gap-8 lg:grid-cols-3">
//             {/* Membership Card */}
//             <Card className="lg:col-span-2 border-0 shadow-lg">
//               <CardHeader className="pb-4">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <CardTitle className="flex items-center gap-3 text-2xl">
//                       {getTierIcon(profile.membership_tier)}
//                       Membership Status
//                     </CardTitle>
//                     <CardDescription className="text-base mt-2">
//                       Your current membership tier and benefits
//                     </CardDescription>
//                   </div>
//                   <Badge className={`${getTierColor(profile.membership_tier)} text-sm py-2 px-4 font-semibold`}>
//                     {profile.membership_tier.charAt(0).toUpperCase() + profile.membership_tier.slice(1)}
//                   </Badge>
//                 </div>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="grid gap-4 md:grid-cols-2">
//                   {getTierBenefits(profile.membership_tier).map((benefit, index) => (
//                     <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                       <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full"></div>
//                       <span className="text-sm text-gray-700">{benefit}</span>
//                     </div>
//                   ))}
//                 </div>
//                 <Button 
//                   onClick={() => navigate('/upgrade')}
//                   className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-sm"
//                   size="lg"
//                 >
//                   Upgrade Membership
//                 </Button>
//               </CardContent>
//             </Card>

//             {/* Profile Information */}
//             <Card className="border-0 shadow-lg">
//               <CardHeader className="pb-4">
//                 <CardTitle className="flex items-center gap-3 text-2xl">
//                   <User className="h-6 w-6" />
//                   Profile
//                 </CardTitle>
//                 <CardDescription>
//                   Your account details
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-6">
//                 <div className="space-y-4">
//                   <div className="p-4 bg-gray-50 rounded-lg">
//                     <p className="text-sm text-gray-600 mb-1">Full Name</p>
//                     <p className="font-semibold text-gray-900">{profile.full_name}</p>
//                   </div>
//                   <div className="p-4 bg-gray-50 rounded-lg">
//                     <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
//                       <Mail className="h-3 w-3" />
//                       Email Address
//                     </p>
//                     <p className="font-semibold text-gray-900">{profile.email}</p>
//                   </div>
//                   <div className="p-4 bg-gray-50 rounded-lg">
//                     <p className="text-sm text-gray-600 mb-1">Notifications</p>
//                     <p className="font-semibold text-gray-900">
//                       {profile.email_notifications ? 'Enabled' : 'Disabled'}
//                     </p>
//                   </div>
//                 </div>
//                 <Button 
//                   onClick={() => navigate('/settings')}
//                   variant="outline"
//                   className="w-full"
//                 >
//                   <Settings className="h-4 w-4 mr-2" />
//                   Edit Profile
//                 </Button>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Quick Actions */}
//           <Card className="border-0 shadow-lg">
//             <CardHeader>
//               <CardTitle className="text-2xl">Quick Actions</CardTitle>
//               <CardDescription>
//                 Manage your account and explore properties
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid gap-4 md:grid-cols-3">
//                 <Button 
//                   onClick={() => navigate('/properties')}
//                   className="h-24 flex flex-col gap-3 p-4 hover:shadow-md transition-all"
//                   variant="outline"
//                 >
//                   <Home className="h-6 w-6" />
//                   <span className="font-semibold">Browse Properties</span>
//                   <span className="text-xs text-gray-500">Explore available listings</span>
//                 </Button>

//                 <Button 
//                   onClick={() => navigate('/appointments')}
//                   className="h-24 flex flex-col gap-3 p-4 hover:shadow-md transition-all"
//                   variant="outline"
//                 >
//                   <Calendar className="h-6 w-6" />
//                   <span className="font-semibold">My Appointments</span>
//                   <span className="text-xs text-gray-500">View scheduled viewings</span>
//                 </Button>

//                 <Button 
//                   onClick={() => navigate('/contact')}
//                   className="h-24 flex flex-col gap-3 p-4 hover:shadow-md transition-all"
//                   variant="outline"
//                 >
//                   <HeadphonesIcon className="h-6 w-6" />
//                   <span className="font-semibold">Contact Support</span>
//                   <span className="text-xs text-gray-500">Get help & assistance</span>
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Recent Activity Section */}
//           <Card className="border-0 shadow-lg">
//             <CardHeader>
//               <CardTitle className="text-2xl">Recent Activity</CardTitle>
//               <CardDescription>
//                 Your latest interactions and updates
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                   <div className="flex items-center gap-3">
//                     <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                     <div>
//                       <p className="font-medium text-gray-900">Membership Activated</p>
//                       <p className="text-sm text-gray-600">Your {profile.membership_tier} membership is active</p>
//                     </div>
//                   </div>
//                   <span className="text-sm text-gray-500">Today</span>
//                 </div>
                
//                 <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
//                   <div className="flex items-center gap-3">
//                     <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                     <div>
//                       <p className="font-medium text-gray-900">Profile Completed</p>
//                       <p className="text-sm text-gray-600">Your profile information has been updated</p>
//                     </div>
//                   </div>
//                   <span className="text-sm text-gray-500">Recently</span>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Crown, Mail, User, Settings, Home, HeadphonesIcon, Star, Calendar, Shield, Zap, LogOut, RefreshCw } from 'lucide-react';

interface Profile {
  id: string;
  full_name: string;
  email: string;
  membership_tier: 'silver' | 'gold' | 'platinum';
  email_notifications: boolean;
  account_status: string;
  payment_status: string;
}

export default function Dashboard() {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/member-auth');
    }
  }, [user, authLoading, navigate]);

  const fetchProfile = async () => {
    if (!user) return;

    setProfileLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        setError('Profile not found. Please try signing out and back in.');
        return;
      }

      setProfile(data);
      
    } catch (error: any) {
      console.error('Error in fetchProfile:', error);
      setError(error.message);
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/member-auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleRetry = () => {
    fetchProfile();
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (profileLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-gray-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-6 max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
            <RefreshCw className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Profile Error</h2>
          <p className="text-gray-600">
            {error}
          </p>
          <div className="space-y-3">
            <Button onClick={handleRetry} className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Button 
              onClick={handleSignOut}
              variant="outline" 
              className="w-full"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-6 max-w-md mx-auto p-8">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto">
            <RefreshCw className="h-8 w-8 text-yellow-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Profile Not Found</h2>
          <p className="text-gray-600">
            We couldn't find your profile information.
          </p>
          <div className="space-y-3">
            <Button onClick={handleRetry} className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Button 
              onClick={handleSignOut}
              variant="outline" 
              className="w-full"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'platinum':
        return 'bg-gradient-to-r from-slate-700 via-slate-600 to-slate-500 text-white shadow-lg';
      case 'gold':
        return 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-400 text-white shadow-lg';
      case 'silver':
        return 'bg-gradient-to-r from-gray-500 via-gray-400 to-gray-300 text-white shadow-md';
      default:
        return 'bg-secondary';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'platinum':
        return <Crown className="h-6 w-6" />;
      case 'gold':
        return <Star className="h-6 w-6" />;
      case 'silver':
        return <Shield className="h-6 w-6" />;
      default:
        return <User className="h-6 w-6" />;
    }
  };

  const getTierBenefits = (tier: string) => {
    const benefits = {
      platinum: [
        'Exclusive luxury properties',
        '24/7 dedicated concierge',
        'Priority viewing appointments',
        'Market trend reports',
        'Investment advisory'
      ],
      gold: [
        'Premium property access',
        'Extended viewing hours',
        'Market updates',
        'Priority support',
        'Flexible scheduling'
      ],
      silver: [
        'Standard property listings',
        'Email notifications',
        'Basic support',
        'Online scheduling',
        'Market overview'
      ]
    };
    return benefits[tier as keyof typeof benefits] || benefits.silver;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-8">
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 text-center relative">
            <div className="absolute top-4 right-4">
              <Button 
                onClick={handleSignOut}
                variant="outline"
                size="sm"
                className="flex items-center gap-2 text-gold-600 hover:text-black hover:border-gold-200"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
            
            <div className="max-w-2xl mx-auto pt-4">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Welcome back, {profile.full_name}!
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Here's everything you need to manage your membership and explore properties.
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <Badge variant="secondary" className="px-3 py-1">
                  <Zap className="h-3 w-3 mr-1" />
                  Active Member
                </Badge>
                <Badge variant="secondary" className="px-3 py-1">
                  <Calendar className="h-3 w-3 mr-1" />
                  Member Since {new Date().toLocaleDateString()}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid gap-8 lg:grid-cols-3">
            <Card className="lg:col-span-2 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      {getTierIcon(profile.membership_tier)}
                      Membership Status
                    </CardTitle>
                    <CardDescription className="text-base mt-2">
                      Your current membership tier and benefits
                    </CardDescription>
                  </div>
                  <Badge className={`${getTierColor(profile.membership_tier)} text-sm py-2 px-4 font-semibold`}>
                    {profile.membership_tier.charAt(0).toUpperCase() + profile.membership_tier.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {getTierBenefits(profile.membership_tier).map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>
                <Button 
                  onClick={() => navigate('/upgrade')}
                  className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-sm"
                  size="lg"
                >
                  Upgrade Membership
                </Button>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <User className="h-6 w-6" />
                  Profile
                </CardTitle>
                <CardDescription>
                  Your account details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Full Name</p>
                    <p className="font-semibold text-gray-900">{profile.full_name}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1 flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      Email Address
                    </p>
                    <p className="font-semibold text-gray-900">{profile.email}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-1">Notifications</p>
                    <p className="font-semibold text-gray-900">
                      {profile.email_notifications ? 'Enabled' : 'Disabled'}
                    </p>
                  </div>
                </div>
                <Button 
                  onClick={() => navigate('/settings')}
                  variant="outline"
                  className="w-full"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </div>

           {/* Quick Actions */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Quick Actions</CardTitle>
              <CardDescription>
                Manage your account and explore properties
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Button 
                  onClick={() => navigate('/properties')}
                  className="h-24 flex flex-col gap-3 p-4 hover:shadow-md transition-all"
                  variant="outline"
                >
                  <Home className="h-6 w-6" />
                  <span className="font-semibold">Browse Properties</span>
                  <span className="text-xs text-gray-500">Explore available listings</span>
                </Button>

                <Button 
                  onClick={() => navigate('/appointments')}
                  className="h-24 flex flex-col gap-3 p-4 hover:shadow-md transition-all"
                  variant="outline"
                >
                  <Calendar className="h-6 w-6" />
                  <span className="font-semibold">My Appointments</span>
                  <span className="text-xs text-gray-500">View scheduled viewings</span>
                </Button>

                <Button 
                  onClick={() => navigate('/contact')}
                  className="h-24 flex flex-col gap-3 p-4 hover:shadow-md transition-all"
                  variant="outline"
                >
                  <HeadphonesIcon className="h-6 w-6" />
                  <span className="font-semibold">Contact Support</span>
                  <span className="text-xs text-gray-500">Get help & assistance</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity Section */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Recent Activity</CardTitle>
              <CardDescription>
                Your latest interactions and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-900">Membership Activated</p>
                      <p className="text-sm text-gray-600">Your {profile.membership_tier} membership is active</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">Today</span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-900">Profile Completed</p>
                      <p className="text-sm text-gray-600">Your profile information has been updated</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">Recently</span>
                </div>
              </div>
            </CardContent>
          </Card>
       
        </div>
      </main>

      <Footer />
    </div>
  );
}