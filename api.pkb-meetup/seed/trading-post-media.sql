-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated deletes" ON storage.objects;
DROP POLICY IF EXISTS "Allow public read" ON storage.objects;

-- Create bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('trading-post-media', 'trading-post-media', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated uploads
DROP POLICY IF EXISTS "Allow authenticated uploads" ON storage.objects;

CREATE POLICY "Allow authenticated uploads"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'trading-post-media'
  AND (
    -- Only allow if the user owns the trading post referenced by the file path
    EXISTS (
      SELECT 1 FROM trading_posts
      WHERE id::text = split_part(storage.objects.name, '/', 1)
        AND userId = auth.uid()::text
    )
  )
);

-- Allow authenticated deletes
CREATE POLICY "Allow authenticated deletes"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'trading-post-media' AND
  (split_part(name, '/', 1) IN (
    SELECT id::text 
    FROM trading_posts 
    WHERE userId = auth.uid()::text
  ))
);

-- Allow public read access
CREATE POLICY "Allow public read"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'trading-post-media');

-- Enable RLS on the storage.objects table
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Fix the trigger function for updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."update_at" = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_trading_posts_update_at ON "trading_posts";

CREATE TRIGGER trigger_trading_posts_update_at
    BEFORE UPDATE ON "trading_posts"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();