import { useEffect, useEffectEvent, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../services/api";

import RecommendedProducts from "../../components/ProductCard/ProductCard";

import styles from './Product.module.css';

export default function Product() {
    const { id } = useParams();

    const [product, setProducts] = useState(null);
    const [related, setRelated] = useState([]);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        async function loadProduct() {
            const [productRes, relatedRes] = await Promise.all([
                api.get(`/products/${id}`),
                api.get(`/products/${id}/related`)
            ]);

            setProduct(productRes.data);
            setRelated(relatedRes);
        }

        loadProduct();
    }, [id]);

    function handleComprar() {
        Navigate('/checkout/confirmar-dados', {
            state: {
                produtoId: produtc.id,
                preco: produtc.preco,
                planoSelecionado: user.plano || null
            }
        })
    }

    if (!product) return null;

    return (
        <div className={styles.container}>
            <img
                src={product.image}
                alt={product.name}
                className={styles.image}
            />

            <h1 className={styles.title}>{product.name}</h1>

            <div className={styles.rating}>
                ⭐ {product.rating} ({product.reviews})
            </div>

            <div className={styles.quantity}>
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>

            <div className={styles.prices}>
                <div className={styles.member}>
                    Para membros
                    <strong>{product.memberPrice.toFixed(2)}</strong>
                </div>

                <button className={styles.butMenber}>
                    Assinar plano
                </button>

                <button
                 className={styles.buy}
                 onClick={handleComprar}
                >
                    Comprar R$ {(product.price * quantity).toFixed(2)}
                </button>
            </div>

            <p className={styles.description}>
                {product.description}
            </p>

            <ul className={styles.features}>
                {product.features.map((item, index) => {
                    <li key={index}>{item}</li>
                })}
            </ul>

            <RecommendedProducts
                products = {related}
            />
        </div>
    )
}