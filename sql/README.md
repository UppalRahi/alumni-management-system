# SQL-Based Alumni Data Setup

This folder contains SQL scripts to populate your Supabase database with 100 realistic alumni profiles.

## 🔧 Troubleshooting Database Errors

### UUID Foreign Key Error
If you get an error about UUID foreign key constraints, this is because the `profiles.id` field references `auth.users(id)`. Our scripts automatically fix this by removing the constraint:

```sql
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;
```

### Array Format Error
If you get an error like `Array value must start with "{"`, run:
```sql
ALTER TABLE profiles ALTER COLUMN skills TYPE text;
```

## Quick Setup (Recommended)

**Use the complete script for fastest setup:**

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to **SQL Editor**
3. **FIRST:** Run `test-schema.sql` to verify compatibility
4. **THEN:** Copy the entire content of `complete-alumni-profiles.sql`
5. Paste it into the SQL Editor and click **Run**

This will insert 100 diverse alumni profiles in one go.

## Alternative: Step-by-Step Setup

If you prefer to insert data in smaller batches:

1. Run `insert-dummy-profiles-part1.sql` (first 33 profiles)
2. Run `insert-dummy-profiles-part2.sql` (next 33 profiles) 
3. Run `insert-dummy-profiles-part3.sql` (final 34 profiles)

## What You'll Get

- **100 realistic alumni profiles** with diverse backgrounds
- **Graduation years:** 2015-2024
- **Global locations:** USA, India, Canada, UK, Europe, Asia-Pacific
- **Various industries:** Tech, Finance, Healthcare, Consulting, Startups
- **Professional roles:** Entry-level to Senior positions
- **Realistic data:** Names, emails, companies, skills, LinkedIn profiles

## Verification

After running the scripts, verify the data:

```sql
-- Check total count
SELECT COUNT(*) as total_profiles FROM profiles;

-- Check distribution by graduation year
SELECT graduation_year, COUNT(*) as count 
FROM profiles 
GROUP BY graduation_year 
ORDER BY graduation_year;
```

## Refresh Your App

After inserting the data:
1. Refresh your alumni management application
2. Check the **Dashboard** to see updated charts and statistics
3. Browse the **Network** section to see all alumni profiles

---

**Note:** All dummy profiles use UUID format `00000000-XXXX-0000-0000-000000000XXX` for easy identification and cleanup if needed.
