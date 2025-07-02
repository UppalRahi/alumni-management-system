-- SQL Script to Insert Final Batch of Dummy Alumni Profiles (Part 3)
-- Run this after part 1 and 2 in your Supabase SQL Editor
-- NOTE: Make sure you've already run part 1 which removes the foreign key constraint

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
-- More International Professionals
('00000000-0041-0000-0000-000000000041', 'James Foster', 'james.foster@fintech.uk', 2020, 'Computer Science', 'Revolut', 'Backend Engineer', 'England, UK', 'https://linkedin.com/in/james-foster-41', 'Backend engineer building financial services and payment processing systems.', 'Python, Microservices, PostgreSQL, AWS', NOW(), NOW()),
('00000000-0042-0000-0000-000000000042', 'Charlotte Brown', 'charlotte.brown@consulting.uk', 2019, 'Economics', 'Deloitte UK', 'Business Analyst', 'England, UK', 'https://linkedin.com/in/charlotte-brown-42', 'Business analyst specializing in financial services and digital transformation.', 'Business Analysis, Process Improvement, Excel, PowerBI', NOW(), NOW()),
('00000000-0043-0000-0000-000000000043', 'William Scott', 'william.scott@game.uk', 2021, 'Computer Science', 'Rockstar Games', 'Game Developer', 'Scotland, UK', 'https://linkedin.com/in/william-scott-43', 'Game developer working on AAA game titles and interactive entertainment.', 'C++, Game Development, Unreal Engine, 3D Graphics', NOW(), NOW()),
('00000000-0044-0000-0000-000000000044', 'Grace Taylor', 'grace.taylor@pharma.uk', 2018, 'Chemistry', 'AstraZeneca', 'Research Chemist', 'England, UK', 'https://linkedin.com/in/grace-taylor-44', 'Research chemist developing new pharmaceutical compounds and drug formulations.', 'Organic Chemistry, Drug Development, Laboratory Research', NOW(), NOW()),

-- Asia-Pacific Professionals  
('00000000-0045-0000-0000-000000000045', 'Hiroshi Tanaka', 'hiroshi.tanaka@tech.jp', 2020, 'Computer Science', 'Sony', 'Software Engineer', 'Japan', 'https://linkedin.com/in/hiroshi-tanaka-45', 'Software engineer developing consumer electronics and entertainment software.', 'C++, Embedded Systems, IoT, Mobile Development', NOW(), NOW()),
('00000000-0046-0000-0000-000000000046', 'Yuki Sato', 'yuki.sato@auto.jp', 2019, 'Mechanical Engineering', 'Toyota', 'Automotive Engineer', 'Japan', 'https://linkedin.com/in/yuki-sato-46', 'Automotive engineer working on hybrid and electric vehicle technology.', 'Automotive Engineering, Electric Vehicles, Manufacturing', NOW(), NOW()),
('00000000-0047-0000-0000-000000000047', 'Wei Chen', 'wei.chen@fintech.sg', 2021, 'Finance', 'DBS Bank', 'Digital Banking Specialist', 'Singapore', 'https://linkedin.com/in/wei-chen-47', 'Digital banking specialist developing mobile banking and fintech solutions.', 'Digital Banking, Fintech, Mobile Apps, UX Design', NOW(), NOW()),
('00000000-0048-0000-0000-000000000048', 'Sarah Kim', 'sarah.kim@tech.sg', 2020, 'Computer Science', 'Grab', 'Data Scientist', 'Singapore', 'https://linkedin.com/in/sarah-kim-48', 'Data scientist working on machine learning for ride-sharing and food delivery.', 'Machine Learning, Python, Big Data, Analytics', NOW(), NOW()),

-- Australian Professionals
('00000000-0049-0000-0000-000000000049', 'Jack Anderson', 'jack.anderson@mining.au', 2018, 'Mining Engineering', 'BHP', 'Mining Engineer', 'Australia', 'https://linkedin.com/in/jack-anderson-49', 'Mining engineer specializing in sustainable mining practices and automation.', 'Mining Engineering, Automation, Sustainability, Safety', NOW(), NOW()),
('00000000-0050-0000-0000-000000000050', 'Emma Wilson', 'emma.wilson@bank.au', 2019, 'Finance', 'Commonwealth Bank', 'Risk Analyst', 'Australia', 'https://linkedin.com/in/emma-wilson-50', 'Risk analyst developing models for credit risk and regulatory compliance.', 'Risk Management, Financial Modeling, Compliance', NOW(), NOW()),

