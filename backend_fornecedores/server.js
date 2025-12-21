import express from 'express';
import 'dotenv/config';
import cors from 'cors'; // Importante para o React conseguir falar com o Node

const app = express();
app.use(express.json());
app.use(cors()); // Libera o acesso para o seu frontend_fornecedores

const PORT = 3001; // Porta diferente do backend do cliente (3000)

app.get('/', (req, res) => res.send("API Fornecedores Rodando! 🚀"));

app.listen(PORT, () => console.log(`Servidor de Fornecedores na porta ${PORT}`));