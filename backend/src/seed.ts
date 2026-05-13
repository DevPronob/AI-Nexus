import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Expert from './models/Expert';

dotenv.config();

const experts = [
  {
    name: "Dr. Sarah Johnson",
    title: "Senior AI Research Consultant",
    description: "Expert in NLP and Computer Vision with 10+ years of experience in Silicon Valley.",
    category: "AI & Machine Learning",
    price: 150,
    rating: 4.9,
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
    skills: ["Python", "PyTorch", "NLP"]
  },
  {
    name: "Marcus Chen",
    title: "Full Stack Development Lead",
    description: "Specializing in scalable architecture and high-performance web applications.",
    category: "Software Development",
    price: 120,
    rating: 4.8,
    location: "Toronto, ON",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop",
    skills: ["Next.js", "Node.js", "AWS"]
  },
  {
    name: "Elena Rodriguez",
    title: "Digital Marketing Strategist",
    description: "Helping brands grow their online presence through data-driven marketing strategies.",
    category: "Marketing",
    price: 90,
    rating: 4.7,
    location: "Madrid, ES",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop",
    skills: ["SEO", "SEM", "Content Strategy"]
  },
  {
    name: "David Smith",
    title: "Business Growth Advisor",
    description: "Strategic consultant focused on scaling startups and optimizing business processes.",
    category: "Business",
    price: 200,
    rating: 5.0,
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
    skills: ["Operations", "Strategy", "Finance"]
  }
];

const seedDB = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/ai-nexus';
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB for seeding...");
    
    await Expert.deleteMany({});
    await Expert.insertMany(experts);
    
    console.log("Database seeded successfully!");
    process.exit();
  } catch (err) {
    console.error("Error seeding database:", err);
    process.exit(1);
  }
};

seedDB();
