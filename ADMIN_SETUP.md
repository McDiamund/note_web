# Admin Page Setup Guide

This guide will help you set up the admin page for managing flagged posts and viewing blocked users.

## Prerequisites

1. Install dependencies:
```bash
npm install
```

## Environment Variables

Create a `.env` file in the root of the `note_web` directory with the following variables:

```env
# AWS AppSync Configuration
VITE_APPSYNC_ENDPOINT=https://your-api-id.appsync-api.region.amazonaws.com/graphql
VITE_AWS_REGION=us-east-1

# AWS Cognito Configuration
VITE_COGNITO_USER_POOL_ID=us-east-1_xxxxxxxxx
VITE_COGNITO_USER_POOL_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
```

### How to Find These Values

1. **AppSync Endpoint**: 
   - Go to AWS Console → AppSync
   - Select your API
   - The GraphQL endpoint URL is shown on the API details page

2. **Cognito User Pool ID**:
   - Go to AWS Console → Cognito
   - Select your User Pool
   - The User Pool ID is shown at the top of the User Pool details page

3. **Cognito User Pool Client ID**:
   - In the same User Pool, go to "App integration" tab
   - Under "App clients", you'll find the Client ID

## Accessing the Admin Page

1. Start the development server:
```bash
npm run dev
```

2. Navigate to `/admin` in your browser

3. Login with an admin account (the account must have `isAdmin: true` or `type: "admin"` in the database)

## Features

### Flagged Posts Management
- View all flagged posts (notes and collections)
- Filter by status (pending, reviewed, resolved, dismissed)
- Filter by content type (note, collection)
- Update flag status (resolve or dismiss)
- Add review notes when updating flags

### Blocked Users
- View list of blocked users
- See user details including username, email, and account status

## Notes

- The admin page requires authentication via AWS Cognito
- Only users with admin privileges can access the admin functions
- The page will automatically check if the logged-in user is an admin

