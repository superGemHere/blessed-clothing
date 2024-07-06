import styles from "./header.module.css";
import {Link} from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useRef, useState } from "react";

export default function Header(){
    // const responsiveNav = useRef();
    const [isVisible, setIsVis] = useState(false);
    useEffect(() => {
        const handleResize = () => {
            if(window.innerWidth >= 1023 & isVisible){
                setIsVis(false);
            }
        };
        
    
        window.addEventListener('resize', handleResize);
        
        // Cleanup function to remove event listener when component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
      })



    return(
        <header className={styles.header}>
            <nav>
            <div className={styles.left}>
                <ul className={styles.nav__ul}  id={styles.left}>
                    <li className={styles.ul__item}>
                        <Link to="/" className={styles.ul__links}>Home</Link>
                    </li>
                    <li className={styles.ul__item}>
                        <Link to="/products" className={styles.ul__links}>Products</Link>
                    </li>
                    <li className={styles.ul__item}>
                        <Link to="#" className={styles.ul__links}>Sale</Link>
                    </li>
                    <li className={styles.ul__item}>
                        <Link to="#" className={styles.ul__links}>About Us</Link>
                    </li>
                </ul>
            </div>
            <Link to={"/"}className={`${styles.logo}`}>Blessed</Link>
            <div className={styles.right}>
                <ul className={styles.nav__ul} id={styles.right}>
                        <li className={styles.ul__item}>
                            <Link to="#" className={styles.ul__links}>Browse</Link>
                        </li>
                        <li className={styles.ul__item}>
                            <Link to="#" className={styles.ul__links}>Collections</Link>
                        </li>
                        <li className={styles.ul__item}>
                            <Link to="#" className={styles.ul__links}><ShoppingCartIcon  id={styles.cart__button}/></Link>
                        </li>
                </ul>
            </div>
                {isVisible 
                ? <CloseIcon id={styles.menu__button} onClick={() => setIsVis(!isVisible)}/> 
                : <MenuIcon id={styles.menu__button} onClick={() => setIsVis(!isVisible)}/>}
            </nav>
            {isVisible &&
            <div className={styles.dropDown} /*ref={responsiveNav}*/>
            <ul className={styles.responsiveNav}  >
                    <li className={styles.ul__item}>
                        <Link to="/" className={styles.ul__links}>Home</Link>
                    </li>
                    <li className={styles.ul__item}>
                        <Link to="/products" className={styles.ul__links}>Products</Link>
                    </li>
                    <li className={styles.ul__item}>
                        <Link to="#" className={styles.ul__links}>Sale</Link>
                    </li>
                    <li className={styles.ul__item}>
                        <Link to="#" className={styles.ul__links}>About Us</Link>
                    </li>
                    <li className={styles.ul__item}>
                            <Link to="#" className={styles.ul__links}>Browse</Link>
                    </li>
                    <li className={styles.ul__item}>
                            <Link to="#" className={styles.ul__links}>Collections</Link>
                    </li>
                    <li className={styles.ul__item}>
                        <Link to="#" className={styles.ul__links}><ShoppingCartIcon  id={styles.cart__button}/></Link>
                    </li>
                </ul>
            </div>
            }
        </header>
    );
}