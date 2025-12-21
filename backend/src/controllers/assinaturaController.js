import db from '../config/db.js';

export const criarAssinatura = async (req, res) => {

    const { id_plano, frequencia_entrega, endereco_entrega, forma_pagamento } = req.body;
    const id_usuario = req.usuarioId; 

    try {
        // 1. Validar se o plano escolhido existe
        const [plano] = await db.execute("SELECT id_plano FROM plano WHERE id_plano = ?", [id_plano]);
        if (plano.length === 0) {
            return res.status(404).json({ erro: "Plano não encontrado." });
        }

        // 2. Gravar a assinatura no banco (Passo 9 do Fluxo do Usuário) [cite: 30]
        const query = `
            INSERT INTO assinatura 
            (id_usuario, id_plano, frequencia_entrega, endereco_entrega, forma_pagamento, status) 
            VALUES (?, ?, ?, ?, ?, 'ativo')
        `;
        
        await db.execute(query, [id_usuario, id_plano, frequencia_entrega, endereco_entrega, forma_pagamento]);

        res.status(201).json({ mensagem: "Assinatura confirmada com sucesso! Bem-vindo à Subscrivery." });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao processar assinatura: " + err.message });
    }
};

export const listarAssinaturaUsuario = async (req, res) => {
    const id_usuario = req.usuarioId;

    try {
      
        const query = `
            SELECT a.*, p.nome as nome_plano, p.valor_mensal 
            FROM assinatura a
            JOIN plano p ON a.id_plano = p.id_plano
            WHERE a.id_usuario = ?
        `;
        const [rows] = await db.execute(query, [id_usuario]);
        res.json(rows);
    } catch (err) {
        res.status(500).json({ erro: "Erro ao buscar assinatura." });
    }
};

export const atualizarStatusAssinatura = async (req, res) => {
    const { id_assinatura, novoStatus } = req.body;
    const id_usuario = req.usuarioId; 


    const statusPermitidos = ['ativo', 'pausado', 'cancelado'];
    if (!statusPermitidos.includes(novoStatus)) {
        return res.status(400).json({ erro: "Status inválido. Use: ativo, pausado ou cancelado." });
    }

    try {

        const [assinatura] = await db.execute(
            "SELECT id_assinatura FROM assinatura WHERE id_assinatura = ? AND id_usuario = ?",
            [id_assinatura, id_usuario]
        );

        if (assinatura.length === 0) {
            return res.status(404).json({ erro: "Assinatura não encontrada ou você não tem permissão." });
        }


        await db.execute(
            "UPDATE assinatura SET status = ? WHERE id_assinatura = ?",
            [novoStatus, id_assinatura]
        );

        res.json({ mensagem: `Assinatura ${novoStatus === 'pausado' ? 'pausada' : 'cancelada'} com sucesso!` });
    } catch (err) {
        res.status(500).json({ erro: "Erro ao atualizar status: " + err.message });
    }
};