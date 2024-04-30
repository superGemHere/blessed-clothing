import styles from "./header.module.css";
import {Link} from "react-router-dom"

export default function Header(){
    return(
        <header className={styles.header}>
            <div className={styles.left}>
                <ul className={styles.nav__ul}>
                    <li className={styles.ul__item}>
                        <Link to="#" className={styles.ul__links}>Home</Link>
                    </li>
                    <li className={styles.ul__item}>
                        <Link to="#" className={styles.ul__links}>Shop</Link>
                    </li>
                    <li className={styles.ul__item}>
                        <Link to="#" className={styles.ul__links}>About Us</Link>
                    </li>
                </ul>
            </div>
            <h1 className={styles.logo}>Blessed</h1>
            <div className={styles.right}>
                <ul className={styles.nav__ul}>
                        <li className={styles.ul__item}>
                            <Link to="#" className={styles.ul__links}>Browse</Link>
                        </li>
                        <li className={styles.ul__item}>
                            <Link to="#" className={styles.ul__links}>Cart</Link>
                        </li>
                </ul>
            </div>
        </header>
    );
}