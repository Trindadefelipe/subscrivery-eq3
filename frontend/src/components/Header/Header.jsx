import styles from "./Header.module.css"

import { useNavigate } from "react-router-dom"

import VoltarIcon from "../../assets/icons/BRANCO/VOLTAR.svg"
import AjudaIcon from "../../assets/icons/BRANCO/AJUDA.svg"

export default function Header() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate('/home');
    }

    return (
        <header className={styles.searchHeader}>
            <button className={styles.iconButton} onClick={handleBack}>
                <img src={VoltarIcon} alt="voltar" />
            </button>

            <h1 className={styles.title}>Subscrivery</h1>

            <button className={styles.iconButton}>
                <img className={styles.iconAjuda} src={AjudaIcon} alt="Ajuda"/>
            </button>
        </header>
    )
}