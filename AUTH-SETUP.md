# Authentication setup

Keep credentials in `.env.local` (already ignored by Git). Never commit them.

Required existing settings: `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`.
Set `BETTER_AUTH_URL` to the exact application origin, e.g. `http://localhost:3000`.

## Google

1. In Google Cloud Console, configure the OAuth consent screen and create a Web application OAuth client.
2. Add `http://localhost:3000` as an authorized JavaScript origin.
3. Add `http://localhost:3000/api/auth/callback/google` as an authorized redirect URI.
4. Set `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env.local`.
5. If the consent screen is in testing mode, add your test users.

## GitHub

1. In GitHub Settings → Developer settings → OAuth Apps, create an OAuth app.
2. Set homepage URL to `http://localhost:3000`.
3. Set authorization callback URL to `http://localhost:3000/api/auth/callback/github`.
4. Set `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` in `.env.local`.

For deployment, replace the local origin with the deployed origin in the provider consoles and `BETTER_AUTH_URL`. Restart the Next.js server after changing environment variables.

References: [Google](https://better-auth.com/docs/authentication/google), [GitHub](https://better-auth.com/docs/authentication/github).

## Verification

- `npx tsc --noEmit`
- `npm run lint`
- Start the local server, then `node scripts/check-auth.mjs`. This creates one temporary account, exercises authentication and profile update, then removes that account's user/account/session records. Set `AUTH_TEST_URL` if using another local port; it must match the configured trusted application origin.
- In the browser: submit empty/invalid forms, mismatching signup passwords, check pending buttons, and check profile redirect when signed out.
- With OAuth credentials configured, exercise Google and GitHub consent, success redirect to Home, cancellation/error feedback, and logout. Live OAuth completion cannot be verified without credentials.

Email signup redirects to `/signin` without creating a session. Email and social login redirect to `/`. A global toaster keeps feedback visible across navigation. Better Auth intentionally returns a generic successful response for duplicate signup when `autoSignIn` is false; it does not create another account.

If OAuth returns `account_not_linked`, sign in using the existing account's original method, open `/profile`, then choose “Google যুক্ত করুন” or “GitHub যুক্ত করুন”. Complete provider consent once; future logins can use that provider. The provider email must match. This preserves Better Auth's protection against implicitly linking an OAuth identity to an unverified local account; no email verification feature is required.
