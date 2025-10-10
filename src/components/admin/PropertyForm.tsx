import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { ImageUpload } from './ImageUpload';

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
      video_url: formData.video_url || null,
      pdf_url: formData.pdf_url || null,
      images: formData.images,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title *</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location *</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price *</Label>
          <Input
            id="price"
            placeholder="$8,950,000"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Type *</Label>
          <Input
            id="type"
            placeholder="Villa, Penthouse, etc."
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="bedrooms">Bedrooms *</Label>
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
          <Label htmlFor="bathrooms">Bathrooms *</Label>
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
          <Label htmlFor="area">Area (m²) *</Label>
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

        <div className="space-y-2">
          <Label htmlFor="roi">ROI (optional)</Label>
          <Input
            id="roi"
            placeholder="12%"
            value={formData.roi}
            onChange={(e) => setFormData({ ...formData, roi: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Property Images *</Label>
        <ImageUpload
          images={formData.images}
          onImagesChange={(images) => setFormData({ ...formData, images })}
        />
      </div>

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

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="featured"
          checked={formData.featured}
          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
          className="h-4 w-4"
        />
        <Label htmlFor="featured" className="cursor-pointer">
          Mark as Featured Property
        </Label>
      </div>

      <div className="flex gap-2">
        <Button type="submit" className="flex-1" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {initialData ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            initialData ? 'Update Property' : 'Create Property'
          )}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
