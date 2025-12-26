import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import styles from "./Plans.module.css";

export default function Plans() {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    async function loadPlans() {
      const res = await api.get("/plans");
      setPlans(res.data);

      const recommended = res.data.find(p => p.highlight);
      setSelected(recommended?.id);
    }

    loadPlans();
  }, []);

  function handleSubscribe() {
    if (!selected) return;
    // fluxo real: salvar escolha e seguir checkout
    navigate("/checkout");
  }

  return (
    <div className={styles.container}>

      {/* HEADER */}
      <header className={styles.header}>
        <button onClick={() => navigate(-1)}>←</button>
        <span>Faça seu pedido</span>
        <span>?</span>
      </header>

      {/* INTRO */}
      <section className={styles.intro}>
        <strong>Seja membro</strong>
        <p>
          Julia, simplifique sua rotina e economize tempo com o clube
          que abastece sua casa!
        </p>
      </section>

      {/* PLANOS */}
      <section className={styles.plans}>
        {plans.map(plan => (
          <div
            key={plan.id}
            className={`${styles.card} ${
              plan.highlight ? styles.highlight : ""
            } ${selected === plan.id ? styles.selected : ""}`}
            onClick={() => setSelected(plan.id)}
          >
            <h2>{plan.name}</h2>

            <ul>
              {plan.benefits.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <strong>
              R$ {plan.price.toFixed(2).replace(".", ",")}/mês
            </strong>
          </div>
        ))}
      </section>

      {/* TERMOS */}
      <p className={styles.terms}>
        Ao assinar, você concorda com os Termos e Condições do
        Subscribery Club. A assinatura continuará válida até ser
        cancelada.
      </p>

      {/* CTA */}
      <button className={styles.subscribe} onClick={handleSubscribe}>
        Assinar
      </button>

      <span
        className={styles.skip}
        onClick={() => navigate("/checkout")}
      >
        Não obrigatório(a). Fechar pedido
      </span>

    </div>
  );
}
