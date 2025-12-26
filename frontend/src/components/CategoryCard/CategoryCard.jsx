import styles from './CategoryCard.module.css';

export default function CategoryCard({ data }) {
    return (
        <div
            className={styles.card}
            style={{backgroundColor: data.color}}
            onClick={() => Navigate(`/categoria/${data.id}`)}
        >
            <span>{data.name}</span>

            <img src={data.image} alt={data.name} />
        </div>
    )
}