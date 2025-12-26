import ProductCard from "../ProductCard/ProductCard";
import styles from "./RecommendedProducts.module.css";

export default function RecommendedProducts({
    title = "Você também vai gostar de",
    products = []
}) {
    if(!products.length) return null;

    return (
        <section className={styles.container}>
            <h2 className={styles.title}>{title}</h2>

            <div className={styles.list}>
                {products.map(product => (
                    <ProductCard key={product.id} data={product}/>
                ))}
            </div>
        </section>
    )
}