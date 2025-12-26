import styles from './ProductCard.module.css';

export default function ProductCard({ data }) {
    return (
        <div className={styles.card}>
            <img src={data.image} alt={data.name}/>
            <p>{data.name}</p>
            <strong>R$ {data.price.toFixed(2)}</strong>
        </div>
    )
}