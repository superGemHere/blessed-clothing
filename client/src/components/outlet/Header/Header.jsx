import styles from "./header.module.css";
import {Link} from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';

export default function Header(){
    return(
        <header className={styles.header}>
            <div className={styles.left}>
                <ul className={styles.nav__ul}  id={styles.left}>
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
                {/* <MenuIcon id={styles.menu__button}/> */}
            </div>
            <h1 className={styles.logo}>Blessed</h1>
            <div className={styles.right}>
                <ul className={styles.nav__ul} id={styles.right}>
                        <li className={styles.ul__item}>
                            <Link to="#" className={styles.ul__links}>Browse</Link>
                        </li>
                        <li className={styles.ul__item}>
                            <Link to="#" className={styles.ul__links}><ShoppingCartIcon  id={styles.cart__button}/></Link>
                        </li>
                </ul>
            </div>
                <MenuIcon id={styles.menu__button}/>
        </header>
    );
}