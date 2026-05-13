import { Request, Response } from 'express';
import Expert from '../models/Expert';

export const generateContent = async (req: Request, res: Response) => {
  try {
    const { prompt, type } = req.body;
    
    // In a real app, this would call an LLM API (OpenAI/Gemini)
    // For this demo, we'll return a high-quality simulated response
    let content = "";
    if (type === 'description') {
      content = `Expert in ${prompt}. Dedicated to delivering high-quality solutions with over 5 years of industry experience. Specializing in strategic planning and technical execution to help clients achieve their goals efficiently.`;
    } else {
      content = `Revolutionizing the way you think about ${prompt}. Our approach combines cutting-edge technology with human-centric design to create unparalleled value and sustainable growth for your business.`;
    }

    res.json({ content });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getRecommendations = async (req: Request, res: Response) => {
  try {
    // Simple recommendation logic: get top rated experts
    const recommendations = await Expert.find().sort({ rating: -1 }).limit(4);
    res.json(recommendations);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
