import React, { useState } from 'react';
import './styles.css';
import iconeFundo from '../../assets/iconi_fundo.png';
import logoImg from '../../assets/logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <div className="login-page">
      {/* Header Roxo com Logo e Frase */}
      <div className="header-purple">

        <h1><img src={logoImg} alt="Subscrivery Logo" className="logo-header" />  subscrivery</h1>
        <p>Sua vida, sem a complicação do mercado.</p>
      </div>

      {/* Card de Login */}
      <div className="login-card">
        <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#1F2937' }}>
          Bem-vindo de volta, Parceiro!
        </h2>

        <form className="login-form">
          <label>E-mail</label>
          <input
            type="email"
            placeholder="Seu e-mail profissional"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Senha</label>
          <input
            type="password"
            placeholder="Sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <button type="submit">Entrar no Portal</button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <a href="#" style={{ color: '#5A2D82', textDecoration: 'none', fontSize: '14px' }}>
            Esqueceu sua senha?
          </a>
        </div>

        {/* Link para Cadastro */}
        <div style={{ textAlign: 'center', marginTop: '25px', borderTop: '1px solid #E5E7EB', paddingTop: '20px' }}>
          <p style={{ fontSize: '14px', color: '#4B5563' }}>
            Novo por aqui?{' '}
            <a href="/cadastro" style={{ color: '#5A2D82', fontWeight: 'bold', textDecoration: 'none' }}>
              Crie sua conta.
            </a>
          </p>
        </div>
      </div>


      <img src={iconeFundo}
        alt="Ilustração de caixas"
        className="box-illustration" />
    </div>
  );
};

export default Login;