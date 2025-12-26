import styles from "./ConfirmarDados.module.css";
import Button from "../../../components/Button/Button";

export function ConfirmarDados() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Confirmar dados pessoais</h1>
      <p className={styles.subtitle}>
        Para concluir seu pedido, informe seus dados pessoais
      </p>

      <form className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="CPF"
        />
        <input
          className={styles.input}
          type="text"
          placeholder="Seu nome completo"
        />
      </form>

      <div className={styles.tips}>
        <p className={styles.tipsTitle}>Dicas para preenchimento</p>
        <ul className={styles.tipsList}>
          <li>• Preencha seu nome completo.</li>
          <li>• Não utilize abreviações, iniciais ou siglas.</li>
          <li>• Nome e CPF devem pertencer a uma pessoa maior de 18 anos.</li>
        </ul>
      </div>

      <div className={styles.footer}>
        <Button variant={'primary'}>Continuar</Button>
      </div>
    </div>
  );
}
