// src/components/PricingPage.tsx
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useState } from 'react';

interface UserData {
  email: string;
  password: string;
  fullName: string;
}

interface LocationState {
  membershipTier: 'silver' | 'gold' | 'platinum';
  userData: UserData;
}

const pricingPlans = {
  silver: {
    name: 'Silver',
    price: '$1,000',
    period: '/month',
    description: 'Perfect for getting started',
    features: [
      'Basic property listings',
      'Standard support',
      'Community access',
      'Monthly newsletter'
    ]
  },
  gold: {
    name: 'Gold',
    price: '$500',
    period: '/month',
    description: 'Great for active members',
    features: [
      'All Silver features',
      'Priority property access',
      'Enhanced support',
      'Investment insights',
      'Event invitations'
    ]
  },
  platinum: {
    name: 'Platinum',
    price: '$2,000',
    period: '/month',
    description: 'Ultimate membership experience',
    features: [
      'All Gold features',
      'Exclusive property deals',
      '24/7 dedicated support',
      'Personal concierge',
      'VIP event access',
      'Investment portfolio review'
    ]
  }
};

export default function PricingPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const { membershipTier, userData } = location.state as LocationState;
  const plan = pricingPlans[membershipTier];

  const handleCreateAccount = async () => {
    setLoading(true);

    const { error } = await signUp(userData.email, userData.password, userData.fullName);

    if (error) {
      toast({
        variant: 'destructive',
        title: 'Error creating account',
        description: error.message,
      });
      setLoading(false);
      return;
    }

    // Update membership tier
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ membership_tier: membershipTier })
        .eq('id', user.id);

      if (updateError) {
        console.error('Error updating membership tier:', updateError);
      }
    }

    toast({
      title: 'Account created!',
      description: `Welcome to Nimrod Estates ${membershipTier.charAt(0).toUpperCase() + membershipTier.slice(1)} membership.`,
    });
    navigate('/dashboard');

    setLoading(false);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Review Your Plan</CardTitle>
          <CardDescription>
            You've selected the {plan.name} membership
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold">{plan.price}</div>
            <div className="text-muted-foreground">{plan.period}</div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-3">What's included:</h3>
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-4 bg-muted rounded-lg">
            <p className="text-sm">
              <strong>Account details:</strong><br />
              Name: {userData.fullName}<br />
              Email: {userData.email}
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-3">
          <Button 
            onClick={handleCreateAccount} 
            className="w-full" 
            disabled={loading}
          >
            {loading ? 'Creating Account...' : `Confirm ${plan.name} Membership`}
          </Button>
          <Button 
            onClick={handleGoBack} 
            variant="outline" 
            className="w-full"
          >
            Choose Different Plan
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}