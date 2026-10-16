<h1 align="center">Bazar Dor</h1>

<p align="center">Daily market prices, smarter shopping.</p>

Bazar Dor is a website for checking daily market prices in Bangladesh. I built this project for Programming Hero Assignment 07 using the given Figma design. It works on mobile, tablet and desktop.

<p align="center">
  <a href="https://bazar-dor-sand-rho.vercel.app">Visit Live Website</a> | <a href="https://github.com/shanajtech/bazar-dor">View Repository</a>
</p>

<h2>What You Can Do</h2>

<ul>
  <li>Check product prices in Bengali.</li>
  <li>See which products have higher or lower prices today.</li>
  <li>Find products by category.</li>
  <li>Sort products by price.</li>
  <li>Log in to see prices from different markets.</li>
  <li>See the lowest, highest and average price of a product.</li>
  <li>Update your name from your profile.</li>
</ul>

<h2>Login and Signup</h2>

You can create an account with your name, email and password. After signup, you will go to the login page. After login, you will go to the Home page.

You can also log in with Google or GitHub. If you already have an account with the same email, log in with your first method and connect Google or GitHub from your profile.

Your profile icon shows the first letter of your name. You can log out from the account menu.

The website shows success and error messages. It also shows loading placeholders while you wait. Email verification and forgot password are not included.

<h2>Tools Used</h2>

<ul>
  <li>Next.js 16 and React 19</li>
  <li>TypeScript</li>
  <li>Tailwind CSS 4</li>
  <li>Better Auth</li>
  <li>MongoDB</li>
  <li>React Hot Toast</li>
  <li>React Icons</li>
</ul>

<h2>Run on Your Computer</h2>

Step 1: Install Node.js 20.9 or a newer version. You also need a MongoDB database.

Step 2: Open the project folder in a terminal and run:

<pre>npm install</pre>

Step 3: Create a file named .env.local in the project folder. Add these settings with your own values:

<pre>
MONGODB_URI=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
</pre>

Use a strong random value for BETTER_AUTH_SECRET. Do not share your secret values or upload .env.local to GitHub.

Step 4: Start the website:

<pre>npm run dev</pre>

Step 5: Open http://localhost:3000 in your browser.

Read AUTH-SETUP.md for Google and GitHub setup help.

<h2>Website Pages</h2>

<ul>
  <li>Home: /</li>
  <li>Category: /category/[slug]</li>
  <li>Product Details: /product/[slug]</li>
  <li>Login: /signin</li>
  <li>Signup: /signup</li>
  <li>Profile: /profile</li>
  <li>Update Name: /profile/update</li>
</ul>

You must log in to open Product Details and Profile pages. A page not found message appears for a wrong page address.

<h2>Product Data</h2>

Product data comes from the Programming Hero Bazar Dor API:

https://openapi.programming-hero.com/api/bazardor

<h2>Check the Project</h2>

Check code quality:
<pre>npm run lint</pre>

Check TypeScript:
<pre>npx tsc --noEmit</pre>

Build the project:
<pre>npm run build</pre>

Test login and signup:
<pre>node scripts/check-auth.mjs</pre>

Keep the local website and database running before starting the login test. The test creates a test account, checks the main account features and removes the test account after it finishes.

<h2>Hosting</h2>

The website is hosted on Vercel. The database is on MongoDB Atlas.

For your own deployment, import the GitHub repository into Vercel. Add the same settings from .env.local and set BETTER_AUTH_URL to your live website address. Allow Vercel to connect to MongoDB Atlas.

Add these callback paths to your Google and GitHub app settings using your live website address:

Google: /api/auth/callback/google<br>
GitHub: /api/auth/callback/github

Also add your live website address to Google's authorized JavaScript origins. Deploy again after changing the settings.

Check login, logout and page links on the live website before submission.
