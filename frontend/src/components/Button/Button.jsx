import styles from './Button.module.css';

export default function Button({ variant ,className = '', children, ...props }) {

    const VARIANTS = {
        primary: styles.btnPrimary,
        secondary: styles.btnSecondary,
    };


    return (<button 
                className={
                    `${styles.button}
                    ${VARIANTS[variant]}
                    ${className}`
                }
                {...props}
            >
                {children}
            </button>);
}