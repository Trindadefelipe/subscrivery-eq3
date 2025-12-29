import db from '../config/db.js';

export const listarCategorias = async (req, res) => {
    try {

        const [categorias] = await db.execute("SELECT id_categoria, nome, cor_fundo FROM categoria"); 
        return res.status(200).json(categorias);
    } catch (error) {
        return res.status(500).json({ 
            mensagem: "Erro ao listar categorias", 
            detalhes: error.message 
        });
    }
};