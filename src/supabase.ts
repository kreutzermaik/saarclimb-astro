import { createClient } from '@supabase/supabase-js';

let supabaseUrl: string = "";
let supabaseAnonKey: string = "";

if (process.env.NODE_ENV === "development") {
    supabaseUrl = "https://tqgufceactcswwkbjfjk.supabase.co";
    supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxZ3VmY2VhY3Rjc3d3a2JqZmprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzA2OTMyOTksImV4cCI6MTk4NjI2OTI5OX0.MRYORIJPYAwuRfISOKKsKqCnfABJqLaXT1cZQZ6ZAE4";
} else {
    supabaseUrl = "https://ybeongwjjfdkgizzkmsc.supabase.co";
    supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliZW9uZ3dqamZka2dpenprbXNjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI4MjMzMzQsImV4cCI6MTk4ODM5OTMzNH0.NaSZptwqEuuAfhKmoCV_lHraA8nROlQmwKCxEHc8z34";
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
