import express from 'express';
import { verificarToken } from '../middlewares/authMiddleware.js';
import { criarAssinatura, listarAssinaturaUsuario, atualizarStatusAssinatura,obterHistoricoEntregas} from '../controllers/assinaturaController.js';



const router = express.Router();

router.post('/contratar', verificarToken, criarAssinatura);
router.get('/meu-painel', verificarToken, listarAssinaturaUsuario);
router.patch('/atualizar-status', verificarToken, atualizarStatusAssinatura);
router.get('/historico', verificarToken, obterHistoricoEntregas);

export default router;