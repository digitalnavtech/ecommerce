import mongoose, { Connection } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in environment variables");
}

type MongooseCache = {
  conn: Connection | null;
  promise: Promise<Connection> | null;
};

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const globalCache = global.mongooseCache ?? { conn: null, promise: null };
global.mongooseCache = globalCache;

export default async function dbConnect(): Promise<Connection> {
  if (globalCache.conn) return globalCache.conn;

  if (!globalCache.promise) {
    globalCache.promise = mongoose.connect(MONGODB_URI).then((m) => m.connection);
  }

  globalCache.conn = await globalCache.promise;
  return globalCache.conn;
}
