import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ erro: "Acesso negado. Token não fornecido." });
    }

 
    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
        return res.status(401).json({ erro: "Erro no formato do token." });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).json({ erro: "Token malformatado." });
    }

    const secret = process.env.JWT_SECRET;

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ erro: "Sessão inválida ou expirada. Faça login novamente." });
        }

        req.usuarioId = decoded.id; 
        
        return next();
    });
};