import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "../../services/api"

import ProductCard from "../../components/ProductCard/ProductCard"
import styles from "./Category.module.css"

export default function Category() {
    const { id } = useParams()

    const [category, setCategory] = useState(null)
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadCategory() {
            try {
                const [productsRes, categoriesRes] = await Promise.all([
                    api.get("/produtos"),
                    api.get("/categorias")
                ]);

                // Garante comparação correta (string vs number)
                const selectedCategory = categoriesRes.data.find(
                    categoria => String(categoria.id_categoria) === String(id)
                )

                if (!selectedCategory) {
                    setCategory(null)
                    return
                }

                setCategory(selectedCategory)
                setProducts(productsRes.data || [])
            } catch (error) {
                console.error("Erro ao carregar categorias:", error)
            } finally {
                setLoading(false)
            }
        }

        loadCategory()
    }, [id])
    
    if (loading) return <p>Carregando...</p>
    if (!category) return <p>Categoria não encontrada</p>

    return (
        <div className={styles.container}>
            <div
                className={styles.banner}
                style={{ backgroundColor: category.cor_fundo }}
            >
                <h1>{category.nome}</h1>
            </div>

            <div className={styles.products}>
                {products.length === 0 ? (
                    <p>Nenhum produto nesta categoria</p>
                ) : (
                    products.map(product => (
                        <ProductCard
                            key={product.id_produto}
                            data={product}
                        />
                    ))
                )}
            </div>
        </div>
    )
}
