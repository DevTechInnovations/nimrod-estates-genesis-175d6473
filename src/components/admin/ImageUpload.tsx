import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, Loader2 } from 'lucide-react';

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
}

export function ImageUpload({ images, onImagesChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  // Increased file size limit to 20MB (you can adjust this as needed)
  const MAX_FILE_SIZE = 100 * 1024 * 1024; // 20MB

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const uploadedUrls: string[] = [];
    const errors: string[] = [];

    try {
      for (const file of Array.from(files)) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          errors.push(`${file.name} is not an image file`);
          continue;
        }

        // Updated file size validation - now 20MB
        if (file.size > MAX_FILE_SIZE) {
          errors.push(`${file.name} exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`);
          continue;
        }

        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`;

        // Upload to Supabase Storage
        const { data, error } = await supabase.storage
          .from('property-images')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: false,
          });

        if (error) {
          errors.push(`Failed to upload ${file.name}: ${error.message}`);
          continue;
        }

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('property-images')
          .getPublicUrl(data.path);

        uploadedUrls.push(publicUrl);
      }

      // Show success message if any images were uploaded
      if (uploadedUrls.length > 0) {
        onImagesChange([...images, ...uploadedUrls]);
        toast({
          title: 'Success!',
          description: `${uploadedUrls.length} image(s) uploaded successfully`,
        });
      }

      // Show error messages if any
      if (errors.length > 0) {
        toast({
          variant: 'destructive',
          title: 'Upload issues',
          description: errors.slice(0, 3).join(', ') + (errors.length > 3 ? ` and ${errors.length - 3} more...` : ''),
        });
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Upload failed',
        description: error.message,
      });
    } finally {
      setUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  const handleRemoveImage = async (index: number) => {
    const imageUrl = images[index];
    
    // Extract filename from URL
    const urlParts = imageUrl.split('/');
    const fileName = urlParts[urlParts.length - 1];

    try {
      // Only delete from storage if it's in our bucket
      if (imageUrl.includes('property-images')) {
        const { error } = await supabase.storage
          .from('property-images')
          .remove([fileName]);

        if (error) {
          console.error('Error deleting from storage:', error);
        }
      }

      // Remove from list
      const newImages = images.filter((_, i) => i !== index);
      onImagesChange(newImages);

      toast({
        title: 'Image removed',
        description: 'Image has been removed successfully',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to remove image',
      });
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          disabled={uploading}
        />
        <label htmlFor="image-upload">
          <Button
            type="button"
            variant="outline"
            disabled={uploading}
            className="w-full"
            onClick={() => document.getElementById('image-upload')?.click()}
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload Images
              </>
            )}
          </Button>
        </label>
        <p className="text-xs text-muted-foreground mt-1">
          Select multiple images (max {MAX_FILE_SIZE / 1024 / 1024}MB each, JPG/PNG/WEBP)
        </p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((imageUrl, index) => (
            <div key={index} className="relative group">
              <img
                src={imageUrl}
                alt={`Property image ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}