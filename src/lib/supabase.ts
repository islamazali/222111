import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Contact {
  id?: string;
  name: string;
  email: string;
  project_type: string;
  budget?: string;
  message: string;
  status?: string;
  created_at?: string;
}

export interface Consultation {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  project_type: string;
  preferred_date?: string;
  preferred_time?: string;
  project_description: string;
  status?: string;
  created_at?: string;
}

export interface PortfolioProject {
  id?: string;
  title: string;
  category: string;
  description: string;
  tech_stack: string[];
  client_value: string;
  image_url?: string;
  featured?: boolean;
  order_index?: number;
  created_at?: string;
}

export interface Testimonial {
  id?: string;
  client_name: string;
  client_role: string;
  client_company?: string;
  content: string;
  rating: number;
  project_type?: string;
  featured?: boolean;
  order_index?: number;
  created_at?: string;
}

export interface Offer {
  id?: string;
  title: string;
  description: string;
  discount_percentage?: number;
  terms: string;
  valid_until?: string;
  active?: boolean;
  target_audience?: string;
  created_at?: string;
}
