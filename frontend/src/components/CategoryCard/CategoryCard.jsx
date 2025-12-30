import styles from './CategoryCard.module.css';
import imagem from '../../assets/imgs/image.png';
import {useNavigate} from 'react-router-dom';

export default function CategoryCard({ data }) {
    const navigate = useNavigate();

    return (
        <div
            className={styles.card}
            onClick={() => navigate(`/categoria/${data.id_categoria}`)}
        >
            <span>{data.nome}</span>

            <img src={imagem} alt={data.nome} />
        </div>
    )
}