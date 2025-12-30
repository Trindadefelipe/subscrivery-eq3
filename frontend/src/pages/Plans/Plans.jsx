import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import styles from "./Plans.module.css";

export default function Plans() {
  const navigate = useNavigate();

  const [plans, setPlans] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const res = await api.get("/plans");

        const adaptedPlans = res.data.map(plan => ({
          id: plan.id_plano,
          title: plan.nome,
          price: Number(plan.valor_mensal),
          benefits: [
            `Até R$ ${Number(plan.limite_produtos_valor)
              .toFixed(2)
              .replace(".", ",")} em produtos`,
            plan.descricao
          ],
          highlight: plan.nome.toLowerCase() === "premium"
        }));

        setPlans(adaptedPlans);

        const recommended = adaptedPlans.find(p => p.highlight);
        setSelected(recommended?.id ?? adaptedPlans[0]?.id);

      } catch (error) {
        console.error("Erro ao carregar planos", error);
      } finally {
        setLoading(false);
      }
    };

    loadPlans();
  }, []);

  function handleSubscribe() {
    if (!selected) return;

    localStorage.setItem("selectedPlan", selected)
    navigate("/checkout");
  }

  if (loading) {
    return <p className={styles.loading}>Carregando planos...</p>;
  }

  return (
    <div className={styles.container}>
      {/* INTRO */}
      <section className={styles.intro}>
        <strong>Seja membro</strong>
        <p>
          Simplifique sua rotina e economize tempo com o clube que
          abastece sua casa!
        </p>
      </section>

      {/* PLANOS */}
      <section className={styles.plans}>
        {plans.map(plan => (
          <div
            key={plan.id}
            className={`${styles.card}
              ${plan.highlight ? styles.highlight : ""}
              ${selected === plan.id ? styles.selected : ""}
            `}
            onClick={() => setSelected(plan.id)}
          >
            <h2>{plan.title}</h2>

            <ul>
              {plan.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
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
      <button
        className={styles.subscribe}
        onClick={handleSubscribe}
        disabled={!selected}
      >
        Assinar
      </button>

      <span
        className={styles.skip}
        onClick={() => navigate("/checkout/endereco")}
      >
        Não obrigado(a). Fechar pedido
      </span>
    </div>
  );
}
