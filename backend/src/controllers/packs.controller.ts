import { Request, Response } from 'express';
import Pack from '../models/Pack.model';

export const getAllPacks = async (req: Request, res: Response) => {
  try {
    const packs = await Pack.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 });
    
    res.json({
      success: true,
      data: packs
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getPackBySlug = async (req: Request, res: Response) => {
  try {
    const pack = await Pack.findOne({ 
      slug: req.params.slug,
      isActive: true 
    });
    
    if (!pack) {
      return res.status(404).json({
        success: false,
        message: 'Pack non trouvé'
      });
    }
    
    res.json({
      success: true,
      data: pack
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const createPack = async (req: Request, res: Response) => {
  try {
    const pack = await Pack.create(req.body);
    
    res.status(201).json({
      success: true,
      data: pack
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const updatePack = async (req: Request, res: Response) => {
  try {
    const pack = await Pack.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!pack) {
      return res.status(404).json({
        success: false,
        message: 'Pack non trouvé'
      });
    }
    
    res.json({
      success: true,
      data: pack
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deletePack = async (req: Request, res: Response) => {
  try {
    const pack = await Pack.findByIdAndDelete(req.params.id);
    
    if (!pack) {
      return res.status(404).json({
        success: false,
        message: 'Pack non trouvé'
      });
    }
    
    res.json({
      success: true,
      message: 'Pack supprimé avec succès'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
