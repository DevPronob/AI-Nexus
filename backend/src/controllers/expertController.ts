import { Request, Response } from 'express';
import Expert from '../models/Expert';
import mongoose from 'mongoose';

const MOCK_EXPERTS = [
  {
    _id: "6a047a6a03cb9a3810793bf1",
    name: "David Smith",
    title: "Business Growth Advisor",
    description: "Strategic consultant focused on scaling startups and optimizing business processes.",
    category: "Business",
    price: 150,
    rating: 4.9,
    location: "New York, USA",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    skills: ["Startup Scaling", "Process Optimization", "Market Analysis"]
  },
  {
    _id: "6a047a6a03cb9a3810793bf2",
    name: "Sarah Chen",
    title: "AI & ML Engineer",
    description: "Expert in deep learning, neural networks and deploying AI solutions at scale.",
    category: "AI & Machine Learning",
    price: 250,
    rating: 5.0,
    location: "San Francisco, USA",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
    skills: ["TensorFlow", "PyTorch", "NLP", "Computer Vision"]
  },
  {
    _id: "6a047a6a03cb9a3810793bf3",
    name: "Marcus Johnson",
    title: "Cloud Architect",
    description: "Specializing in AWS, Azure and building resilient cloud-native infrastructures.",
    category: "Software Development",
    price: 200,
    rating: 4.8,
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop",
    skills: ["AWS", "Kubernetes", "Docker", "DevOps"]
  },
  {
    _id: "6a047a6a03cb9a3810793bf4",
    name: "Elena Rodriguez",
    title: "Growth Marketing Expert",
    description: "Helping brands dominate social media and scale through data-driven performance marketing.",
    category: "Marketing",
    price: 120,
    rating: 4.7,
    location: "Madrid, Spain",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
    skills: ["SEO", "PPC", "Social Media Strategy", "Analytics"]
  }
];

export const getExperts = async (req: Request, res: Response) => {
  try {
    // Check if DB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log("DB not connected, returning mock data");
      return res.json(MOCK_EXPERTS);
    }

    const { search, category, minPrice, maxPrice, sortBy } = req.query;
    
    let query: any = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (category) query.category = category;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let experts = Expert.find(query);

    if (sortBy) {
      if (sortBy === 'price_asc') experts = experts.sort({ price: 1 });
      if (sortBy === 'price_desc') experts = experts.sort({ price: -1 });
      if (sortBy === 'rating') experts = experts.sort({ rating: -1 });
    } else {
      experts = experts.sort({ createdAt: -1 });
    }

    const result = await experts;
    
    // If result is empty and no filters, return mocks
    if (result.length === 0 && !search && !category) {
      return res.json(MOCK_EXPERTS);
    }

    res.json(result);
  } catch (err: any) {
    console.error("Controller Error:", err);
    res.json(MOCK_EXPERTS); // Fallback to mock on error
  }
};

export const getExpertById = async (req: Request, res: Response) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const mock = MOCK_EXPERTS.find(e => e._id === req.params.id);
      return res.json(mock || MOCK_EXPERTS[0]);
    }

    const expert = await Expert.findById(req.params.id);
    if (!expert) {
      const mock = MOCK_EXPERTS.find(e => e._id === req.params.id);
      return res.json(mock || MOCK_EXPERTS[0]);
    }
    res.json(expert);
  } catch (err: any) {
    const mock = MOCK_EXPERTS.find(e => e._id === req.params.id);
    res.json(mock || MOCK_EXPERTS[0]);
  }
};

export const createExpert = async (req: Request, res: Response) => {
  try {
    const expert = new Expert(req.body);
    await expert.save();
    res.status(201).json(expert);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
