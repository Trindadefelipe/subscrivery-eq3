import { useEffect, useState } from "react";
import { api } from "../../services/api";

import imagem from '../../assets/imgs/image.png'
import ProductCard from "../../components/ProductCard/ProductCard";
import CategoryCard from "../../components/CategoryCard/CategoryCard";

import styles from './Home.module.css';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        async function loadData() {
            const [productsRes, catergoriesRes] =
                await Promise.all([
                    api.get("/produtos"),
                    api.get("/categorias")
                ])
            setProducts(productsRes);
            setCategories(catergoriesRes);
        }

        loadData();
    }, []);

    console.log(categories);

    return (
        <div className={styles.container}>

            <div className={styles.banners}>
                <div className={styles.banner} style={{backgroundColor:"#018263"}}>
                    <h3>Ofertas de Natal</h3>
                    <img src={imagem} alt="imagem" />
                </div>
                <div className={styles.banner} style={{backgroundColor:"#FF40AC"}}>
                    <h3>Ofertas de Natal</h3>
                    <img src={imagem} alt="imagem" />
                </div>
            </div>

            <h2 className={styles.sectionTitle}>Mais Pedidos</h2>
            <div className={styles.products}>

                {products.map(product => (
                    <ProductCard key={product.id} data={product} />
                ))}
            </div>

            <h2 className={styles.sectionTitle}>Recomendados</h2>
            <div className={styles.categories}>
                {categories.map(category => (
                    <CategoryCard key={category.id} data={category} />
                ))}
            </div>

        </div>
    )
}