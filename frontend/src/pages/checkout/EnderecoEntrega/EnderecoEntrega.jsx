import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../services/api";
import styles from "./EnderecoEntrega.module.css";

export function EnderecoEntrega() {
    const navigate = useNavigate();

    const [endereco, setEndereco] = useState({
        logradouro: "",
        numero: "",
        bairro: "",
        cidade: "",
        cep: ""
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setEndereco(prev => ({ ...prev, [name]: value }));
    }

    async function handleSalvar() {
        try {
            const response = await api.post("/enderecos", {
                logradouro: endereco.logradouro,
                numero: endereco.numero,
                bairro: endereco.bairro,
                cidade: endereco.cidade,
                cep: endereco.cep
            });

            alert("Endereço salvo com sucesso!");

            navigate("/checkout/pagamento", {
                state: { endereco }
            });

        } catch (error) {
            console.error(error);
            alert("Erro ao salvar endereço");
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2>Adicionar endereço</h2>

                <input
                    name="cep"
                    placeholder="CEP"
                    value={endereco.cep}
                    onChange={handleChange}
                />

                <input
                    name="logradouro"
                    placeholder="Rua / Avenida"
                    value={endereco.logradouro}
                    onChange={handleChange}
                />

                <input
                    name="numero"
                    placeholder="Número"
                    value={endereco.numero}
                    onChange={handleChange}
                />

                <input
                    name="bairro"
                    placeholder="Bairro"
                    value={endereco.bairro}
                    onChange={handleChange}
                />

                <input
                    name="cidade"
                    placeholder="Cidade"
                    value={endereco.cidade}
                    onChange={handleChange}
                />
            </div>

            <button className={styles.salvar} onClick={handleSalvar}>
                Salvar
            </button>
        </div>
    );
}
