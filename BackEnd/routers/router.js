import express from 'express';
import multer from 'multer';
import {controller,sendMessage} from '../controllers/controller.js';
const router=express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 5MB limit
  }
});

router.post('/chatbot/input',upload.single("syllabus"),controller);
router.get('/',sendMessage);
export default router;