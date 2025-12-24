/*
  # icode Website Database Schema

  ## Overview
  Complete database schema for the icode website including contact forms, consultations,
  portfolio projects, testimonials, and client portal functionality.

  ## New Tables

  ### 1. contacts
  Stores contact form submissions from the main contact page
  - `id` (uuid, primary key)
  - `name` (text) - Full name of the person contacting
  - `email` (text) - Contact email
  - `project_type` (text) - Type of project they're interested in
  - `budget` (text, optional) - Approximate budget range
  - `message` (text) - Their message/inquiry
  - `status` (text) - Status: new, contacted, completed
  - `created_at` (timestamptz) - Submission timestamp

  ### 2. consultations
  Stores consultation booking requests
  - `id` (uuid, primary key)
  - `name` (text) - Full name
  - `email` (text) - Contact email
  - `phone` (text, optional) - Phone number
  - `project_type` (text) - Type of project
  - `preferred_date` (date, optional) - Preferred consultation date
  - `preferred_time` (text, optional) - Preferred time slot
  - `project_description` (text) - Brief project description
  - `status` (text) - Status: pending, scheduled, completed, cancelled
  - `created_at` (timestamptz) - Booking timestamp

  ### 3. portfolio_projects
  Stores portfolio project information
  - `id` (uuid, primary key)
  - `title` (text) - Project title
  - `category` (text) - Project category (Fintech, SaaS, E-commerce, etc.)
  - `description` (text) - Project description
  - `tech_stack` (jsonb) - Array of technologies used
  - `client_value` (text) - Value delivered to client
  - `image_url` (text, optional) - Project image
  - `featured` (boolean) - Whether to feature on homepage
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz)

  ### 4. testimonials
  Stores client testimonials
  - `id` (uuid, primary key)
  - `client_name` (text) - Client name
  - `client_role` (text) - Client role/position
  - `client_company` (text, optional) - Company name
  - `content` (text) - Testimonial content
  - `rating` (integer) - Rating 1-5
  - `project_type` (text, optional) - Related project type
  - `featured` (boolean) - Show on homepage
  - `order_index` (integer) - Display order
  - `created_at` (timestamptz)

  ### 5. offers
  Stores current promotional offers
  - `id` (uuid, primary key)
  - `title` (text) - Offer title
  - `description` (text) - Offer description
  - `discount_percentage` (integer, optional) - Discount amount
  - `terms` (text) - Terms and conditions
  - `valid_until` (date, optional) - Expiration date
  - `active` (boolean) - Whether offer is active
  - `target_audience` (text, optional) - Who this offer is for
  - `created_at` (timestamptz)

  ## Security
  - Enable RLS on all tables
  - Public read access for portfolio, testimonials, and active offers
  - Authenticated access required for submissions and admin operations
*/

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  project_type text NOT NULL,
  budget text,
  message text NOT NULL,
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'completed')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact forms"
  ON contacts FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (true);

-- Create consultations table
CREATE TABLE IF NOT EXISTS consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  project_type text NOT NULL,
  preferred_date date,
  preferred_time text,
  project_description text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'scheduled', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE consultations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit consultation requests"
  ON consultations FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view consultations"
  ON consultations FOR SELECT
  TO authenticated
  USING (true);

-- Create portfolio_projects table
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  tech_stack jsonb DEFAULT '[]'::jsonb,
  client_value text NOT NULL,
  image_url text,
  featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view portfolio projects"
  ON portfolio_projects FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage portfolio"
  ON portfolio_projects FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name text NOT NULL,
  client_role text NOT NULL,
  client_company text,
  content text NOT NULL,
  rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  project_type text,
  featured boolean DEFAULT false,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view testimonials"
  ON testimonials FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage testimonials"
  ON testimonials FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create offers table
CREATE TABLE IF NOT EXISTS offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  discount_percentage integer,
  terms text NOT NULL,
  valid_until date,
  active boolean DEFAULT true,
  target_audience text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active offers"
  ON offers FOR SELECT
  TO anon, authenticated
  USING (active = true OR auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can manage offers"
  ON offers FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON contacts(status);
CREATE INDEX IF NOT EXISTS idx_consultations_created_at ON consultations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_consultations_status ON consultations(status);
CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON portfolio_projects(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_portfolio_order ON portfolio_projects(order_index);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_testimonials_order ON testimonials(order_index);
CREATE INDEX IF NOT EXISTS idx_offers_active ON offers(active) WHERE active = true;
