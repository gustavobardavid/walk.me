import { Router } from 'express';
import { storage } from '../config/multer.config';
import multer from 'multer';
import { saveImage } from '../controllers/upload.controller';
import express from 'express';
const router = Router();
const upload = multer({ storage:storage })

router.post('/:id',upload.single("file"), saveImage);
router.use('/files',express.static('uploads') )

export default router;
