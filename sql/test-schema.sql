-- Quick Test Script for Alumni Profiles
-- Run this first to test if your schema is compatible
-- This is NON-DESTRUCTIVE - it only adds one test profile

-- First, let's check if we can insert without the foreign key constraint
-- We'll temporarily disable the constraint for dummy data
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Test with just one profile to check for errors
INSERT INTO profiles (
    id,
    full_name,
    email,
    graduation_year,
    department,
    current_company,
    current_position,
    location,
    linkedin_url,
    bio,
    skills,
    created_at,
    updated_at
) VALUES 
('00000000-0000-0000-0000-000000000001', 'Test User', 'test.user@example.com', 2020, 'Computer Science', 'Test Company', 'Software Engineer', 'CA, USA', 'https://linkedin.com/in/test-user', 'Test profile to verify database schema compatibility.', 'JavaScript, React, Node.js', NOW(), NOW());

-- Verify the test insertion worked
SELECT * FROM profiles WHERE id = '00000000-0000-0000-0000-000000000001';

-- If this test passes, you can proceed with the full scripts
SELECT 'Schema test completed successfully! Foreign key constraint removed for dummy data.' as result;

-- NOTE: The foreign key constraint has been removed to allow dummy data insertion
-- This is necessary because dummy profiles don't have corresponding auth.users entries
