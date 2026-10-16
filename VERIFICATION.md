# Assignment verification — 17 October 2026

## Passed

- Next.js production build, TypeScript and ESLint.
- Development and production-server smoke tests: Home, category, unknown route, invalid category and invalid product.
- Signed-out product requests redirect to sign-in and do not render protected market-price content.
- Authenticated product requests render price summaries and market data.
- Email signup, short-password rejection, duplicate-signup privacy behavior, wrong/correct login, session, profile updates and logout.
- Anonymous linking is rejected; authenticated GitHub linking initiation succeeds.
- Google and GitHub authorization URLs contain the correct local callback.
- Browser: signup password-mismatch toast and pending buttons, signup redirect to sign-in, email login redirect to Home, profile initial, account dropdown and logout.
- Profile Update opens the separate protected `/profile/update` route. Browser checks confirmed whitespace-only names are rejected, valid names are trimmed and saved, success feedback appears, and navigation returns to Profile with the updated name.
- Toasts now use `react-hot-toast` with a `data-rht-toaster` container as specified. Signup and profile-update success feedback were verified in the browser.
- README headings, feature lists, code fences and route table formatting restored; source repository linked.
- Production dependency audit (`npm audit --omit=dev`) reported no vulnerabilities.
- Browser: ascending/descending category sorting and protected-route redirect toast.
- Responsive checks at 320, 375, 768 and 1440 CSS pixels: Home, category, sign-in, signup and 404 have no document-level horizontal overflow. Product grids use one/two/three columns across breakpoints.
- Authenticated Profile and product details checked at 320, 768 and 1440 pixels. Fixed overlapping profile name/logout controls at 320 pixels and visually rechecked. The market table scrolls inside its own container on mobile.
- Figma reference visually inspected; content widths, hero image, compact cards, account dropdown and movement colors aligned with the reference. Initial avatars follow the user's explicit request.
- `.env.local` is ignored. Configured secrets were checked against staged authentication source and were not included.
- Temporary test-account records removed after tests.

## Live deployment

- Production Ready: https://bazar-dor-sand-rho.vercel.app
- Vercel production secrets and Google/GitHub live callbacks configured; localhost callbacks retained.
- Approved Atlas all-IP rule is Active. Redeployed production after network access was enabled.
- Hosted integration tests passed: routes, protection, signup, validation, wrong/correct login, session, profile updates, logout and OAuth/link initiation. Temporary account records cleaned.

## User participation remaining

- Existing same-email account owners must sign in with their original method and link Google/GitHub from Profile to complete real-provider consent testing.
- Rotate the database password with the owner: a diagnostic error exposed the credential in private tool output. Update Atlas, local configuration and Vercel together. Never put the replacement password in chat or Git.