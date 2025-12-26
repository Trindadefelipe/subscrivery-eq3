import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import styles from "./ResetPassword.module.css";

import VoltarIcon from "../../assets/icons/ROXO/VOLTAR.svg"
import AjudaIcon from "../../assets/icons/ROXO/AJUDA.svg"

export default function ResetPassword() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (!password || password.length < 8) {
            setError("A senha deve ter no mínimo 8 caracteres");
            return;
        }

        if (!token) {
            setError("Token inválido ou expirado");
            return;
        }

        try {
            setLoading(true);
            setError("");

            await axios.post("http://localhost:3000/auth/redefinir-senha", {
                token,
                novaSenha: password,
            });

            setSuccess(true);
        } catch (err) {
            setError("Não foi possível redefinir a senha");
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className={styles.resetContainer}>
            <header className={styles.resetHeader}>
                <button className="back-btn">
                    <img src={VoltarIcon} alt="botão de voltar" />
                </button>
                <span>Login</span>
                <button className="help-btn">
                    <img src={AjudaIcon} alt="Botão de ajuda" />
                </button>
            </header>

            {!success ? (
                <form className={styles.resetContent} onSubmit={handleSubmit}>
                    <div className={styles.container}>
                        <h1>Redefenir senha</h1>
                        <Input
                            type="password"
                            placeholder="Nova senha"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError("");
                            }}
                        />
                        {error && <span className={styles.error}>{error}</span>}
                    </div>


                    <Button variant={'primary'} disabled={loading}>
                        {loading ? "Salvando..." : "Redefinir senha"}
                    </Button>
                </form>
            ) : (
                <div className={styles.container}>
                    <p className="success">
                        Senha redefinida com sucesso!
                    </p>

                    <button
                        className="primary-btn"
                        onClick={() => navigate("/login")}
                    >
                        Ir para login
                    </button>
                </ div>
            )}
        </div>
    )
}