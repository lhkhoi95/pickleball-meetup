-- Drop existing table and types if they exist
DROP TABLE IF EXISTS trading_posts CASCADE;
DROP TYPE IF EXISTS item_condition;
DROP TYPE IF EXISTS item_category;
DROP TYPE IF EXISTS post_status;

-- Create enum types
CREATE TYPE item_condition AS ENUM (
    'new',
    'like_new',
    'good',
    'fair',
    'poor'
);

CREATE TYPE item_category AS ENUM (
    'paddles',
    'balls',
    'shoes',
    'apparel',
    'accessories',
    'other'
);

CREATE TYPE post_status AS ENUM ('active', 'sold', 'pending', 'cancelled');

-- Create trading posts table
CREATE TABLE IF NOT EXISTS trading_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    condition item_condition NOT NULL,
    category item_category NOT NULL,
    location TEXT NOT NULL,
    status post_status DEFAULT 'active',
    media_files JSONB DEFAULT '[]'::JSONB,
    created_at TIMESTAMPTZ DEFAULT now(),
    update_at TIMESTAMPTZ DEFAULT now()
);

-- Create index for faster lookups
CREATE INDEX idx_trading_posts_user_id ON trading_posts(user_id);

-- Create trigger for automatic update_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.update_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_trading_posts_update_at
    BEFORE UPDATE ON trading_posts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

