import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Building, MapPin, DollarSign, Bed, Bath, Square, Crown, TrendingUp } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';

interface PropertyFormData {
  title: string;
  description: string;
  location: string;
  price: string;
  bedrooms: string;
  bathrooms: string;
  area: string;
  roi: string;
  type: string;
  featured: boolean;
  exclusive: boolean;
  investmentOpportunity: boolean; // ← ADD THIS
  video_url: string;
  pdf_url: string;
  images: string[];
}

interface PropertyFormProps {
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
  onCancel?: () => void;
  loading: boolean;
}

export function PropertyForm({ initialData, onSubmit, onCancel, loading }: PropertyFormProps) {
  const [formData, setFormData] = useState<PropertyFormData>({
    title: '',
    description: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    roi: '',
    type: '',
    featured: false,
    exclusive: false,
    investmentOpportunity: false, // ← ADD THIS
    video_url: '',
    pdf_url: '',
    images: [],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        location: initialData.location || '',
        price: initialData.price || '',
        bedrooms: initialData.bedrooms?.toString() || '',
        bathrooms: initialData.bathrooms?.toString() || '',
        area: initialData.area?.toString() || '',
        roi: initialData.roi || '',
        type: initialData.type || '',
        featured: initialData.featured || false,
        exclusive: initialData.exclusive || false,
        investmentOpportunity: initialData.investmentOpportunity || false, // ← ADD THIS
        video_url: initialData.video_url || '',
        pdf_url: initialData.pdf_url || '',
        images: initialData.images || [],
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.images.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    await onSubmit({
      title: formData.title,
      description: formData.description,
      location: formData.location,
      price: formData.price,
      bedrooms: parseInt(formData.bedrooms),
      bathrooms: parseInt(formData.bathrooms),
      area: parseFloat(formData.area),
      roi: formData.roi || null,
      type: formData.type,
      featured: formData.featured,
      exclusive: formData.exclusive,
      investmentOpportunity: formData.investmentOpportunity, // ← ADD THIS
      video_url: formData.video_url || null,
      pdf_url: formData.pdf_url || null,
      images: formData.images,
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Building className="h-6 w-6" />
            {initialData ? 'Update Property' : 'Create New Property'}
          </CardTitle>
          <CardDescription>
            {initialData ? 'Update the property details below' : 'Fill in the details to create a new property listing'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Title *
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Luxury Villa with Ocean View"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    Location *
                  </Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Dubai Marina, Dubai"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price" className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Price *
                  </Label>
                  <Input
                    id="price"
                    placeholder="$8,950,000"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type" className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Type *
                  </Label>
                  <Input
                    id="type"
                    placeholder="Villa, Penthouse, Apartment"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Property Details Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Property Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bedrooms" className="flex items-center gap-2">
                    <Bed className="h-4 w-4" />
                    Bedrooms *
                  </Label>
                  <Input
                    id="bedrooms"
                    type="number"
                    min="0"
                    value={formData.bedrooms}
                    onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bathrooms" className="flex items-center gap-2">
                    <Bath className="h-4 w-4" />
                    Bathrooms *
                  </Label>
                  <Input
                    id="bathrooms"
                    type="number"
                    min="0"
                    value={formData.bathrooms}
                    onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="area" className="flex items-center gap-2">
                    <Square className="h-4 w-4" />
                    Area (m²) *
                  </Label>
                  <Input
                    id="area"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="roi" className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  ROI (optional)
                </Label>
                <Input
                  id="roi"
                  placeholder="12%"
                  value={formData.roi}
                  onChange={(e) => setFormData({ ...formData, roi: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the property features, amenities, and unique selling points..."
                  required
                />
              </div>
            </div>

            {/* Media Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Media & Documents</h3>
              <div className="space-y-2">
                <Label>Property Images *</Label>
                <ImageUpload
                  images={formData.images}
                  onImagesChange={(images) => setFormData({ ...formData, images })}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="video_url">Video URL (optional)</Label>
                  <Input
                    id="video_url"
                    placeholder="https://youtube.com/..."
                    value={formData.video_url}
                    onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pdf_url">PDF Brochure URL (optional)</Label>
                  <Input
                    id="pdf_url"
                    placeholder="https://example.com/brochure.pdf"
                    value={formData.pdf_url}
                    onChange={(e) => setFormData({ ...formData, pdf_url: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Property Flags Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Property Flags</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center space-x-3 p-4 border rounded-lg bg-gray-50">
                  <Switch
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: checked })}
                  />
                  <div className="flex-1 space-y-1">
                    <Label htmlFor="featured" className="text-base font-medium cursor-pointer">
                      Featured Property
                    </Label>
                    <p className="text-sm text-gray-500">Highlight this property on the homepage</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 border rounded-lg bg-gray-50">
                  <Switch
                    id="exclusive"
                    checked={formData.exclusive}
                    onCheckedChange={(checked) => setFormData({ ...formData, exclusive: checked })}
                  />
                  <div className="flex-1 space-y-1">
                    <Label htmlFor="exclusive" className="text-base font-medium cursor-pointer flex items-center gap-2">
                      <Crown className="h-4 w-4 text-amber-600" />
                      Exclusive Members Only
                    </Label>
                    <p className="text-sm text-gray-500">Visible only to logged-in users</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-4 border rounded-lg bg-gray-50">
                  <Switch
                    id="investmentOpportunity"
                    checked={formData.investmentOpportunity}
                    onCheckedChange={(checked) => setFormData({ ...formData, investmentOpportunity: checked })}
                  />
                  <div className="flex-1 space-y-1">
                    <Label htmlFor="investmentOpportunity" className="text-base font-medium cursor-pointer flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-600" />
                      Investment Opportunity
                    </Label>
                    <p className="text-sm text-gray-500">Mark as a prime investment property</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-6 border-t">
              <Button type="submit" className="flex-1" disabled={loading} size="lg">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {initialData ? 'Updating Property...' : 'Creating Property...'}
                  </>
                ) : (
                  initialData ? 'Update Property' : 'Create Property'
                )}
              </Button>
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel} size="lg">
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}