import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../login/styles.css';
import iconeFundo from '../../assets/iconi_fundo.png';
import logoImg from '../../assets/logo.png';

const Cadastro = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <div className="login-page">
      <header className="header-purple">
        <h1><img src={logoImg} alt="Subscrivery Logo" className="logo-header" />  subscrivery</h1>
        <p>Sua vida, sem a complicação do mercado.</p>
      </header>

      <main className="login-card">
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#111827' }}>
          Criar conta de Parceiro
        </h2>
        
        <form className="login-form">
          <label>Nome / Razão Social</label>
          <input 
            type="text" 
            placeholder="Nome completo ou Empresa" 
            value={nome} 
            onChange={(e) => setNome(e.target.value)} 
          />

          <label>E-mail Profissional</label>
          <input 
            type="email" 
            placeholder="seu@email.com" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />

          <label>Senha</label>
          <input 
            type="password" 
            placeholder="Crie uma senha forte" 
            value={senha} 
            onChange={(e) => setSenha(e.target.value)} 
          />

          <button type="submit">Cadastrar</button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px' }}>
          Já tem uma conta? <Link to="/" style={{ color: '#5A2D82', fontWeight: 'bold', textDecoration: 'none' }}>Faça login.</Link>
        </p>
      </main>

       <img src={iconeFundo}
        alt="Ilustração de caixas"
        className="box-illustration" />
    </div>

  );
};

export default Cadastro; 