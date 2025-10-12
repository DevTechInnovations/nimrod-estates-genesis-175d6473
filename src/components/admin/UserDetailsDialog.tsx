import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, CreditCard, Calendar, Shield, TrendingUp } from 'lucide-react';

type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  membership_tier: 'gold' | 'platinum' | 'silver';
  account_status: 'active' | 'pending' | 'suspended';
  payment_status: 'verified' | 'unverified' | 'pending';
  created_at: string;
  payment_verified_at: string | null;
  last_login_at: string | null;
};

type UserDetailsDialogProps = {
  user: Profile;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUpdateAccountStatus: (userId: string, status: string) => void;
  onUpdateMembershipTier: (userId: string, tier: string) => void;
  onUpdatePaymentStatus: (userId: string, status: string) => void;
  onRefresh: () => void;
};

export function UserDetailsDialog({
  user,
  open,
  onOpenChange,
  onUpdateAccountStatus,
  onUpdateMembershipTier,
  onUpdatePaymentStatus,
  onRefresh,
}: UserDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">User Profile</DialogTitle>
          <DialogDescription>
            View and manage user details, membership, and payment status
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* User Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <User className="h-5 w-5" />
              <span>User Information</span>
            </div>
            <div className="grid gap-3 pl-7">
              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">Name:</span>
                <span className="col-span-2 font-medium">{user.full_name || 'Not provided'}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">Email:</span>
                <span className="col-span-2 font-medium">{user.email}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">User ID:</span>
                <span className="col-span-2 font-mono text-sm">{user.id}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Membership Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <TrendingUp className="h-5 w-5" />
              <span>Membership Details</span>
            </div>
            <div className="grid gap-4 pl-7">
              <div className="grid grid-cols-3 gap-2 items-center">
                <span className="text-muted-foreground">Current Tier:</span>
                <div className="col-span-2">
                  <Badge className="text-sm capitalize">{user.membership_tier}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 items-center">
                <span className="text-muted-foreground">Change Tier:</span>
                <div className="col-span-2">
                  <Select
                    defaultValue={user.membership_tier}
                    onValueChange={(value) => {
                      onUpdateMembershipTier(user.id, value);
                      onRefresh();
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="silver">Silver</SelectItem>
                      <SelectItem value="gold">Gold</SelectItem>
                      <SelectItem value="platinum">Platinum</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Account Status */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Shield className="h-5 w-5" />
              <span>Account Status</span>
            </div>
            <div className="grid gap-4 pl-7">
              <div className="grid grid-cols-3 gap-2 items-center">
                <span className="text-muted-foreground">Status:</span>
                <div className="col-span-2">
                  <Badge variant={user.account_status === 'active' ? 'default' : 'destructive'}>
                    {user.account_status}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 items-center">
                <span className="text-muted-foreground">Manage:</span>
                <div className="col-span-2 flex gap-2">
                  <Button
                    size="sm"
                    variant={user.account_status === 'active' ? 'outline' : 'default'}
                    onClick={() => {
                      onUpdateAccountStatus(user.id, 'active');
                      onRefresh();
                    }}
                  >
                    Activate
                  </Button>
                  <Button
                    size="sm"
                    variant={user.account_status === 'suspended' ? 'outline' : 'destructive'}
                    onClick={() => {
                      onUpdateAccountStatus(user.id, 'suspended');
                      onRefresh();
                    }}
                  >
                    Suspend
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Payment Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <CreditCard className="h-5 w-5" />
              <span>Payment Information</span>
            </div>
            <div className="grid gap-4 pl-7">
              <div className="grid grid-cols-3 gap-2 items-center">
                <span className="text-muted-foreground">Status:</span>
                <div className="col-span-2">
                  <Badge variant={user.payment_status === 'verified' ? 'default' : 'secondary'}>
                    {user.payment_status}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 items-center">
                <span className="text-muted-foreground">Verified At:</span>
                <span className="col-span-2 font-medium">
                  {user.payment_verified_at
                    ? new Date(user.payment_verified_at).toLocaleString()
                    : 'Not verified'}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 items-center">
                <span className="text-muted-foreground">Update Status:</span>
                <div className="col-span-2">
                  <Select
                    defaultValue={user.payment_status}
                    onValueChange={(value) => {
                      onUpdatePaymentStatus(user.id, value);
                      onRefresh();
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="unverified">Unverified</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Activity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <Calendar className="h-5 w-5" />
              <span>Activity</span>
            </div>
            <div className="grid gap-3 pl-7">
              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">Registered:</span>
                <span className="col-span-2 font-medium">
                  {new Date(user.created_at).toLocaleString()}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-muted-foreground">Last Login:</span>
                <span className="col-span-2 font-medium">
                  {user.last_login_at
                    ? new Date(user.last_login_at).toLocaleString()
                    : 'Never'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}