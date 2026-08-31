import { Router } from 'express';
import Product from '../models/Product.js';
import { requireAdmin } from '../middleware/auth.js';

const router = Router();

// Generate a URL-friendly unique id (slug) from the product name
async function generateUniqueId(name) {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'product';

  let candidate = base;
  let counter = 2;
  while (await Product.exists({ id: candidate })) {
    candidate = `${base}-${counter++}`;
  }
  return candidate;
}

// GET /api/products - public product catalog
router.get('/', async (_req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: 1 });
    res.json({ products });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products', details: err.message });
  }
});

// GET /api/products/:id - single product by slug id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ product });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product', details: err.message });
  }
});

// POST /api/products - admin only: add a new product
router.post('/', requireAdmin, async (req, res) => {
  try {
    const { name, model, category } = req.body;
    if (!name || !model || !category) {
      return res.status(400).json({ error: 'Name, Model and Category are required fields.' });
    }

    const id = req.body.id?.trim() || (await generateUniqueId(name));
    if (await Product.exists({ id })) {
      return res.status(409).json({ error: `A product with id "${id}" already exists.` });
    }

    const product = await Product.create({ ...req.body, id });
    res.status(201).json({ product });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product', details: err.message });
  }
});

// PUT /api/products/:id - admin only: update existing product
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const { id: _ignored, ...updates } = req.body; // keep slug id stable
    const product = await Product.findOneAndUpdate(
      { id: req.params.id },
      { $set: updates },
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ product });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product', details: err.message });
  }
});

// DELETE /api/products/:id - admin only: remove product
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ id: req.params.id });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json({ success: true, id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product', details: err.message });
  }
});

export default router;
