-- Create tables
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    company_name text NOT NULL,
    subject text NOT NULL,
    message text NOT NULL,
    request_cv boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    country text,
    city text,
    ip_address text
);

CREATE TABLE IF NOT EXISTS public.visitors (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    country text,
    city text,
    ip_address text,
    visited_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
    page_url text,
    visitor_number serial NOT NULL
);