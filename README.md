# 🎓 Alumni Management System

A modern, full-featured alumni network platform built with vanilla JavaScript, Supabase, and Tailwind CSS. Connect alumni, manage profiles, discover mentorship opportunities, and track events.

![Alumni Management System](https://img.shields.io/badge/Status-Production%20Ready-green)
![Tech Stack](https://img.shields.io/badge/Tech-JavaScript%20%7C%20Supabase%20%7C%20Tailwind-blue)
![License](https://img.shields.io/badge/License-MIT-yellow)

## ✨ Features

### 🔐 Authentication & Profiles
- **Secure Authentication** - Email/password signup and login with Supabase Auth
- **Comprehensive Profiles** - Personal info, graduation year, department, current role
- **Location Support** - Global location dropdown with custom entry option
- **Skills Management** - Add and display professional skills

### 🌐 Alumni Network
- **Advanced Search** - Filter by graduation year, department, location, company
- **Interactive Cards** - View alumni profiles with contact information
- **Global Reach** - Alumni from 25+ countries and major tech companies
- **Real-time Updates** - Live profile information and status

### 📊 Dashboard & Analytics
- **Visual Charts** - Interactive graduation year distribution with Chart.js
- **Key Metrics** - Total alumni count, department breakdown, location stats
- **Performance Optimized** - Efficient data loading and chart rendering
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile

### 🤝 Mentorship Program
- **Mentor Discovery** - Find mentors based on expertise and experience
- **Mentor Profiles** - Detailed mentor information and availability
- **Expertise Matching** - Connect mentees with relevant mentors

### 📅 Events Management
- **Event Listings** - View upcoming alumni events and meetups
- **RSVP System** - Register for events and track attendance
- **Event Details** - Comprehensive event information and schedules

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Tailwind CSS, Custom CSS
- **Backend**: Supabase (PostgreSQL, Auth, Storage)
- **Charts**: Chart.js
- **Icons**: Font Awesome
- **Architecture**: Modular JavaScript with dynamic component loading

## 🌐 Live Demo

**🚀 Try it live**: [https://uppalrahi.github.io/alumni-management-system/](https://uppalrahi.github.io/alumni-management-system/)

Explore all features including authentication, profile management, alumni network, and interactive dashboard!

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/alumni-management-system.git
cd alumni-management-system
```

### 2. Set Up Supabase
1. Create a new project at [Supabase](https://supabase.com)
2. Copy your project URL and anon key
3. Update the Supabase configuration in `js/auth.js`:
```javascript
const supabaseUrl = 'your-project-url'
const supabaseKey = 'your-anon-key'
```

### 3. Set Up Database
1. Go to your Supabase Dashboard → SQL Editor
2. Run the schema setup from `js/database.js` (create profiles table)
3. Optionally, add sample data by running `sql/complete-alumni-profiles.sql`

### 4. Launch the Application
```bash
# Serve the files using any local server
python -m http.server 8000
# OR
npx live-server
```

### 5. Access the Application
Open your browser and navigate to `http://localhost:8000`

## 📁 Project Structure

```
Alumni-Management-system/
├── index-modular.html      # Main application entry point
├── css/
│   └── style.css          # Custom styles and responsive design
├── js/
│   ├── auth.js            # Authentication logic
│   ├── ui.js              # UI management and interactions
│   ├── dashboard.js       # Dashboard charts and analytics
│   ├── network.js         # Alumni network functionality
│   └── mentorship.js      # Mentorship program features
├── components/
│   ├── profile.html       # Profile management component
│   └── network.html       # Network browsing component
├── sql/
│   ├── complete-alumni-profiles.sql  # 100 sample alumni profiles
│   ├── test-schema.sql              # Database schema testing
│   └── README.md                    # SQL setup instructions
└── pages/                 # Additional page components
```

## 🗄️ Database Setup

### Quick Start with Sample Data
The `sql/` folder contains everything you need:

1. **Test your setup**: Run `sql/test-schema.sql` first
2. **Add sample data**: Run `sql/complete-alumni-profiles.sql` for 100 alumni profiles
3. **Follow instructions**: Check `sql/README.md` for detailed setup

### Sample Data Includes:
- 🏢 **20 Software Engineers** (Google, Microsoft, Meta, etc.)
- 💰 **15 Finance Professionals** (Goldman Sachs, JPMorgan, etc.)
- 🏥 **15 Healthcare Workers** (Doctors, Nurses, Medical Researchers)
- 💼 **15 Business Consultants** (McKinsey, BCG, Deloitte, etc.)
- 🚀 **35 Diverse Professionals** (Product Managers, Data Scientists, etc.)

## 📱 Responsive Design

Fully responsive and optimized for:
- **Desktop** (1024px+) - Full feature set with sidebar navigation
- **Tablet** (768px-1023px) - Optimized layout with collapsible sidebar  
- **Mobile** (320px-767px) - Touch-friendly interface with mobile navigation

## 🚢 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Set build command: (none - static files)
3. Set publish directory: `/`
4. Add environment variables for Supabase

### Vercel
1. Import your GitHub repository
2. Configure as a static site
3. Add environment variables

### GitHub Pages
1. Enable GitHub Pages in repository settings
2. Select source branch (main/master)
3. Access via `https://username.github.io/alumni-management-system`

## 🔧 Configuration

Update your Supabase credentials in `js/auth.js`:
```javascript
const supabaseUrl = 'https://your-project.supabase.co'
const supabaseKey = 'your-anon-key'
```

## 🧪 Testing

1. **Database Schema**: Run `sql/test-schema.sql` in Supabase SQL Editor
2. **Authentication**: Test signup, signin, signout
3. **Profile Management**: Create, edit, save profiles
4. **Network Search**: Filter and search alumni
5. **Dashboard Charts**: Verify data visualization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Supabase** for excellent backend-as-a-service
- **Tailwind CSS** for utility-first CSS framework
- **Chart.js** for beautiful, responsive charts
- **Font Awesome** for comprehensive icon library

---

**⭐ Star this repository if it helped you build your alumni network!**

## 🚀 Quick Setup

### ⚠️ IMPORTANT: Database Setup Required

If you see the error **"Profile creation failed: new row violates row-level security policy"**, follow these steps:

1. **Go to your Supabase Dashboard**
2. **Open the SQL Editor**
3. **Run this SQL code:**

```sql
-- 1. Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
    id uuid REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name text,
    email text,
    graduation_year integer,
    department text,
    current_company text,
    current_position text,
    location text,
    linkedin_url text,
    bio text,
    skills text,
    is_mentor boolean DEFAULT false,
    mentor_experience integer,
    mentor_expertise text,
    mentor_bio text,
    mentor_availability text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- 2. Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- 3. Create RLS policies for profiles
CREATE POLICY "Users can insert own profile" ON profiles
FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can view own profile" ON profiles
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view all profiles" ON profiles
FOR SELECT USING (true);

-- 4. Create events table
CREATE TABLE IF NOT EXISTS events (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    description text,
    event_date timestamp with time zone,
    location text,
    created_by uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    attendee_count integer DEFAULT 0,
    created_at timestamp with time zone DEFAULT now()
);

-- 5. Enable RLS for events
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view events" ON events
FOR SELECT USING (true);

CREATE POLICY "Users can create events" ON events
FOR INSERT WITH CHECK (auth.uid() = created_by);
```

4. **Update your Supabase credentials** in `js/config.js`
5. **Restart your web server**
6. **Try signing up again**

### Quick Start

1. **Start a web server:**
   ```bash
   python -m http.server 8000
   ```

2. **Open in browser:**
   ```
   http://localhost:8000/index-modular.html
   ```

3. **Use the debug button** if you have issues:
   Click "🔧 Test Database Connection" on the login page

## 🚀 Features

- **Authentication**: Secure user registration and login with Supabase Auth
- **Dashboard**: Overview of network statistics and recent activity
- **Profile Management**: Comprehensive user profiles with skills and experience
- **Alumni Network**: Search and connect with fellow alumni
- **Events**: Create and manage alumni events and reunions
- **Mentorship Program**: Connect mentors with mentees
- **Analytics**: Detailed insights and reports about the alumni network

## 📁 Project Structure

```
Alumni-Management-system/
├── index.html              # Original monolithic file (legacy)
├── index-modular.html      # New modular entry point
├── css/
│   └── style.css          # All custom styles
├── js/
│   ├── config.js          # Supabase configuration
│   ├── database.js        # Database utilities and testing
│   ├── components.js      # Component loader
│   ├── auth.js           # Authentication functions
│   ├── ui.js             # UI navigation and utilities
│   ├── dashboard.js      # Dashboard functionality
│   ├── network.js        # Alumni network features
│   ├── events.js         # Event management
│   ├── mentorship.js     # Mentorship program
│   └── analytics.js      # Analytics and reporting
├── components/
│   ├── profile.html      # Profile page component
│   ├── network.html      # Network page component
│   ├── events.html       # Events page component
│   ├── mentorship.html   # Mentorship page component
│   └── analytics.html    # Analytics page component
├── pages/                # Future page templates
└── README.md            # This file
```

## 🛠️ Setup Instructions

### 1. Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com)
2. Update the credentials in `js/config.js`:
   ```javascript
   const SUPABASE_CONFIG = {
       url: 'YOUR_SUPABASE_URL',
       anonKey: 'YOUR_SUPABASE_ANON_KEY'
   };
   ```

### 2. Database Schema

Create the following tables in your Supabase database:

#### Profiles Table
```sql
CREATE TABLE profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    full_name TEXT,
    email TEXT,
    graduation_year INTEGER,
    department TEXT,
    current_company TEXT,
    current_position TEXT,
    location TEXT,
    linkedin_url TEXT,
    bio TEXT,
    skills TEXT,
    is_mentor BOOLEAN DEFAULT false,
    mentor_experience INTEGER,
    mentor_expertise TEXT,
    mentor_bio TEXT,
    mentor_availability TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
```

#### Events Table
```sql
CREATE TABLE events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    location TEXT,
    created_by UUID REFERENCES auth.users(id),
    attendee_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);
```

### 3. Row Level Security (RLS)

Enable RLS and create policies:

```sql
-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Events policies
CREATE POLICY "Users can view all events" ON events FOR SELECT USING (true);
CREATE POLICY "Users can create events" ON events FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Users can update own events" ON events FOR UPDATE USING (auth.uid() = created_by);
```

## 🌐 Running the Application

### Option 1: Local Development Server

1. Use a local web server (due to CORS restrictions with file:// protocol):
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (http-server)
   npx http-server
   
   # Using PHP
   php -S localhost:8000
   ```

2. Open `http://localhost:8000/index-modular.html` in your browser

### Option 2: Direct File Access

You can open `index.html` (the original monolithic file) directly in your browser, but `index-modular.html` requires a web server due to component loading.

## 🔧 Development

### Architecture Overview

The application follows a modular architecture:

- **Separation of Concerns**: CSS, JavaScript, and HTML are separated into their own files
- **Component-Based**: UI components are isolated in separate HTML files
- **Module System**: JavaScript functionality is split into focused modules
- **Dynamic Loading**: Components are loaded dynamically when needed

### Adding New Features

1. **New Components**: Add HTML files in the `components/` directory
2. **New JavaScript Modules**: Create focused modules in the `js/` directory
3. **Styling**: Add styles to `css/style.css`
4. **Database Changes**: Update the schema and add new utility functions

### File Organization

- **`css/style.css`**: All custom styles and responsive design
- **`js/config.js`**: Configuration and global variables
- **`js/auth.js`**: Authentication and user management
- **`js/ui.js`**: UI navigation, modals, and general interface
- **`js/dashboard.js`**: Dashboard statistics and charts
- **`js/network.js`**: Alumni search and networking features
- **`js/events.js`**: Event creation and management
- **`js/mentorship.js`**: Mentorship program functionality
- **`js/analytics.js`**: Analytics charts and insights
- **`js/database.js`**: Database utilities and testing functions
- **`js/components.js`**: Dynamic component loading

## 🧪 Testing

Use the built-in database connection test:

1. Click the "🔧 Test Database Connection" button on the login page
2. Check the browser console for detailed diagnostics
3. Verify that all tables are accessible and RLS policies are working

## 🎨 Customization

### Styling
- Modify `css/style.css` for custom styling
- The project uses Tailwind CSS for utility classes
- Custom gradients and animations are defined in the CSS file

### Branding
- Update the app name in `index-modular.html`
- Change color schemes in `css/style.css`
- Replace icons using Font Awesome classes

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🔒 Security

- All authentication is handled by Supabase Auth
- Row Level Security (RLS) policies protect user data
- Client-side validation with server-side enforcement
- Secure API keys (use environment variables in production)

## 🚀 Deployment

### Production Deployment

1. **Environment Variables**: Move Supabase credentials to environment variables
2. **Build Process**: Consider adding a build process for minification
3. **CDN**: Host static assets on a CDN for better performance
4. **Domain**: Configure custom domain and SSL certificate

### Recommended Platforms

- **Netlify**: Easy deployment with form handling
- **Vercel**: Excellent for static sites with serverless functions
- **GitHub Pages**: Free hosting for public repositories
- **Traditional Web Hosting**: Any hosting service that supports static files

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues and questions:
1. Check the browser console for error messages
2. Verify Supabase configuration and database setup
3. Use the built-in database test feature
4. Review the RLS policies and table permissions

---

**Note**: This is the modularized version of the Alumni Network Platform. The original monolithic file (`index.html`) is preserved for reference and backup purposes.
