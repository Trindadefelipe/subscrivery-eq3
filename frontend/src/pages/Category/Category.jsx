import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";

import ProductCard from "../../components/ProductCard/ProductCard";
import styles from "./Category.module.css";

export default function Category() {
    const {id} = useParams();

    const [category, setCategory] = useState(null);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function loadCategory() {
            const [categoryRes, productRes] = await Promise.all([
                api.get(`/categorias/${id}`),
                api.get(`/categorias/${id}/produtos`)
            ]);

            setCategory(categoryRes);
            setProducts(productRes);
        }

        loadCategory();
    }, [id]);

    if (!category) return null;

    return (
        <div className={styles.container}>
            <div 
                className={styles.banner}
                style={{ backgroundColor: category.color}}
            >
                <h1>{category.name}</h1>
                <img src={category.img} alt={category.name} />
            </div>

            <div className={styles.products}>
                {products.map(product => (
                    <ProductCard key={product.id} data={product} />
                ))}
            </div>
        </div>
    )
}