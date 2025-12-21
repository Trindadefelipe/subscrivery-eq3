import db from '../config/db.js';
import bcrypt from 'bcrypt';

export const cadastrarFornecedor = async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!senha || senha.length < 8) {
    return res.status(400).json({ 
      error: "A senha é muito curta. Ela deve ter no mínimo 8 caracteres."
    });
  }

  try {
 
    const saltRounds = 10;
    const senhaCriptografada = await bcrypt.hash(senha, saltRounds);

    const sql = "INSERT INTO fornecedor (nome_fantasia, email, senha, status) VALUES (?, ?, ?, 'ativo')";
    const [result] = await db.execute(sql, [nome, email, senhaCriptografada]);

    return res.status(201).json({
      message: "Fornecedor cadastrado com sucesso!",
      id: result.insertId
    });

  } catch (err) {
    console.error('Erro ao salvar no banco:', err);
    return res.status(500).json({ error: "Erro interno ao registrar no banco de dados." });
  }
};

export const loginFornecedor = async (req, res) => {
  const { email, senha } = req.body;

  try {

    const sql = "SELECT * FROM fornecedor WHERE email = ?";
    const [usuarios] = await db.execute(sql, [email]);

    if (usuarios.length === 0) {
      return res.status(401).json({ erro: "E-mail ou senha incorretos." });
    }

    const usuario = usuarios[0];

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(401).json({ erro: "E-mail ou senha incorretos." });
    }

    return res.status(200).json({
      message: "Login realizado com sucesso!",
      usuario: { id: usuario.id, nome: usuario.nome_fantasia }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ erro: "Erro interno no servidor." });
  }
};