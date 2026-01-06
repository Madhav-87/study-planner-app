import express from 'express';
import multer from 'multer';
import {controller} from '../controllers/controller.js';
const router=express.Router();

const upload = multer({
  dest: "uploads/"   // folder where PDFs will be stored
});

router.post('/chatbot/input',upload.single("syllabus"),controller);

export default router;