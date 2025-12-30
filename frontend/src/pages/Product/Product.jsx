import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../../services/api";

import Button from "../../components/Button/Button";
import styles from "./Product.module.css";

import imagemPets from "../../assets/imgs/imagem_pets.png";

export default function Product() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProduct() {
            try {
                const res = await api.get("/produtos");

                const selectedProduct = res.data.find(
                    (item) => String(item.id_produto) === String(id)
                );

                if (!selectedProduct) {
                    setProduct(null);
                    return;
                }

                setProduct({
                    id: selectedProduct.id_produto,
                    nome: selectedProduct.nome,
                    preco: Number(selectedProduct.preco),
                    descricao: selectedProduct.descricao,
                    imagem: imagemPets
                });
            } catch (err) {
                console.error("Erro ao carregar produto", err);
            } finally {
                setLoading(false);
            }
        }

        loadProduct();
    }, [id]);

    function handleComprar() {
        const storedItems = JSON.parse(localStorage.getItem("cartItems")) || [];

        const index = storedItems.findIndex(
            (item) => item.id === product.id
        );

        if (index >= 0) {
            storedItems[index].quantidade += quantity;
        } else {
            storedItems.push({
                id: product.id,
                nome: product.nome,
                preco: product.preco,
                quantidade: quantity,
                imagem: product.imagem
            });
        }

        localStorage.setItem("cartItems", JSON.stringify(storedItems));
        navigate("/checkout/pagamento");
    }

    if (loading) {
        return <p>Carregando produto...</p>;
    }

    if (!product) {
        return <p>Produto não encontrado</p>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>{product.nome}</h1>

            <img src={product.imagem} alt={product.nome} />

            <div className={styles.quantity}>
                <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>

            <Button variant="primary" onClick={handleComprar}>
                R$ {(Number(product?.preco || 0) * quantity).toFixed(2)}
            </Button>

            <h2>Descrição</h2>
            <p>{product.descricao}</p>
        </div>
    );
}
