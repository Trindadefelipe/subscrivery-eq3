import db from '../config/db.js';
 

const categoriaController = {
   
    listarCategorias: async (req, res) => {
        try {
           
            const categorias = await Categoria.find(); 
            
            return res.status(200).json(categorias);
        } catch (error) {
          
            return res.status(500).json({ 
                mensagem: "Erro ao listar categorias", 
                detalhes: error.message 
            });
        }
    }
};

module.exports = categoriaController;