import { useState } from "react";
import { api } from "../../services/api";
import styles from "./AddCard.module.css";

export default function AddCard() {
  const [nomeTitular, setNomeTitular] = useState("");
  const [numero, setNumero] = useState("");
  const [validade, setValidade] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  function detectarBandeira(numero) {
    if (numero.startsWith("4")) return "visa";
    if (numero.startsWith("5")) return "mastercard";
    if (numero.startsWith("3")) return "amex";
    return "desconhecida";
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!nomeTitular || !numero) {
      alert("Preencha os campos obrigatórios");
      return;
    }

    const bandeira = detectarBandeira(numero);

    try {
      setLoading(true);

      await api.post("/cartoes", {
        nome_titular: nomeTitular,
        numero: numero.replace(/\s/g, ""),
        bandeira
      });

      alert("Cartão salvo com sucesso!");

      // Limpa formulário
      setNomeTitular("");
      setNumero("");
      setValidade("");
      setCvv("");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar cartão");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Adicionar cartão de crédito</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome do titular"
          value={nomeTitular}
          onChange={(e) => setNomeTitular(e.target.value)}
          className={styles.input}
        />

        <input
          type="text"
          placeholder="Número do cartão"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          className={styles.input}
        />

        <div className={styles.row}>
          <input
            type="text"
            placeholder="Validade"
            value={validade}
            onChange={(e) => setValidade(e.target.value)}
            className={styles.input}
          />
          <input
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Salvando..." : "Adicionar cartão"}
        </button>
      </form>
    </div>
  );
}
