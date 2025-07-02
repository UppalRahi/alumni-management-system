-- SQL Script to Insert More Dummy Alumni Profiles (Part 2)
-- Run this after part 1 in your Supabase SQL Editor
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
-- Education & Non-Profit
('00000000-0021-0000-0000-000000000021', 'Rachel Green', 'rachel.green@school.edu', 2017, 'Education', 'Stanford University', 'Professor', 'CA, USA', 'https://linkedin.com/in/rachel-green-21', 'Computer Science professor passionate about AI education and research.', 'Teaching, Research, Artificial Intelligence, Machine Learning', NOW(), NOW()),
('00000000-0022-0000-0000-000000000022', 'Mark Johnson', 'mark.johnson@ngo.org', 2018, 'Social Work', 'Red Cross', 'Program Manager', 'NY, USA', 'https://linkedin.com/in/mark-johnson-22', 'Program manager focused on disaster relief and humanitarian aid coordination.', 'Program Management, Humanitarian Aid, Crisis Management', NOW(), NOW()),
('00000000-0023-0000-0000-000000000023', 'Natalie Davis', 'natalie.davis@foundation.org', 2019, 'Political Science', 'Gates Foundation', 'Policy Analyst', 'WA, USA', 'https://linkedin.com/in/natalie-davis-23', 'Policy analyst working on global health initiatives and policy development.', 'Policy Analysis, Global Health, Research, Writing', NOW(), NOW()),

-- Startup & Entrepreneurship
('00000000-0024-0000-0000-000000000024', 'Alex Turner', 'alex.turner@startup.com', 2020, 'Computer Science', 'TechStart Inc.', 'CTO', 'CA, USA', 'https://linkedin.com/in/alex-turner-24', 'Chief Technology Officer at a fintech startup building innovative payment solutions.', 'Leadership, Fintech, Blockchain, Startup Management', NOW(), NOW()),
('00000000-0025-0000-0000-000000000025', 'Maya Patel', 'maya.patel@venture.com', 2018, 'Business Administration', 'EcoVenture', 'Founder & CEO', 'CA, USA', 'https://linkedin.com/in/maya-patel-25', 'Entrepreneur focused on sustainable technology and environmental solutions.', 'Entrepreneurship, Sustainability, Business Strategy, Leadership', NOW(), NOW()),
('00000000-0026-0000-0000-000000000026', 'Chris Wong', 'chris.wong@aicompany.com', 2021, 'Artificial Intelligence', 'AI Innovations', 'Machine Learning Engineer', 'WA, USA', 'https://linkedin.com/in/chris-wong-26', 'ML engineer developing AI solutions for healthcare and medical diagnostics.', 'Machine Learning, AI, Healthcare Tech, Deep Learning', NOW(), NOW()),

-- Creative & Design
('00000000-0027-0000-0000-000000000027', 'Isabella Garcia', 'isabella.garcia@agency.com', 2019, 'Art & Design', 'Creative Agency', 'Creative Director', 'NY, USA', 'https://linkedin.com/in/isabella-garcia-27', 'Creative director with expertise in brand identity and digital marketing campaigns.', 'Creative Direction, Brand Design, Digital Marketing, Photography', NOW(), NOW()),
('00000000-0028-0000-0000-000000000028', 'Ryan Mitchell', 'ryan.mitchell@studio.com', 2020, 'Graphic Design', 'Design Studio', 'Senior Designer', 'CA, USA', 'https://linkedin.com/in/ryan-mitchell-28', 'Senior graphic designer specializing in user interface and mobile app design.', 'UI Design, Mobile Design, Typography, Branding', NOW(), NOW()),
('00000000-0029-0000-0000-000000000029', 'Zoe Chen', 'zoe.chen@media.com', 2021, 'Computer Graphics', 'Game Studio', 'Game Developer', 'TX, USA', 'https://linkedin.com/in/zoe-chen-29', 'Game developer creating immersive experiences using Unity and Unreal Engine.', 'Game Development, Unity, C Sharp, 3D Modeling', NOW(), NOW()),

