import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import protect from '../middleware/protect.js';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/', protect, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const base64 = req.file.buffer.toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${base64}`;
    
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'blog-posts'
    });
    
    res.json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;