import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is required");
if (!process.env.BETTER_AUTH_SECRET) throw new Error("BETTER_AUTH_SECRET is required");

// Reuse the connection pool across Next.js development reloads.
const globalForMongo = globalThis as typeof globalThis & {
  authMongo?: { uri: string; client: MongoClient };
};
const cachedMongo = globalForMongo.authMongo;
const client = (cachedMongo?.uri === uri ? cachedMongo.client : undefined) ?? new MongoClient(uri, {
  serverSelectionTimeoutMS: 10000,
});
if (process.env.NODE_ENV !== "production") globalForMongo.authMongo = { uri, client };

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: mongodbAdapter(client.db("bazar-dor"), { client }),
  socialProviders: {
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? {
      google: { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET },
    } : {}),
    ...(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET ? {
      github: { clientId: process.env.GITHUB_CLIENT_ID, clientSecret: process.env.GITHUB_CLIENT_SECRET },
    } : {}),
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: false,
  },
});
