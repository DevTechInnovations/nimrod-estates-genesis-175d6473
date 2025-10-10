-- Create storage bucket for property images
INSERT INTO storage.buckets (id, name, public)
VALUES ('property-images', 'property-images', true);

-- Allow admins to upload property images
CREATE POLICY "Admins can upload property images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'property-images' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Allow admins to update property images
CREATE POLICY "Admins can update property images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'property-images' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Allow admins to delete property images
CREATE POLICY "Admins can delete property images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'property-images' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Allow public read access to property images
CREATE POLICY "Public can view property images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'property-images');