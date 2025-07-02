-- SQL Script to Insert 100 Dummy Alumni Profiles
-- Run this in your Supabase SQL Editor

-- Remove foreign key constraint to allow dummy data
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Ensure skills column is text type (not array)
-- ALTER TABLE profiles ALTER COLUMN skills TYPE text;

-- First, let's insert some dummy profiles
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
-- Tech Professionals
('00000000-0001-0000-0000-000000000001', 'Alice Johnson', 'alice.johnson@gmail.com', 2020, 'Computer Science', 'Google', 'Software Engineer', 'CA, USA', 'https://linkedin.com/in/alice-johnson-1', 'Passionate software engineer with 4 years of experience building scalable web applications.', 'JavaScript, React, Node.js, AWS', NOW(), NOW()),
('00000000-0002-0000-0000-000000000002', 'Bob Smith', 'bob.smith@outlook.com', 2019, 'Computer Science', 'Microsoft', 'Senior Software Engineer', 'WA, USA', 'https://linkedin.com/in/bob-smith-2', 'Full-stack developer specializing in cloud technologies and microservices architecture.', 'C Sharp, Azure, Kubernetes, Docker', NOW(), NOW()),
('00000000-0003-0000-0000-000000000003', 'Carol Davis', 'carol.davis@yahoo.com', 2021, 'Engineering', 'Apple', 'Product Manager', 'CA, USA', 'https://linkedin.com/in/carol-davis-3', 'Product manager focused on user experience and data-driven product decisions.', 'Product Management, Analytics, UX Design', NOW(), NOW()),
('00000000-0004-0000-0000-000000000004', 'David Wilson', 'david.wilson@gmail.com', 2018, 'Computer Science', 'Amazon', 'Data Scientist', 'WA, USA', 'https://linkedin.com/in/david-wilson-4', 'Data scientist with expertise in machine learning and statistical analysis.', 'Python, Machine Learning, SQL, TensorFlow', NOW(), NOW()),
('00000000-0005-0000-0000-000000000005', 'Emma Brown', 'emma.brown@hotmail.com', 2022, 'Engineering', 'Meta', 'UX Designer', 'CA, USA', 'https://linkedin.com/in/emma-brown-5', 'Creative UX designer passionate about creating intuitive and accessible user interfaces.', 'Figma, User Research, Prototyping, Design Systems', NOW(), NOW()),

-- International Professionals  
('00000000-0006-0000-0000-000000000006', 'Raj Patel', 'raj.patel@gmail.com', 2020, 'Computer Science', 'Infosys', 'Software Engineer', 'Karnataka, India', 'https://linkedin.com/in/raj-patel-6', 'Software engineer with expertise in enterprise applications and agile development.', 'Java, Spring Boot, Microservices, MySQL', NOW(), NOW()),
('00000000-0007-0000-0000-000000000007', 'Priya Sharma', 'priya.sharma@outlook.com', 2019, 'Engineering', 'TCS', 'Technical Lead', 'Maharashtra, India', 'https://linkedin.com/in/priya-sharma-7', 'Technical lead with experience in large-scale distributed systems and team management.', 'Java, AWS, Leadership, System Design', NOW(), NOW()),
('00000000-0008-0000-0000-000000000008', 'James Miller', 'james.miller@gmail.com', 2021, 'Business Administration', 'Shopify', 'Product Manager', 'Ontario, Canada', 'https://linkedin.com/in/james-miller-8', 'Product manager specializing in e-commerce platforms and customer experience optimization.', 'Product Strategy, E-commerce, Data Analysis', NOW(), NOW()),
('00000000-0009-0000-0000-000000000009', 'Sarah Thompson', 'sarah.thompson@yahoo.com', 2020, 'Mathematics', 'Revolut', 'Data Analyst', 'England, UK', 'https://linkedin.com/in/sarah-thompson-9', 'Data analyst with a strong background in financial modeling and statistical analysis.', 'Python, R, SQL, Tableau, Statistics', NOW(), NOW()),
('00000000-0010-0000-0000-000000000010', 'Liu Wei', 'liu.wei@company.com', 2018, 'Computer Science', 'ByteDance', 'Senior Software Engineer', 'Singapore', 'https://linkedin.com/in/liu-wei-10', 'Senior software engineer with expertise in distributed systems and mobile applications.', 'Python, Go, Redis, MongoDB, Mobile Development', NOW(), NOW()),

