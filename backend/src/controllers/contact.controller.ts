import { Request, Response } from 'express';
import Contact from '../models/Contact.model';
import nodemailer from 'nodemailer';

export const createContact = async (req: Request, res: Response) => {
  try {
    const contact = await Contact.create(req.body);
    
    // Send email notification if configured
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS
        }
      });

      const mailOptions = {
        from: process.env.SMTP_USER,
        to: process.env.CONTACT_EMAIL,
        subject: `Nouveau contact Web Yarden - ${contact.name}`,
        html: `
          <h2>Nouveau message de contact</h2>
          <p><strong>Nom:</strong> ${contact.name}</p>
          <p><strong>Email:</strong> ${contact.email}</p>
          ${contact.phone ? `<p><strong>Téléphone:</strong> ${contact.phone}</p>` : ''}
          ${contact.service ? `<p><strong>Service:</strong> ${contact.service}</p>` : ''}
          <p><strong>Message:</strong></p>
          <p>${contact.message}</p>
        `
      };

      await transporter.sendMail(mailOptions);
    }
    
    res.status(201).json({
      success: true,
      message: 'Message envoyé avec succès. Nous vous répondrons sous 24h.',
      data: contact
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await Contact.find().sort('-createdAt');
    res.json({
      success: true,
      data: contacts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error fetching contacts'
    });
  }
};

export const updateContactStatus = async (req: Request, res: Response) => {
  try {
    const { status, notes } = req.body;
    
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status, notes },
      { new: true, runValidators: true }
    );
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact non trouvé'
      });
    }
    
    res.json({
      success: true,
      data: contact
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact non trouvé'
      });
    }
    
    res.json({
      success: true,
      message: 'Contact supprimé avec succès'
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
