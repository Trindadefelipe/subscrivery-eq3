import express from 'express';
import { criarAssinatura, listarAssinaturaUsuario } from '../controllers/assinaturaController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/contratar', verificarToken, criarAssinatura);
router.get('/meu-painel', verificarToken, listarAssinaturaUsuario);

export default router;