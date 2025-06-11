-- Create plants table
CREATE TABLE IF NOT EXISTS plants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  scientific_name TEXT,
  category TEXT NOT NULL CHECK (category IN ('indoor', 'outdoor', 'succulent', 'herb', 'flower', 'tree', 'cactus', 'fern')),
  image_url TEXT,
  description TEXT,
  care_level TEXT DEFAULT 'beginner' CHECK (care_level IN ('beginner', 'intermediate', 'expert')),
  health_status TEXT DEFAULT 'healthy' CHECK (health_status IN ('healthy', 'needs_care', 'sick', 'thriving')),
  location TEXT,
  purchase_date DATE,
  last_watered TIMESTAMP WITH TIME ZONE,
  last_fertilized TIMESTAMP WITH TIME ZONE,
  next_watering_date DATE,
  next_fertilizing_date DATE,
  watering_frequency INTEGER DEFAULT 7, -- days
  fertilizing_frequency INTEGER DEFAULT 30, -- days
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create plant_wishlist table
CREATE TABLE IF NOT EXISTS plant_wishlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  plant_name TEXT NOT NULL,
  scientific_name TEXT,
  category TEXT,
  reason TEXT,
  priority INTEGER DEFAULT 1 CHECK (priority BETWEEN 1 AND 5),
  estimated_cost DECIMAL(10,2),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create plant_care_history table
CREATE TABLE IF NOT EXISTS plant_care_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  plant_id UUID REFERENCES plants(id) ON DELETE CASCADE,
  care_type TEXT NOT NULL CHECK (care_type IN ('watering', 'fertilizing', 'repotting', 'pruning', 'pest_treatment', 'other')),
  care_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  notes TEXT,
  before_image_url TEXT,
  after_image_url TEXT,
  care_rating INTEGER CHECK (care_rating BETWEEN 1 AND 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_plants_user_id ON plants(user_id);
CREATE INDEX IF NOT EXISTS idx_plants_category ON plants(category);
CREATE INDEX IF NOT EXISTS idx_plants_health_status ON plants(health_status);
CREATE INDEX IF NOT EXISTS idx_plants_next_watering ON plants(next_watering_date);
CREATE INDEX IF NOT EXISTS idx_plants_next_fertilizing ON plants(next_fertilizing_date);

CREATE INDEX IF NOT EXISTS idx_wishlist_user_id ON plant_wishlist(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_priority ON plant_wishlist(priority);

CREATE INDEX IF NOT EXISTS idx_care_history_plant_id ON plant_care_history(plant_id);
CREATE INDEX IF NOT EXISTS idx_care_history_care_date ON plant_care_history(care_date);

-- Enable Row Level Security (RLS)
ALTER TABLE plants ENABLE ROW LEVEL SECURITY;
ALTER TABLE plant_wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE plant_care_history ENABLE ROW LEVEL SECURITY;

-- Create policies for plants
CREATE POLICY "Users can view their own plants" ON plants
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own plants" ON plants
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own plants" ON plants
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own plants" ON plants
  FOR DELETE USING (auth.uid() = user_id);

-- Create policies for plant_wishlist
CREATE POLICY "Users can view their own wishlist" ON plant_wishlist
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own wishlist items" ON plant_wishlist
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own wishlist items" ON plant_wishlist
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own wishlist items" ON plant_wishlist
  FOR DELETE USING (auth.uid() = user_id);

-- Create policies for plant_care_history
CREATE POLICY "Users can view their own plant care history" ON plant_care_history
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM plants 
      WHERE plants.id = plant_care_history.plant_id 
      AND plants.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own plant care history" ON plant_care_history
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM plants 
      WHERE plants.id = plant_care_history.plant_id 
      AND plants.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own plant care history" ON plant_care_history
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM plants 
      WHERE plants.id = plant_care_history.plant_id 
      AND plants.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete their own plant care history" ON plant_care_history
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM plants 
      WHERE plants.id = plant_care_history.plant_id 
      AND plants.user_id = auth.uid()
    )
  );

-- Create function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at
CREATE TRIGGER update_plants_updated_at 
  BEFORE UPDATE ON plants 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column(); 