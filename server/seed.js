import 'dotenv/config';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import mongoose from 'mongoose';
import Product from './models/Product.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/chemx';

// Seeds MongoDB with the existing catalog from src/data/products.json.
// Existing products (matched by slug id) are left untouched; only new ones are inserted.
async function seed() {
  const raw = readFileSync(join(__dirname, '..', 'src', 'data', 'products.json'), 'utf-8');
  const { products } = JSON.parse(raw);

  await mongoose.connect(MONGODB_URI);
  console.log(`✔ Connected to ${MONGODB_URI}`);

  let inserted = 0;
  let skipped = 0;

  for (const product of products) {
    const exists = await Product.exists({ id: product.id });
    if (exists) {
      skipped++;
      continue;
    }
    await Product.create(product);
    inserted++;
    console.log(`  + ${product.name} (${product.id})`);
  }

  console.log(`✔ Seed complete: ${inserted} inserted, ${skipped} already existed.`);
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('✖ Seed failed:', err.message);
  process.exit(1);
});
