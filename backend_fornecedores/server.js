import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import usuarioRoutes from './src/routes/usuarioRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());

app.use(usuarioRoutes);

const PORT = 3001;

app.get('/', (req, res) => res.send("API Fornecedores Organizada! 🚀"));

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));