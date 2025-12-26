import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./EnderecoEntrega.module.css";

export function EnderecoEntrega() {
    const navigate = useNavigate();

    const [endereco, setEndereco] = useState({
        pais: "Brasil",
        nome: "",
        telefone: "",
        cep: "",
        rua: "",
        numero: "",
        complemento: "",
        estado: "",
        cidade: "",
        bairro: "",
        cpf: "",
        principal: true
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setEndereco({ ...endereco, [name]: value });
    }

    function handleSalvar() {
        // futuramente: api.post("/enderecos", endereco)

        navigate("/checkout/pagamento", {
            state: { endereco }
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2>Adicionar endereço</h2>

                <select name="pais" value={endereco.pais} onChange={handleChange}>
                    <option>Brasil</option>
                </select>

                <input name="nome" placeholder="Nome completo" onChange={handleChange} />
                <input name="telefone" placeholder="Número de telefone BR+55" onChange={handleChange} />
                <input name="cep" placeholder="CEP" onChange={handleChange} />
                <input name="rua" placeholder="Rua/Avenida" onChange={handleChange} />
                <input name="numero" placeholder="Número" onChange={handleChange} />
                <input name="complemento" placeholder="Complemento" onChange={handleChange} />
                <input name="estado" placeholder="Estado" onChange={handleChange} />
                <input name="cidade" placeholder="Cidade" onChange={handleChange} />
                <input name="bairro" placeholder="Bairro" onChange={handleChange} />
                <input name="cpf" placeholder="CPF" onChange={handleChange} />

                <label className={styles.switch}>
                    <input
                        type="checkbox"
                        checked={endereco.principal}
                        onChange={() =>
                            setEndereco({ ...endereco, principal: !endereco.principal })
                        }
                    />
                    <span />
                    Esse é meu endereço principal
                </label>
            </div>

            <button className={styles.salvar} onClick={handleSalvar}>
                Salvar
            </button>
        </div>
    );
}
