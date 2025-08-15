import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mvgtxdessfbllacqswfo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12Z3R4ZGVzc2ZibGxhY3Fzd2ZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyNDI1MzQsImV4cCI6MjA3MDgxODUzNH0.igJBoNkGY_U07Ys1xVtrxZ-GR3RVeFXRP2W6bXyA-XY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);