-- International Tech
('00000000-0030-0000-0000-000000000030', 'Arjun Gupta', 'arjun.gupta@tech.in', 2020, 'Computer Science', 'Flipkart', 'Senior Software Engineer', 'Karnataka, India', 'https://linkedin.com/in/arjun-gupta-30', 'Senior software engineer building scalable e-commerce platforms for millions of users.', 'Java, Microservices, Distributed Systems, E-commerce', NOW(), NOW()),
('00000000-0031-0000-0000-000000000031', 'Ananya Krishnan', 'ananya.krishnan@fintech.in', 2019, 'Computer Science', 'Razorpay', 'Product Manager', 'Karnataka, India', 'https://linkedin.com/in/ananya-krishnan-31', 'Product manager in fintech focused on payment gateway solutions and financial inclusion.', 'Product Management, Fintech, Payments, Strategy', NOW(), NOW()),
('00000000-0032-0000-0000-000000000032', 'Vikram Singh', 'vikram.singh@consulting.in', 2018, 'Business Administration', 'Bain & Company', 'Senior Consultant', 'Delhi, India', 'https://linkedin.com/in/vikram-singh-32', 'Senior consultant specializing in digital transformation for Fortune 500 companies.', 'Strategy Consulting, Digital Transformation, Analytics', NOW(), NOW()),
('00000000-0033-0000-0000-000000000033', 'Sneha Reddy', 'sneha.reddy@pharma.in', 2020, 'Biotechnology', 'Dr. Reddys Labs', 'Research Scientist', 'Telangana, India', 'https://linkedin.com/in/sneha-reddy-33', 'Research scientist working on drug discovery and pharmaceutical development.', 'Drug Discovery, Pharmaceutical Research, Chemistry', NOW(), NOW()),
('00000000-0034-0000-0000-000000000034', 'Rohit Sharma', 'rohit.sharma@space.in', 2021, 'Aerospace Engineering', 'ISRO', 'Aerospace Engineer', 'Karnataka, India', 'https://linkedin.com/in/rohit-sharma-34', 'Aerospace engineer working on satellite technology and space missions.', 'Aerospace Engineering, Satellite Technology, MATLAB', NOW(), NOW()),

-- Canadian Professionals
('00000000-0035-0000-0000-000000000035', 'Emily Clarke', 'emily.clarke@tech.ca', 2020, 'Computer Science', 'Shopify', 'Software Engineer', 'Ontario, Canada', 'https://linkedin.com/in/emily-clarke-35', 'Software engineer building e-commerce solutions and merchant tools.', 'Ruby, Rails, JavaScript, E-commerce', NOW(), NOW()),
('00000000-0036-0000-0000-000000000036', 'Jacob Thompson', 'jacob.thompson@bank.ca', 2019, 'Finance', 'Royal Bank of Canada', 'Investment Analyst', 'Ontario, Canada', 'https://linkedin.com/in/jacob-thompson-36', 'Investment analyst focusing on Canadian equity markets and portfolio management.', 'Investment Analysis, Portfolio Management, Finance', NOW(), NOW()),
('00000000-0037-0000-0000-000000000037', 'Olivia Martin', 'olivia.martin@ai.ca', 2021, 'Artificial Intelligence', 'Element AI', 'AI Researcher', 'Quebec, Canada', 'https://linkedin.com/in/olivia-martin-37', 'AI researcher working on natural language processing and computer vision.', 'AI Research, NLP, Computer Vision, TensorFlow', NOW(), NOW()),
('00000000-0038-0000-0000-000000000038', 'Liam Wilson', 'liam.wilson@energy.ca', 2018, 'Engineering', 'Suncor Energy', 'Process Engineer', 'Alberta, Canada', 'https://linkedin.com/in/liam-wilson-38', 'Process engineer optimizing oil and gas extraction and refining processes.', 'Process Engineering, Chemical Engineering, Safety', NOW(), NOW()),

-- European Professionals
('00000000-0039-0000-0000-000000000039', 'Sophie Mueller', 'sophie.mueller@auto.de', 2020, 'Mechanical Engineering', 'BMW', 'Automotive Engineer', 'Germany', 'https://linkedin.com/in/sophie-mueller-39', 'Automotive engineer working on electric vehicle technology and autonomous driving.', 'Automotive Engineering, Electric Vehicles, CAD', NOW(), NOW()),
('00000000-0040-0000-0000-000000000040', 'Pierre Dubois', 'pierre.dubois@bank.fr', 2019, 'Finance', 'BNP Paribas', 'Quantitative Analyst', 'France', 'https://linkedin.com/in/pierre-dubois-40', 'Quantitative analyst developing algorithmic trading strategies and risk models.', 'Quantitative Finance, Python, Risk Modeling, Trading', NOW(), NOW());
