import styles from "./Input.module.css"

export default function Input({ label, ...props }) {
    return <input {...props}/>
}