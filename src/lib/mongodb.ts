/**
 * CONEXIÓN A MONGODB
 * Cliente singleton para evitar múltiples conexiones
 */

import { MongoClient, Db } from 'mongodb';
import { env } from './env';

// Variables globales para mantener el cliente entre hot reloads en desarrollo
declare global {
  var mongoClient: MongoClient | undefined;
  var mongoDb: Db | undefined;
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectToMongo(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  try {
    const client = new MongoClient(env.mongodb.uri);
    await client.connect();

    const db = client.db(env.mongodb.dbName);

    cachedClient = client;
    cachedDb = db;

    // En desarrollo, guardar en global para hot reload
    if (process.env.NODE_ENV === 'development') {
      global.mongoClient = client;
      global.mongoDb = db;
    }

    console.log(`✓ MongoDB conectado a ${env.mongodb.dbName}`);

    return { client, db };
  } catch (error) {
    console.error('✗ Error conectando a MongoDB:', error);
    throw error;
  }
}

export async function getMongoDb(): Promise<Db> {
  // En desarrollo, recuperar del global si existe
  if (process.env.NODE_ENV === 'development' && global.mongoDb) {
    return global.mongoDb;
  }

  if (!cachedDb) {
    const { db } = await connectToMongo();
    return db;
  }

  return cachedDb;
}

export async function closeMongoConnection(): Promise<void> {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
    if (global.mongoClient) {
      global.mongoClient = undefined;
    }
    if (global.mongoDb) {
      global.mongoDb = undefined;
    }
  }
}
