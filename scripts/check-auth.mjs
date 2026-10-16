// Integration smoke test: uses one temporary account and removes only its records.
import assert from 'node:assert/strict';
import nextEnv from '@next/env';
import { MongoClient } from 'mongodb';
import { randomUUID } from 'node:crypto';
const { loadEnvConfig } = nextEnv;
loadEnvConfig(process.cwd());
const base = process.env.AUTH_TEST_URL || 'http://localhost:3000';
const email = `auth-smoke-${randomUUID()}@example.com`;
const password = randomUUID();
let cookie = '';
let stage = 'connect';
async function request(path, body) {
  stage = path;
  const response = await fetch(`${base}/api/auth/${path}`, {
    method: body ? 'POST' : 'GET',
    headers: { 'Content-Type': 'application/json', Origin: base, Cookie: cookie },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  const cookies = response.headers.getSetCookie();
  if (cookies.length) {
    const jar = new Map(cookie.split('; ').filter(Boolean).map(value => {
      const separator = value.indexOf('=');
      return [value.slice(0, separator), value.slice(separator + 1)];
    }));
    for (const value of cookies) {
      const pair = value.split(';')[0];
      const separator = pair.indexOf('=');
      jar.set(pair.slice(0, separator), pair.slice(separator + 1));
    }
    cookie = [...jar].map(([key, value]) => `${key}=${value}`).join('; ');
  }
  return { status: response.status, data: await response.json() };
}
(async () => {
  const mongo = new MongoClient(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
  try {
    const home = await fetch(base).then(response => response.text());
    assert.ok(home.includes('আজকের বাজারের দাম এক নজরে'));
    assert.ok(home.includes('কাঁচামরিচ'));
    for (const path of ['/unknown-route-smoke-test', '/category/invalid', '/product/unknown']) {
      const response = await fetch(base + path);
      const html = await response.text();
      assert.ok(html.includes('পেজটি পাওয়া যায়নি'), `${path}: friendly 404`);
      assert.ok(response.status === 404 || html.includes('noindex'), `${path}: 404 or streamed noindex`);
    }
    const protectedResponse = await fetch(base + '/product/sorno-machi-chal', { redirect: 'manual' });
    const protectedHtml = await protectedResponse.text();
    assert.ok(protectedResponse.headers.get('location')?.includes('/signin?auth=required') || protectedHtml.includes('/signin?auth=required'), 'signed-out product redirect');
    assert.ok(!protectedHtml.includes('বাজারভিত্তিক আজকের দাম'), 'protected data not rendered when signed out');
    for (const path of ['/profile', '/profile/update']) {
      const response = await fetch(base + path, { redirect: 'manual' });
      const html = await response.text();
      assert.ok(response.headers.get('location')?.includes('/signin?auth=required') || html.includes('/signin?auth=required'), `${path}: signed-out redirect`);
    }
    const category = await fetch(base + '/category/chal').then(response => response.text());
    assert.ok(category.includes('দাম: কম থেকে বেশি') && category.includes('স্বর্ণমাছি চাল'));
    console.log('PASS: Home, category, invalid routes, signed-out product protection.');
    assert.equal((await request('get-session')).data, null);
    assert.equal((await request('link-social', { provider: 'github', callbackURL: '/profile' })).status, 401);
    assert.ok((await request('sign-up/email', { email, name: 'পরীক্ষা', password: 'short' })).status >= 400);
    const signup = await request('sign-up/email', { email, name: 'পরীক্ষা', password });
    assert.equal(signup.status, 200, 'signup');
    assert.equal(signup.data.token, null, 'signup must not sign in');
    assert.equal((await request('get-session')).data, null);
    // Better Auth intentionally returns a generic success for duplicates when autoSignIn is false.
    assert.equal((await request('sign-up/email', { email, name: 'পরীক্ষা', password })).data.token, null);
    assert.ok((await request('sign-in/email', { email, password: 'wrong-password' })).status >= 400);
    assert.equal((await request('sign-in/email', { email, password })).status, 200);
    assert.equal((await request('get-session')).data.user.email, email);
    for (const path of ['/profile', '/profile/update']) {
      const response = await fetch(base + path, { headers: { Cookie: cookie }, redirect: 'manual' });
      const html = await response.text();
      assert.equal(response.status, 200, `${path}: authenticated access`);
      assert.ok(!html.includes('NEXT_REDIRECT'), `${path}: no sign-in redirect`);
    }
    const product = await fetch(base + '/product/sorno-machi-chal', { headers: { Cookie: cookie } }).then(response => response.text());
    assert.ok(product.includes('বাজারভিত্তিক আজকের দাম') && product.includes('সর্বনিম্ন দাম'), 'authenticated product details');
    const providers = await fetch(`${base}/api/auth-providers`);
    assert.equal(providers.status, 200);
    const configured = await providers.json();
    if (configured.github) {
      const linking = await request('link-social', { provider: 'github', callbackURL: '/profile?auth=linked' });
      assert.equal(linking.status, 200);
      assert.equal(new URL(linking.data.url).hostname, 'github.com');
      console.log('PASS: linking requires login; authenticated GitHub linking starts successfully.');
    }
    for (const provider of ['google', 'github']) {
      if (!configured[provider]) continue;
      const social = await request('sign-in/social', { provider, callbackURL: '/?auth=success', disableRedirect: true });
      assert.equal(social.status, 200);
      const url = new URL(social.data.url);
      assert.equal(url.searchParams.get('redirect_uri'), `${base}/api/auth/callback/${provider}`);
    }
    assert.equal((await request('update-user', { name: 'শানাজ' })).status, 200);
    assert.equal((await request('get-session')).data.user.name, 'শানাজ');
    assert.equal((await request('sign-out', {})).status, 200);
    assert.equal((await request('get-session')).data, null);
    assert.equal(typeof configured.google, 'boolean');
    assert.equal(typeof configured.github, 'boolean');
    console.log('PASS: signup, no automatic session, safe duplicate response, short-password rejection, wrong/correct login, session, profile update, logout, provider status.');
  } finally {
    try {
      const db = mongo.db('bazar-dor');
      const user = await db.collection('user').findOne({ email });
      if (user) {
        await db.collection('session').deleteMany({ userId: { $in: [user._id, String(user._id)] } });
        await db.collection('account').deleteMany({ userId: { $in: [user._id, String(user._id)] } });
        await db.collection('user').deleteOne({ _id: user._id, email });
      }
    } finally { await mongo.close(); }
  }
})().catch(error => { console.error('FAIL:', stage, error.code || error.cause?.code || error.name, error.name === 'AssertionError' ? `expected ${error.expected}, received ${error.actual}` : '', '(response bodies and secrets omitted)'); process.exitCode = 1; });