-- Business & Finance Professionals
('00000000-0011-0000-0000-000000000011', 'Michael Garcia', 'michael.garcia@goldman.com', 2017, 'Economics', 'Goldman Sachs', 'Financial Analyst', 'NY, USA', 'https://linkedin.com/in/michael-garcia-11', 'Financial analyst with expertise in investment banking and risk management.', 'Financial Modeling, Excel, Bloomberg, Risk Analysis', NOW(), NOW()),
('00000000-0012-0000-0000-000000000012', 'Jennifer Lee', 'jennifer.lee@jpmorgan.com', 2019, 'Finance', 'JPMorgan Chase', 'Investment Banker', 'NY, USA', 'https://linkedin.com/in/jennifer-lee-12', 'Investment banker specializing in mergers and acquisitions and corporate finance.', 'Investment Banking, M&A, Valuation, Financial Analysis', NOW(), NOW()),
('00000000-0013-0000-0000-000000000013', 'Robert Martinez', 'robert.martinez@mckinsey.com', 2020, 'Business Administration', 'McKinsey & Company', 'Consultant', 'IL, USA', 'https://linkedin.com/in/robert-martinez-13', 'Management consultant focused on digital transformation and operational excellence.', 'Strategy Consulting, Process Improvement, Digital Transformation', NOW(), NOW()),
('00000000-0014-0000-0000-000000000014', 'Lisa Anderson', 'lisa.anderson@deloitte.com', 2021, 'Marketing', 'Deloitte', 'Marketing Manager', 'TX, USA', 'https://linkedin.com/in/lisa-anderson-14', 'Marketing manager with experience in digital marketing campaigns and brand strategy.', 'Digital Marketing, SEO, Content Strategy, Brand Management', NOW(), NOW()),
('00000000-0015-0000-0000-000000000015', 'Kevin Wang', 'kevin.wang@pwc.com', 2018, 'Accounting', 'PwC', 'Senior Auditor', 'CA, USA', 'https://linkedin.com/in/kevin-wang-15', 'Senior auditor with expertise in financial auditing and compliance management.', 'Auditing, Financial Reporting, Compliance, Risk Assessment', NOW(), NOW()),

-- Healthcare & Science
('00000000-0016-0000-0000-000000000016', 'Dr. Maria Rodriguez', 'maria.rodriguez@hospital.com', 2016, 'Biology', 'Johns Hopkins', 'Research Scientist', 'MD, USA', 'https://linkedin.com/in/maria-rodriguez-16', 'Research scientist specializing in biomedical research and drug development.', 'Biomedical Research, Laboratory Techniques, Data Analysis', NOW(), NOW()),
('00000000-0017-0000-0000-000000000017', 'Thomas Chen', 'thomas.chen@pharma.com', 2019, 'Chemistry', 'Pfizer', 'Chemical Engineer', 'NY, USA', 'https://linkedin.com/in/thomas-chen-17', 'Chemical engineer working on pharmaceutical manufacturing and process optimization.', 'Chemical Engineering, Process Optimization, Quality Control', NOW(), NOW()),
('00000000-0018-0000-0000-000000000018', 'Dr. Amanda Foster', 'amanda.foster@clinic.com', 2015, 'Psychology', 'Private Practice', 'Clinical Psychologist', 'CA, USA', 'https://linkedin.com/in/amanda-foster-18', 'Licensed clinical psychologist specializing in cognitive behavioral therapy.', 'Clinical Psychology, CBT, Mental Health Assessment', NOW(), NOW()),
('00000000-0019-0000-0000-000000000019', 'John Kim', 'john.kim@biotech.com', 2020, 'Biotechnology', 'Genentech', 'Biotech Researcher', 'CA, USA', 'https://linkedin.com/in/john-kim-19', 'Biotechnology researcher focused on gene therapy and immunology research.', 'Biotechnology, Gene Therapy, Immunology, Research', NOW(), NOW()),
('00000000-0020-0000-0000-000000000020', 'Sophie Williams', 'sophie.williams@lab.com', 2021, 'Physics', 'CERN', 'Research Physicist', 'Germany', 'https://linkedin.com/in/sophie-williams-20', 'Research physicist working on particle physics experiments and data analysis.', 'Particle Physics, Data Analysis, Python, MATLAB', NOW(), NOW());

-- Continue with more profiles... (This is just the first 20)
