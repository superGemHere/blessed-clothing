import styles from "./header.module.css";
import {Link} from "react-router-dom";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../Context/authContext";

export default function Header(){
    // const responsiveNav = useRef();
    const {isAuthenticated} = useAuth();
    const [isVisible, setIsVis] = useState(false);
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
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
      }, [window.innerWidth])

    

    useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
    }, [lastScrollY]);

    // Scroll event handler

    const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY  && currentScrollY > 200) {
        // Scrolling down, hide navbar
        setShowNavbar(false);
    } else {
        // Scrolling up, show navbar
        setShowNavbar(true);
    }

    setLastScrollY(currentScrollY);
    };


    return(
        <header className={`${styles.header} ${showNavbar ? styles.visible : styles.hidden}`}>
            <nav>
            <div className={styles.left}>
                <ul className={styles.nav__ul}  id={styles.left}>
                    <li className={styles.ul__item}>
                        <Link to="/" className={styles.ul__links}>Home</Link>
                    </li>
                    <li className={styles.ul__item}>
                        <Link to={`${import.meta.env.MODE === 'development' ? import.meta.env.VITE_LOCAL_FRONTEND_URL : import.meta.env.VITE_FRONTEND_URL}products?page=1&limit=10&sort=asc&maxPrice=1000&gender=&age=&trending=false&sale=false&sizes=`} className={styles.ul__links}>Products</Link>
                    </li>
                    <li className={styles.ul__item}>
                        <Link to={`${import.meta.env.MODE === 'development' ? import.meta.env.VITE_LOCAL_FRONTEND_URL : import.meta.env.VITE_FRONTEND_URL}products?page=1&limit=10&sort=asc&maxPrice=1000&gender=&age=&trending=false&sale=true&sizes=`} className={styles.ul__links}>Sale</Link>
                    </li>
                    <li className={styles.ul__item}>
                        <Link to="#" className={styles.ul__links}>About Us</Link>
                    </li>
                </ul>
            </div>
            <Link to={"/"}className={`${styles.logo}`}>FootGear</Link>
            <div className={styles.right}>
                <ul className={styles.nav__ul} id={styles.right}>
                        <li className={styles.ul__item}>
                            <Link to="#" className={styles.ul__links}>Browse</Link>
                        </li>
                        {isAuthenticated 
                            ? 
                            <li className={styles.ul__item}>
                                <Link to="/users/logout" className={styles.ul__links}>Logout</Link>
                            </li> 
                            : 
                            <li className={styles.ul__item}>
                                <Link to="/users/login" className={styles.ul__links}>Login</Link>
                            </li> 
                        }
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
                        <Link to={`${import.meta.env.MODE === 'development' ? import.meta.env.VITE_LOCAL_FRONTEND_URL : import.meta.env.VITE_FRONTEND_URL}products?page=1&limit=10&sort=asc&maxPrice=1000&gender=&age=&trending=false&sale=false&sizes=`} className={styles.ul__links}>Products</Link>
                    </li>
                    <li className={styles.ul__item}>
                        <Link to={`${import.meta.env.MODE === 'development' ? import.meta.env.VITE_LOCAL_FRONTEND_URL : import.meta.env.VITE_FRONTEND_URL}products?page=1&limit=10&sort=asc&maxPrice=1000&gender=&age=&trending=false&sale=true&sizes=`} className={styles.ul__links}>Sale</Link>
                    </li>
                    <li className={styles.ul__item}>
                        <Link to="#" className={styles.ul__links}>About Us</Link>
                    </li>
                    <li className={styles.ul__item}>
                            <Link to="#" className={styles.ul__links}>Browse</Link>
                    </li>
                    {isAuthenticated 
                        ? 
                        <li className={styles.ul__item}>
                            <Link to="/users/logout" className={styles.ul__links}>Logout</Link>
                        </li> 
                        : 
                        <li className={styles.ul__item}>
                            <Link to="/users/login" className={styles.ul__links}>Login</Link>
                        </li> 
                    }
                    <li className={styles.ul__item}>
                        <Link to="#" className={styles.ul__links}><ShoppingCartIcon  id={styles.cart__button}/></Link>
                    </li>
                </ul>
            </div>
            }
        </header>
    );
}