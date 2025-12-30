import express from 'express';
import { verificarToken } from '../middlewares/authMiddleware.js';
import { salvarCartao, listarCartoes, excluirCartao } from '../controllers/cartaoController.js';


const router = express.Router();

router.post('/', verificarToken, salvarCartao);
router.get('/', verificarToken, listarCartoes);
router.delete('/:id', verificarToken, excluirCartao);

export default router;