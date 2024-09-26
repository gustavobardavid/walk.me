import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { storage } from '../config/multer.config';
import multer from 'multer';

export function saveImage(req: Request, res: Response) {
    // console.log('aqui')
    return res.json(req.file?.filename)
}