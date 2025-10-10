import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, LogOut, Plus } from 'lucide-react';
import { PropertyForm } from '@/components/admin/PropertyForm';
import { PropertyList } from '@/components/admin/PropertyList';

export default function AdminDashboard() {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [properties, setProperties] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any>(null);

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      navigate('/auth');
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchProperties();
    }
  }, [user, isAdmin]);

  const fetchProperties = async () => {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load properties.',
      });
    }
  };

  const handleCreateOrUpdate = async (data: any) => {
    setLoading(true);
    try {
      if (editingProperty) {
        const { error } = await supabase
          .from('properties')
          .update(data)
          .eq('id', editingProperty.id);

        if (error) throw error;

        toast({
          title: 'Success!',
          description: 'Property updated successfully.',
        });
      } else {
        const { error } = await supabase.from('properties').insert({
          ...data,
          created_by: user?.id,
        });

        if (error) throw error;

        toast({
          title: 'Success!',
          description: 'Property created successfully.',
        });
      }

      setShowForm(false);
      setEditingProperty(null);
      fetchProperties();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (property: any) => {
    setEditingProperty(property);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success!',
        description: 'Property deleted successfully.',
      });

      fetchProperties();
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
    }
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingProperty(null);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <header className="bg-black text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-serif gradient-text">Admin Dashboard</h1>
          <Button variant="ghost" onClick={signOut} className="text-white">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out
          </Button>
        </div>
      </header>

      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <Button
            onClick={() => {
              setShowForm(!showForm);
              setEditingProperty(null);
            }}
            className="mb-4"
          >
            <Plus className="mr-2 h-4 w-4" />
            {showForm ? 'View All Properties' : 'Add New Property'}
          </Button>
        </div>

        {showForm ? (
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle>
                {editingProperty ? 'Edit Property' : 'Add New Property Listing'}
              </CardTitle>
              <CardDescription>
                {editingProperty
                  ? 'Update the property details'
                  : 'Fill in the details to create a new property listing'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PropertyForm
                initialData={editingProperty}
                onSubmit={handleCreateOrUpdate}
                onCancel={handleCancelForm}
                loading={loading}
              />
            </CardContent>
          </Card>
        ) : (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Manage Properties</h2>
            <PropertyList
              properties={properties}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}
      </div>
    </div>
  );
}
