# Bazar Dor

Daily market prices, smarter shopping.

Bazar Dor is a website for checking daily market prices in Bangladesh. I built this project for Programming Hero Assignment 07 using the given Figma design. It works on mobile, tablet and desktop.

[Live demo](https://bazar-dor-sand-rho.vercel.app) · [Source code](https://github.com/shanajtech/bazar-dor)

## What You Can Do


- Check product prices in Bengali.
- See which products have higher or lower prices today.
- Find products by category.
- Sort products by price.
- Log in to see prices from different markets.
- See the lowest, highest and average price of a product.
- Update your name from your profile.


## Login and Signup

You can create an account with your name, email and password. After signup, you will go to the login page. After login, you will go to the Home page.

You can also log in with Google or GitHub. If you already have an account with the same email, log in with your first method and connect Google or GitHub from your profile.

Your profile icon shows the first letter of your name. You can log out from the account menu.

The website shows success and error messages. It also shows loading placeholders while you wait. Email verification and forgot password are not included.

## Tools Used


- Next.js 16 and React 19
- TypeScript
- Tailwind CSS 4
- Better Auth
- MongoDB
- React Hot Toast
- React Icons


## Run on Your Computer

Step 1: Install Node.js 20.9 or a newer version. You also need a MongoDB database.

Step 2: Open the project folder in a terminal and run:

```bash
npm install
```

Step 3: Create a file named .env.local in the project folder. Add these settings with your own values:

```dotenv
MONGODB_URI=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

Use a strong random value for BETTER_AUTH_SECRET. Do not share your secret values or upload .env.local to GitHub.

Step 4: Start the website:

```bash
npm run dev
```

Step 5: Open http://localhost:3000 in your browser.

Read AUTH-SETUP.md for Google and GitHub setup help.

## Website Pages


- Home: /
- Category: /category/[slug]
- Product Details: /product/[slug]
- Login: /signin
- Signup: /signup
- Profile: /profile
- Update Name: /profile/update


You must log in to open Product Details and Profile pages. A page not found message appears for a wrong page address.

## Product Data

Product data comes from the Programming Hero Bazar Dor API:

https://openapi.programming-hero.com/api/bazardor

## Check the Project

Check code quality:
```bash
npm run lint
```

Check TypeScript:
```bash
npx tsc --noEmit
```

Build the project:
```bash
npm run build
```

Test login and signup:
```bash
node scripts/check-auth.mjs
```

Keep the local website and database running before starting the login test. The test creates a test account, checks the main account features and removes the test account after it finishes.

## Hosting

The website is hosted on Vercel. The database is on MongoDB Atlas.

For your own deployment, import the GitHub repository into Vercel. Add the same settings from .env.local and set BETTER_AUTH_URL to your live website address. Allow Vercel to connect to MongoDB Atlas.

Add these callback paths to your Google and GitHub app settings using your live website address:

Google: /api/auth/callback/google
GitHub: /api/auth/callback/github

Also add your live website address to Google's authorized JavaScript origins. Deploy again after changing the settings.

Check login, logout and page links on the live website before submission.
