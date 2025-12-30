import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ResumoPedido.module.css";

export function ResumoPedido() {
  const navigate = useNavigate();

  const [itens, setItens] = useState([]);
  const [pagamento, setPagamento] = useState("pix");

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    if (storedItems.length === 0) {
      navigate("/home");
      return;
    }

    setItens(storedItems);
  }, [navigate]);

  function alterarQuantidade(id, delta) {
    const atualizados = itens.map((item) =>
      item.id === id
        ? { ...item, quantidade: Math.max(1, item.quantidade + delta) }
        : item
    );

    setItens(atualizados);
    localStorage.setItem("cartItems", JSON.stringify(atualizados));
  }

  const subtotal = itens.reduce(
    (acc, item) => acc + item.preco * item.quantidade,
    0
  );

  const frete = 30.23;
  const descontos = 15.6;
  const total = subtotal - descontos + frete;

  function finalizarCompra() {
    localStorage.setItem("paymentMethod", pagamento);
    localStorage.setItem("orderTotal", total.toFixed(2));

    navigate("/plans");
  }

  return (
    <div className={styles.container}>
      <section className={styles.section}>
        <h2>Resumo do pedido</h2>

        {itens.map((item) => (
          <div key={item.id} className={styles.item}>
            <img src={item.imagem} alt={item.nome} />

            <div className={styles.info}>
              <p>{item.nome}</p>
              <span>R$ {item.preco.toFixed(2)}</span>
            </div>

            <div className={styles.qty}>
              <button onClick={() => alterarQuantidade(item.id, -1)}>-</button>
              <span>{item.quantidade}</span>
              <button onClick={() => alterarQuantidade(item.id, 1)}>+</button>
            </div>
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <div className={styles.pagamentoHeader}>
          <label>Método de pagamento</label>
          <span>Todos os dados são criptografados</span>
        </div>

        <div className={styles.pagamentos}>
          <button
            className={pagamento === "pix" ? styles.active : ""}
            onClick={() => setPagamento("pix")}
          >
            Pix
          </button>
          <button
            className={pagamento === "cartao" ? styles.active : ""}
            onClick={() => setPagamento("cartao")}
          >
            Cartão
          </button>
          <button
            className={pagamento === "boleto" ? styles.active : ""}
            onClick={() => setPagamento("boleto")}
          >
            Boleto
          </button>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.totalLinha}>
          <span>Produtos</span>
          <span>R$ {subtotal.toFixed(2)}</span>
        </div>

        <div className={styles.totalLinha}>
          <span>Descontos</span>
          <span>- R$ {descontos.toFixed(2)}</span>
        </div>

        <div className={styles.totalLinha}>
          <span>Frete</span>
          <span>R$ {frete.toFixed(2)}</span>
        </div>

        <div className={styles.totalFinal}>
          <span>Valor total</span>
          <strong>R$ {total.toFixed(2)}</strong>
        </div>
      </section>

      <button className={styles.finalizar} onClick={finalizarCompra}>
        Comprar como membro
      </button>
    </div>
  );
}
