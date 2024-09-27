import { Router } from 'express';
import adestradorController from '../controllers/adestrador.controller';
import { checkExistsUserEmail } from '../middlewares/checkExistsUserEmail';
import anuncioController from '../controllers/anuncio.controller';

const router = Router();

router.get('/', anuncioController.getAllAnuncios);

router.get('/:id', anuncioController.getAnuncioByPk);

router.post('/', anuncioController.createAnuncio);

router.get('/adestrador', anuncioController.getAnunciosAdestrador);

router.get('/passeador', anuncioController.getAnunciosPasseador);

router.delete('/:id', anuncioController.removeAnuncioByPk);

export default router;