-- More US Tech Professionals
('00000000-0051-0000-0000-000000000051', 'Andrew Martinez', 'andrew.martinez@netflix.com', 2020, 'Computer Science', 'Netflix', 'Software Engineer', 'CA, USA', 'https://linkedin.com/in/andrew-martinez-51', 'Software engineer building streaming infrastructure and recommendation systems.', 'Java, Microservices, AWS, Machine Learning', NOW(), NOW()),
('00000000-0052-0000-0000-000000000052', 'Jessica Wang', 'jessica.wang@uber.com', 2019, 'Computer Science', 'Uber', 'Senior Software Engineer', 'CA, USA', 'https://linkedin.com/in/jessica-wang-52', 'Senior software engineer working on mapping and location-based services.', 'Python, Go, Distributed Systems, Mapping', NOW(), NOW()),
('00000000-0053-0000-0000-000000000053', 'Tyler Brown', 'tyler.brown@airbnb.com', 2021, 'Computer Science', 'Airbnb', 'Product Manager', 'CA, USA', 'https://linkedin.com/in/tyler-brown-53', 'Product manager focused on host tools and marketplace optimization.', 'Product Management, A/B Testing, Analytics, UX', NOW(), NOW()),
('00000000-0054-0000-0000-000000000054', 'Hannah Davis', 'hannah.davis@spotify.com', 2020, 'Computer Science', 'Spotify', 'Data Engineer', 'NY, USA', 'https://linkedin.com/in/hannah-davis-54', 'Data engineer building music recommendation and personalization systems.', 'Data Engineering, Python, Spark, Machine Learning', NOW(), NOW()),
('00000000-0055-0000-0000-000000000055', 'Nathan Lee', 'nathan.lee@tesla.com', 2018, 'Electrical Engineering', 'Tesla', 'Electrical Engineer', 'CA, USA', 'https://linkedin.com/in/nathan-lee-55', 'Electrical engineer working on battery technology and charging infrastructure.', 'Electrical Engineering, Battery Technology, Power Systems', NOW(), NOW()),

-- Consulting & Finance
('00000000-0056-0000-0000-000000000056', 'Sophia Rodriguez', 'sophia.rodriguez@bcg.com', 2019, 'Business Administration', 'Boston Consulting Group', 'Senior Associate', 'NY, USA', 'https://linkedin.com/in/sophia-rodriguez-56', 'Senior associate focusing on technology and digital transformation consulting.', 'Strategy Consulting, Digital Transformation, Change Management', NOW(), NOW()),
('00000000-0057-0000-0000-000000000057', 'Daniel Kim', 'daniel.kim@blackrock.com', 2020, 'Finance', 'BlackRock', 'Portfolio Manager', 'NY, USA', 'https://linkedin.com/in/daniel-kim-57', 'Portfolio manager specializing in technology sector investments and ESG funds.', 'Portfolio Management, Investment Analysis, ESG Investing', NOW(), NOW()),
('00000000-0058-0000-0000-000000000058', 'Ashley Chen', 'ashley.chen@citadel.com', 2021, 'Mathematics', 'Citadel', 'Quantitative Researcher', 'IL, USA', 'https://linkedin.com/in/ashley-chen-58', 'Quantitative researcher developing algorithmic trading strategies and market models.', 'Quantitative Research, Python, Statistics, Trading', NOW(), NOW()),

-- Healthcare & Biotech
('00000000-0059-0000-0000-000000000059', 'Dr. Ryan Thompson', 'ryan.thompson@biotech.com', 2017, 'Biotechnology', 'Moderna', 'Senior Scientist', 'MA, USA', 'https://linkedin.com/in/ryan-thompson-59', 'Senior scientist working on mRNA vaccine technology and drug delivery systems.', 'Biotechnology, mRNA Technology, Drug Development', NOW(), NOW()),
('00000000-0060-0000-0000-000000000060', 'Dr. Michelle Garcia', 'michelle.garcia@hospital.com', 2016, 'Medicine', 'Mayo Clinic', 'Physician', 'MN, USA', 'https://linkedin.com/in/michelle-garcia-60', 'Physician specializing in internal medicine and digital health technologies.', 'Internal Medicine, Digital Health, Patient Care', NOW(), NOW());

-- Add verification query to check total count
-- SELECT COUNT(*) as total_profiles FROM profiles;
