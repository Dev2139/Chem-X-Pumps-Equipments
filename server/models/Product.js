import mongoose from 'mongoose';

// Product schema mirrors the structure of src/data/products.json
const productSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    model: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    shortDescription: { type: String, default: '' },
    description: { type: String, default: '' },
    images: { type: [String], default: [] },
    specifications: { type: Object, default: {} },
    operatingRange: { type: Object, default: {} },
    features: { type: [String], default: [] },
    materials: { type: [String], default: [] },
    applications: { type: [String], default: [] },
    targetIndustries: { type: [String], default: [] },
    advantages: { type: [String], default: [] },
    brochurePdf: { type: String, default: 'https://drive.google.com/file/d/1RdyrDP0f-LuynVgop4_q5jJ4tW1joHlg/view?usp=sharing' },
  },
  {
    timestamps: true,
    minimize: false, // keep empty objects for specifications/operatingRange
    toJSON: {
      transform: (_doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

export default mongoose.model('Product', productSchema);
