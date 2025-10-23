import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Building, MapPin, DollarSign, Bed, Bath, Square, Crown, TrendingUp, Link, Plus, X } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  investmentOpportunity: boolean;
  video_url: string;
  pdf_url: string;
  images: string[];
  imageLinks: string[];
  propertyType: 'sale' | 'rental';
  rentalPeriod: string;
  securityDeposit: string;
}

interface PropertyFormProps {
  initialData?: any;
  onSubmit: (data: any) => Promise<void>;
  onCancel?: () => void;
  loading: boolean;
}

// Property types array
const propertyTypes = [
  'Apartment',
  'Villa',
  'Penthouse',
  'Townhouse',
  'Condominium',
  'Studio',
  'Duplex',
  'Triplex',
  'Mansion',
  'Bungalow',
  'Cottage',
  'Chalet',
  'Farmhouse',
  'Castle',
  'Loft',
  'Commercial Building',
  'Office Space',
  'Retail Space',
  'Industrial Property',
  'Land',
  'Beach House',
  'Mountain Cabin',
  'Luxury Estate',
  'Gated Community Home',
  'Waterfront Property',
  'Golf Course Property'
];

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
    investmentOpportunity: false,
    video_url: '',
    pdf_url: '',
    images: [],
    imageLinks: [],
    propertyType: 'sale',
    rentalPeriod: '',
    securityDeposit: ''
  });

  const [newImageLink, setNewImageLink] = useState('');

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
        investmentOpportunity: initialData.investmentOpportunity || false,
        video_url: initialData.video_url || '',
        pdf_url: initialData.pdf_url || '',
        images: initialData.images || [],
        imageLinks: initialData.imageLinks || [],
        propertyType: initialData.property_type || 'sale',
        rentalPeriod: initialData.rental_period || '',
        securityDeposit: initialData.security_deposit || ''
      });
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.images.length === 0 && formData.imageLinks.length === 0) {
      alert('Please upload at least one image or add an image link');
      return;
    }

    // Prepare the data exactly as the database expects it
    const submitData = {
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
      investmentOpportunity: formData.investmentOpportunity,
      video_url: formData.video_url || null,
      pdf_url: formData.pdf_url || null,
      images: formData.images,
      imageLinks: formData.imageLinks,
      property_type: formData.propertyType,
      rental_period: formData.propertyType === 'rental' ? formData.rentalPeriod : null,
      security_deposit: formData.propertyType === 'rental' ? formData.securityDeposit : null
    };

    console.log('Submitting data:', submitData);
    await onSubmit(submitData);
  };

  const addImageLink = () => {
    if (!newImageLink.trim()) return;

    // Validate URL format
    try {
      new URL(newImageLink);
    } catch {
      alert('Please enter a valid URL');
      return;
    }

    // Check for Google Drive links and convert to direct image URL if possible
    const processedLink = processGoogleDriveLink(newImageLink);

    setFormData({
      ...formData,
      imageLinks: [...formData.imageLinks, processedLink],
    });
    setNewImageLink('');
  };

  const removeImageLink = (index: number) => {
    setFormData({
      ...formData,
      imageLinks: formData.imageLinks.filter((_, i) => i !== index),
    });
  };

  const processGoogleDriveLink = (url: string): string => {
    if (url.includes('drive.google.com')) {
      const fileIdMatch = url.match(/\/d\/([^\/]+)/);
      if (fileIdMatch) {
        const fileId = fileIdMatch[1];
        return `https://drive.google.com/uc?export=view&id=${fileId}`;
      }
      
      const openIdMatch = url.match(/[?&]id=([^&]+)/);
      if (openIdMatch) {
        const fileId = openIdMatch[1];
        return `https://drive.google.com/uc?export=view&id=${fileId}`;
      }
    }
    
    return url;
  };

  const removeUploadedImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  // All images for preview (uploaded + links)
  const allImages = [...formData.images, ...formData.imageLinks];

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
              
              {/* Property Type Selection */}
              <div className="space-y-2">
                <Label htmlFor="propertyType" className="flex items-center gap-2">
                  <Building className="h-4 w-4" />
                  Property Type *
                </Label>
                <Select
                  value={formData.propertyType}
                  onValueChange={(value: 'sale' | 'rental') => setFormData({ ...formData, propertyType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sale">For Sale</SelectItem>
                    <SelectItem value="rental">For Rent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Rental-specific fields */}
              {formData.propertyType === 'rental' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="space-y-2">
                    <Label htmlFor="rentalPeriod">Rental Period *</Label>
                    <Select
                      value={formData.rentalPeriod}
                      onValueChange={(value) => setFormData({ ...formData, rentalPeriod: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="yearly">Yearly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="securityDeposit">Security Deposit</Label>
                    <Input
                      id="securityDeposit"
                      placeholder="e.g., $2,000"
                      value={formData.securityDeposit}
                      onChange={(e) => setFormData({ ...formData, securityDeposit: e.target.value })}
                    />
                  </div>
                </div>
              )}

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
                    {formData.propertyType === 'rental' && (
                      <span className="text-sm text-muted-foreground ml-1">
                        ({formData.rentalPeriod || 'per period'})
                      </span>
                    )}
                  </Label>
                  <Input
                    id="price"
                    placeholder={formData.propertyType === 'rental' ? "$5,000" : "$8,950,000"}
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type" className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Property Category *
                  </Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select property category" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
              
              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Upload Property Images *</Label>
                <ImageUpload
                  images={formData.images}
                  onImagesChange={(images) => setFormData({ ...formData, images })}
                />
              </div>

              {/* Image Links */}
              <div className="space-y-2">
                <Label htmlFor="image-link" className="flex items-center gap-2">
                  <Link className="h-4 w-4" />
                  Add Image Links (optional)
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="image-link"
                    placeholder="https://example.com/image.jpg or Google Drive link"
                    value={newImageLink}
                    onChange={(e) => setNewImageLink(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addImageLink();
                      }
                    }}
                  />
                  <Button type="button" onClick={addImageLink} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Supports direct image URLs and Google Drive links
                </p>

                {/* Image Links Preview */}
                {formData.imageLinks.length > 0 && (
                  <div className="mt-3">
                    <Label>Image Links Preview ({formData.imageLinks.length})</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
                      {formData.imageLinks.map((link, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={link}
                            alt={`External image ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg border"
                            onError={(e) => {
                              e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzljYTNhZCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIExpbms8L3RleHQ+PC9zdmc+';
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => removeImageLink(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Combined Images Preview */}
              {allImages.length > 0 && (
                <div className="mt-4">
                  <Label>All Property Images ({allImages.length})</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                    {allImages.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image}
                          alt={`Property image ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all rounded-lg" />
                        <button
                          type="button"
                          onClick={() => {
                            if (index < formData.images.length) {
                              removeUploadedImage(index);
                            } else {
                              removeImageLink(index - formData.images.length);
                            }
                          }}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="h-3 w-3" />
                        </button>
                        <div className="absolute bottom-1 left-1 bg-black bg-opacity-50 text-white text-xs px-1 rounded">
                          {index < formData.images.length ? 'Uploaded' : 'Link'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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