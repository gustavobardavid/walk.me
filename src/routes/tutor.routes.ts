import { Router } from 'express';
import tutorController from '../controllers/tutor.controller';
import { checkExistsUserEmail } from '../middlewares/checkExistsUserEmail';

const router = Router();

router.get('/', tutorController.getAllTutors);

router.get('/:id', tutorController.getTutorByPk);

router.post('/', checkExistsUserEmail, tutorController.createTutor);

router.delete('/:id', tutorController.removeTutorByPk);

export default router;
