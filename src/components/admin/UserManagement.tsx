import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Search, Eye, Shield, Users } from 'lucide-react';
import { UserDetailsDialog } from './UserDetailsDialog';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  membership_tier: 'gold' | 'platinum' | 'silver' | string;
  account_status: 'active' | 'pending' | 'suspended' | string;
  payment_status: 'verified' | 'unverified' | 'pending' | string;
  created_at: string;
  payment_verified_at: string | null;
  last_login_at: string | null;
  role?: 'admin' | 'user';
};

// List of admin user IDs - you'll need to set these manually
const ADMIN_USER_IDS: string[] = [
  // Add actual admin user IDs from your auth.users table here
  // Example: '12345678-1234-1234-1234-123456789012'
];

export function UserManagement() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [activeTab, setActiveTab] = useState<'users' | 'admins'>('users');
  const itemsPerPage = 10;
  const { toast } = useToast();

  useEffect(() => {
    fetchProfiles();
  }, [currentPage, searchQuery, tierFilter, statusFilter, activeTab]);

  // Helper function to determine user role
  const getUserRole = (profile: Profile): 'admin' | 'user' => {
    if (profile.role) {
      return profile.role;
    }
    return ADMIN_USER_IDS.includes(profile.id) ? 'admin' : 'user';
  };

  const fetchProfiles = async () => {
    setLoading(true);
    try {
      // First, let's check what columns actually exist in the profiles table
      const { data: sampleData, error: sampleError } = await supabase
        .from('profiles')
        .select('*')
        .limit(1);

      if (sampleError) {
        console.error('Error checking table structure:', sampleError);
        throw new Error(`Database error: ${sampleError.message}`);
      }

      console.log('Sample profile data:', sampleData);

      // Build the query with only existing columns
      let query = supabase
        .from('profiles')
        .select('*', { count: 'exact' });

      // Try to order by created_at if it exists, otherwise use id
      try {
        query = query.order('created_at', { ascending: false });
      } catch (error) {
        query = query.order('id', { ascending: false });
      }

      if (searchQuery) {
        // Use the columns that likely exist
        query = query.or(`email.ilike.%${searchQuery}%,full_name.ilike.%${searchQuery}%`);
      }

      if (tierFilter !== 'all') {
        query = query.eq('membership_tier', tierFilter);
      }

      if (statusFilter !== 'all') {
        query = query.eq('account_status', statusFilter);
      }

      const from = (currentPage - 1) * itemsPerPage;
      const to = from + itemsPerPage - 1;
      
      const { data, error, count } = await query.range(from, to);

      if (error) {
        console.error('Supabase query error:', error);
        
        // If there's a column error, try a more basic query
        if (error.message.includes('column') && error.message.includes('does not exist')) {
          console.log('Trying fallback query...');
          const fallbackQuery = supabase
            .from('profiles')
            .select('id, email, full_name, created_at')
            .range(from, to);
          
          const { data: fallbackData, error: fallbackError } = await fallbackQuery;
          
          if (fallbackError) {
            throw fallbackError;
          }
          
          // Map fallback data to our Profile type with defaults
          const mappedProfiles: Profile[] = (fallbackData || []).map((item: any) => ({
            id: item.id,
            email: item.email || '',
            full_name: item.full_name,
            membership_tier: item.membership_tier || 'silver',
            account_status: item.account_status || 'active',
            payment_status: item.payment_status || 'unverified',
            created_at: item.created_at || new Date().toISOString(),
            payment_verified_at: item.payment_verified_at,
            last_login_at: item.last_login_at,
          }));
          
          setProfiles(mappedProfiles);
          setTotalPages(Math.ceil((count || mappedProfiles.length) / itemsPerPage));
          return;
        }
        
        throw error;
      }
      
      // Map the data to ensure we have all required fields
      const mappedData: Profile[] = (data || []).map((item: any) => ({
        id: item.id,
        email: item.email || '',
        full_name: item.full_name,
        membership_tier: item.membership_tier || 'silver',
        account_status: item.account_status || 'active',
        payment_status: item.payment_status || 'unverified',
        created_at: item.created_at || new Date().toISOString(),
        payment_verified_at: item.payment_verified_at,
        last_login_at: item.last_login_at,
        role: item.role as 'admin' | 'user' | undefined,
      }));

      // Filter by role based on active tab
      const filteredProfiles = mappedData.filter(profile => {
        const role = getUserRole(profile);
        return activeTab === 'admins' ? role === 'admin' : role === 'user';
      });

      setProfiles(filteredProfiles);
      setTotalPages(Math.ceil((filteredProfiles.length) / itemsPerPage));
    } catch (error: any) {
      console.error('Error fetching profiles:', error);
      toast({
        variant: 'destructive',
        title: 'Error Loading Users',
        description: error.message || 'Please check your database connection and table structure.',
      });
      setProfiles([]);
    } finally {
      setLoading(false);
    }
  };

  const updateAccountStatus = async (userId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ account_status: status })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: `Account status updated to ${status}.`,
      });

      fetchProfiles();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    }
  };

  const updateMembershipTier = async (userId: string, tier: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ membership_tier: tier })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Membership tier updated successfully.',
      });

      fetchProfiles();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    }
  };

  const updatePaymentStatus = async (userId: string, status: string) => {
    try {
      const updates: any = { 
        payment_status: status
      };
      if (status === 'verified') {
        updates.payment_verified_at = new Date().toISOString();
      }

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Payment status updated successfully.',
      });

      fetchProfiles();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    }
  };

  const updateUserRole = async (userId: string, role: 'admin' | 'user') => {
    try {
      // Try to update the role column if it exists
      const { error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('id', userId);

      if (error) {
        // If role column doesn't exist, use the ADMIN_USER_IDS approach
        if (role === 'admin') {
          if (!ADMIN_USER_IDS.includes(userId)) {
            ADMIN_USER_IDS.push(userId);
          }
        } else {
          const index = ADMIN_USER_IDS.indexOf(userId);
          if (index > -1) {
            ADMIN_USER_IDS.splice(index, 1);
          }
        }
        
        toast({
          title: 'Success',
          description: `User role updated to ${role}. Using temporary role management.`,
        });
      } else {
        toast({
          title: 'Success',
          description: `User role updated to ${role}.`,
        });
      }

      fetchProfiles();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: 'default' | 'secondary' | 'destructive' } = {
      active: 'default',
      pending: 'secondary',
      suspended: 'destructive',
    };
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>;
  };

  const getPaymentBadge = (status: string) => {
    const variants: { [key: string]: 'default' | 'secondary' | 'destructive' } = {
      verified: 'default',
      pending: 'secondary',
      unverified: 'destructive',
    };
    return <Badge variant={variants[status] || 'secondary'}>{status}</Badge>;
  };

  const getTierBadge = (tier: string) => {
    const colors: { [key: string]: string } = {
      gold: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
      silver: 'bg-gray-500/10 text-gray-500 border-gray-500/20',
      platinum: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
    };
    return <Badge className={colors[tier] || 'bg-blue-500/10 text-blue-500 border-blue-500/20'}>{tier}</Badge>;
  };

  const getRoleBadge = (profile: Profile) => {
    const role = getUserRole(profile);
    if (role === 'admin') {
      return <Badge className="bg-blue-500/10 text-blue-500 border-blue-500/20 flex items-center gap-1 w-fit">
        <Shield className="h-3 w-3" />
        Admin
      </Badge>;
    }
    return <Badge variant="outline" className="text-muted-foreground">User</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading users...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Button onClick={fetchProfiles} variant="outline" className="flex items-center gap-2">
          <Loader2 className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`Search ${activeTab} by name or email...`}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-10"
          />
        </div>
        <Select value={tierFilter} onValueChange={(value) => {
          setTierFilter(value);
          setCurrentPage(1);
        }}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by tier" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tiers</SelectItem>
            <SelectItem value="silver">Silver</SelectItem>
            <SelectItem value="gold">Gold</SelectItem>
            <SelectItem value="platinum">Platinum</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusFilter} onValueChange={(value) => {
          setStatusFilter(value);
          setCurrentPage(1);
        }}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs value={activeTab} onValueChange={(value) => {
        setActiveTab(value as 'users' | 'admins');
        setCurrentPage(1);
      }}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Regular Users ({activeTab === 'users' ? profiles.length : '...'})
          </TabsTrigger>
          <TabsTrigger value="admins" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Admin Users ({activeTab === 'admins' ? profiles.length : '...'})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="users" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profiles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No regular users found
                    </TableCell>
                  </TableRow>
                ) : (
                  profiles.map((profile) => (
                    <TableRow key={profile.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {profile.full_name || 'N/A'}
                          {getRoleBadge(profile)}
                        </div>
                      </TableCell>
                      <TableCell>{profile.email}</TableCell>
                      <TableCell>{getTierBadge(profile.membership_tier)}</TableCell>
                      <TableCell>{getStatusBadge(profile.account_status)}</TableCell>
                      <TableCell>{getPaymentBadge(profile.payment_status)}</TableCell>
                      <TableCell>
                        {new Date(profile.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedUser(profile)}
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {getUserRole(profile) === 'user' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateUserRole(profile.id, 'admin')}
                              className="text-blue-600 border-blue-200 hover:bg-blue-50"
                              title="Promote to Admin"
                            >
                              <Shield className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="admins" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Tier</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {profiles.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No admin users found
                    </TableCell>
                  </TableRow>
                ) : (
                  profiles.map((profile) => (
                    <TableRow key={profile.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {profile.full_name || 'N/A'}
                          {getRoleBadge(profile)}
                        </div>
                      </TableCell>
                      <TableCell>{profile.email}</TableCell>
                      <TableCell>{getTierBadge(profile.membership_tier)}</TableCell>
                      <TableCell>{getStatusBadge(profile.account_status)}</TableCell>
                      <TableCell>{getPaymentBadge(profile.payment_status)}</TableCell>
                      <TableCell>
                        {new Date(profile.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedUser(profile)}
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {getUserRole(profile) === 'admin' && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateUserRole(profile.id, 'user')}
                              className="text-orange-600 border-orange-200 hover:bg-orange-50"
                              title="Demote to User"
                            >
                              <Users className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i + 1}>
                <PaginationLink
                  onClick={() => setCurrentPage(i + 1)}
                  isActive={currentPage === i + 1}
                  className="cursor-pointer"
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      {selectedUser && (
        <UserDetailsDialog
          user={selectedUser}
          open={!!selectedUser}
          onOpenChange={(open) => !open && setSelectedUser(null)}
          onUpdateAccountStatus={updateAccountStatus}
          onUpdateMembershipTier={updateMembershipTier}
          onUpdatePaymentStatus={updatePaymentStatus}
          onUpdateUserRole={updateUserRole}
          onRefresh={fetchProfiles}
        />
      )}
    </div>
  );
}