import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, default: '', trim: true },
    company: { type: String, default: '', trim: true },
    subject: { type: String, default: '', trim: true },
    message: { type: String, default: '', trim: true },
    product: { type: String, default: '', trim: true },
    type: { type: String, default: 'Website Inquiry', trim: true },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Resolved'],
      default: 'New',
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        ret.id = ret._id.toString();
        delete ret.__v;
        return ret;
      },
    },
  }
);

export default mongoose.model('Inquiry', inquirySchema);
