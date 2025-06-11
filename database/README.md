# Database Setup for Feature Requests and Bug Reports

This directory contains the SQL scripts needed to set up the database tables for the Help & Support functionality in your GreenThumb app.

## Setup Instructions

### 1. Access Your Supabase Dashboard

1. Go to [supabase.com](https://supabase.com) and sign in to your account
2. Select your GreenThumb project
3. Navigate to the **SQL Editor** in the left sidebar

### 2. Run the SQL Script

1. Open the **SQL Editor**
2. Copy the entire contents of `supabase_tables.sql`
3. Paste it into the SQL editor
4. Click **Run** to execute the script

### 3. Verify the Setup

After running the script, you should see:

- Two new tables: `feature_requests` and `bug_reports`
- Row Level Security (RLS) enabled on both tables
- Appropriate policies for user access
- Indexes for better performance
- Triggers for automatic timestamp updates

### 4. Test the Integration

Once the tables are set up, you can test the functionality:

1. Open your app and navigate to Profile → Help & Support
2. Try submitting a feature request
3. Try submitting a bug report
4. Check your Supabase dashboard to see the data being stored

## Table Structure

### feature_requests
- `id`: Unique identifier (UUID)
- `user_id`: Reference to the user who submitted the request (nullable)
- `name`: User's name
- `email`: User's email
- `description`: Feature request description
- `status`: Current status (pending, in_review, approved, rejected, implemented)
- `created_at`: Timestamp when the request was created
- `updated_at`: Timestamp when the request was last updated

### bug_reports
- `id`: Unique identifier (UUID)
- `user_id`: Reference to the user who submitted the report (nullable)
- `name`: User's name
- `email`: User's email
- `description`: Bug description
- `status`: Current status (pending, investigating, fixed, wont_fix)
- `priority`: Priority level (low, medium, high, critical)
- `created_at`: Timestamp when the report was created
- `updated_at`: Timestamp when the report was last updated

## Security Features

- **Row Level Security (RLS)**: Users can only access their own submissions
- **Policies**: Proper access control for SELECT, INSERT, and UPDATE operations
- **User Authentication**: Links submissions to authenticated users when available
- **Anonymous Support**: Allows submissions from non-authenticated users (user_id will be null)

## Monitoring and Management

You can monitor submissions through your Supabase dashboard:

1. Go to **Table Editor** in your Supabase dashboard
2. Select either `feature_requests` or `bug_reports` table
3. View, filter, and manage submissions as needed

## Troubleshooting

If you encounter issues:

1. **Permission Errors**: Make sure RLS policies are correctly set up
2. **Connection Issues**: Verify your Supabase URL and API keys in the app
3. **Missing Tables**: Re-run the SQL script if tables weren't created
4. **Data Not Saving**: Check the browser console for error messages

For additional support, check the Supabase documentation or contact your development team. 