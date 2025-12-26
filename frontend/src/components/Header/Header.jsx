import styles from "./Header.module.css"

import VoltarIcon from "../../assets/icons/BRANCO/VOLTAR.svg"
import SearchIcon from "../../assets/icons/ROXO/PESQUISAR.svg"
import AjudaIcon from "../../assets/icons/BRANCO/AJUDA.svg"

export default function Header(value) {

    return (
        <header className={styles.searchHeader}>
            <button className={styles.iconButton}>
                <img src={VoltarIcon} alt="voltar" />
            </button>

            <div className={styles.searchBox}>
                <input
                    type="text"
                    placeholder="Pesquisar"
                />
                <img className={styles.searchIcon} src={SearchIcon} alt="pesquisar" />
            </div>

            <button className={styles.iconButton}>
                <img className={styles.iconAjuda} src={AjudaIcon} alt="Ajuda"/>
            </button>
        </header>
    )
}