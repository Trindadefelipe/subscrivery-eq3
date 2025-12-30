import styles from "./Banner.module.css";

export default function Banner({ data }) {
    return (
        <div
            className={styles.Banner}
            style={{ backgroundColor: data.backgroundColor }}
        >
            <h3>{data.title}</h3>
            <img src={data.img} alt={data.title} />
        </div>
    )
}