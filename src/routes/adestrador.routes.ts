import { Router } from 'express';
import adestradorController from '../controllers/adestrador.controller';
import { checkExistsUserEmail } from '../middlewares/checkExistsUserEmail';

const router = Router();

router.get('/', adestradorController.getAllAdestradors);

router.get('/:id', adestradorController.getAdestradorByPk);

router.post('/', checkExistsUserEmail, adestradorController.createAdestrador);

router.put('/:id', adestradorController.updateAdestradorByPk);

router.delete('/:id', adestradorController.removeAdestradorByPk);

export default router;
