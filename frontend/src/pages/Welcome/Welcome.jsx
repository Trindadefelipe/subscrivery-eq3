import Button from '../../components/Button/Button'
import { Link, useNavigate } from "react-router-dom";
import styles from "./Welcome.module.css";
import googleIcon from "../../assets/icons/google-icon.png";
import appleIcon from "../../assets/icons/apple-icon.png";
import facebookIcon from "../../assets/icons/facebook-icon.png";


export default function Welcome() {
  const navigate = useNavigate();

  return (

    <div className={styles.container}>
      <h1 className={styles.title}>
        Bem-vindo <br />
        Subscrivery
      </h1>

      <p className="welcome-text">
        <Link to="/Register">Cadastre-se</Link> gratuitamente ou faça login.
      </p>

      <Button
        variant={'primary'}
        onClick={() => navigate("/login")}
      >
        Continuar com email ou celular
      </Button>

      <div className={styles.welcomeDivider}>ou</div>

      <div className={styles.welcomeSocial}>
        <button className={styles.socialBtn}>
          <img src={googleIcon} alt="Google" />
        </button>
        <button className={styles.socialBtn}>
          <img src={appleIcon} alt="Apple" />
        </button>
        <button className={styles.socialBtn}>
          <img src={facebookIcon} alt="Faceboook" />
        </button>
      </div>
    </div>
  );
}
