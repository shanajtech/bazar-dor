import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error("MONGODB_URI is required");
if (!process.env.BETTER_AUTH_SECRET) throw new Error("BETTER_AUTH_SECRET is required");

// Reuse the connection pool across Next.js development reloads.
const globalForMongo = globalThis as typeof globalThis & { mongoClient?: MongoClient };
const client = globalForMongo.mongoClient ?? new MongoClient(uri, {
  serverSelectionTimeoutMS: 10000,
});
if (process.env.NODE_ENV !== "production") globalForMongo.mongoClient = client;

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  database: mongodbAdapter(client.db("bazar-dor"), { client }),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    autoSignIn: false,
  },
});
