import mongoose, { Schema, Document } from 'mongoose';

export interface IExpert extends Document {
  name: string;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  location: string;
  image: string;
  skills: string[];
  createdAt: Date;
}

const ExpertSchema: Schema = new Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  location: { type: String, required: true },
  image: { type: String, required: true },
  skills: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IExpert>('Expert', ExpertSchema);
