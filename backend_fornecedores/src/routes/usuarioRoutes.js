import express from 'express';
import { cadastrarFornecedor, loginFornecedor } from '../controllers/usuarioController.js';

const router = express.Router();

router.post('/usuarios', cadastrarFornecedor);
router.post('/login', loginFornecedor);

export default router;