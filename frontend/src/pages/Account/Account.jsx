import {useState, useEffect} from "react";
import {api} from "../../services/api";

import ContaIcon from "../../assets/icons/ROXO/CONTA.svg"
import AjudaIcon from "../../assets/icons/ROXO/AJUDA.svg"

import styles from './Account.module.css';

export default function Account() {
    const [user, setUser] = useState(null);
    const [orders, setOrders] = useState(null);
    const [recommended, setRecommended] = useState([]);

    useEffect(() => {
        async function loadData() {
            const [userRes, orderRes, recRes] = await Promise.all([
                api.get("/"),
                api.get("/"),
                api.get("/")
            ])

            setUser(userRes.data);
            setOrders(orderRes.data);
            setRecommended(recRes.data);
        }

        loadData();
    }, []);

    if (!user || !orders) return null;

    return (
        <div className={styles.container}>
            <div className={styles.profile}>
                <div className={styles.avatar}>
                    <img src={ContaIcon} alt="icone de avatar" />
                </div>

                <div>
                    <strong>Oi {user.name}!</strong>
                    <span className={styles.link}>Meu Perfil</span>
                </div>

                <div className={styles.actions}>
                    <img src={AjudaIcon} alt="ajuda" />
                </div>

                <section className={styles.section}>
                    <h2>Meus pedidos</h2>

                    <div className={styles.orders}>
                        <div>A pagar <span>{orders.peding}</span></div>
                        <div>Preparando <span>{orders.preparing}</span></div>
                        <div>A caminho <span>{orders.shipping}</span></div>
                        <div>Finalizados <span>{orders.finished}</span></div>
                    </div>
                </section>

                <RecommendedProducts products={recommended} />
            </div>
        </div>
    )
}