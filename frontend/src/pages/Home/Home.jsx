import { useEffect, useState } from "react";
import { api } from "../../services/api";

import imagem from '../../assets/imgs/image.png'
import ProductCard from "../../components/ProductCard/ProductCard";
import CategoryCard from "../../components/CategoryCard/CategoryCard";

import styles from './Home.module.css';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);

                const [productsRes, categoriesRes] = await Promise.all([
                    api.get("/produtos"),
                    api.get("/categorias")
                ]);

                setProducts(productsRes.data);
                setCategories(categoriesRes.data);

            } catch (err) {
                console.error(err);
                setError("Erro ao carregar dados");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, []);

    return (
        <div className={styles.container}>

            <div className={styles.banners}>
                <div className={styles.banner} style={{ backgroundColor: "#018263" }}>
                    <h3>Ofertas de Natal</h3>
                    <img src={imagem} alt="imagem" />
                </div>
                <div className={styles.banner} style={{ backgroundColor: "#FF40AC" }}>
                    <h3>Ofertas de Natal</h3>
                    <img src={imagem} alt="imagem" />
                </div>
            </div>

            <h2 className={styles.sectionTitle}>Mais Pedidos</h2>
            <div className={styles.products}>

                {products.map(product => (
                    <ProductCard key={product.id_produto} data={product} />
                ))}
            </div>

            <h2 className={styles.sectionTitle}>Categorias</h2>
            <div className={styles.categories}>
                {categories.map(category => (
                    <CategoryCard key={category.id_categoria} data={category} />
                ))}
            </div>

        </div>
    )
}