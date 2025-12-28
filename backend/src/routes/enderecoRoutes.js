import express from 'express';
import { verificarToken } from '../middlewares/authMiddleware.js';
import { salvarEndereco, listarEnderecos } from '../controllers/enderecoController.js';


const router = express.Router();

router.post('/', verificarToken, salvarEndereco);
router.get('/', verificarToken, listarEnderecos);

export default router;