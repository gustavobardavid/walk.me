import { Router } from 'express';
import petController from '../controllers/pet.controller';

const router = Router();

router.get('/', petController.getAllPets);

router.get('/:id', petController.getPetByPk);

router.get('/tutor/:id', petController.getPetsByTutorId);

router.post('/', petController.createPet);

router.delete('/:id', petController.removePetByPk);

export default router;
