import { Router } from 'express';
import passeadorController from '../controllers/passeador.controller';
import { checkExistsUserEmail } from '../middlewares/checkExistsUserEmail';

const router = Router();

router.get('/', passeadorController.getAllPasseadors);

router.get('/:id', passeadorController.getPasseadorByPk);

router.post('/', checkExistsUserEmail, passeadorController.createPasseador);

router.delete('/:id', passeadorController.removePasseadorByPk);

export default router;
