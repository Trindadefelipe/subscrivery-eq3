import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
   
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ erro: "Acesso negado. Token não fornecido." });
    }

    try {

        const decodificado = jwt.verify(token, process.env.JWT_SECRET);
        
        // Adiciona os dados do usuário dentro da requisição para as próximas funções usarem
        req.usuarioId = decodificado.id;
        
        next(); 
    } catch (err) {
        res.status(403).json({ erro: "Token inválido ou expirado." });
    }
};