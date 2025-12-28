import { Link } from "react-router-dom";
import styles from './ProductCard.module.css';
import imagemPets from '../../assets/imgs/imagem_pets.png'

export default function ProductCard({ data }) {
    return (
        <Link to={`/produto/${data.id_produto}`} className={styles.card}>
            <img src={imagemPets} alt={data.nome}/>
            <p>{data.nome}</p>
            <strong>R$ {data.preco}</strong>
        </Link>
    )
}