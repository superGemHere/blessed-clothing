import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import styles from './header.module.css';

export default function Navbar({
  navbarHeight,
  setIsCartOpen
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLogo}>
          <a href="/">FootGear</a>
        </div>
        <div className={`${styles.navbarMenu} ${isMenuOpen ? styles.active : ''}`} style={{top: `${navbarHeight + 1}px`}}>
          <ul>
            <li><Link onClick={toggleMenu} to="/">Home</Link></li>
            <li><Link onClick={toggleMenu} to={`${import.meta.env.MODE === 'development' ? import.meta.env.VITE_LOCAL_FRONTEND_URL : import.meta.env.VITE_FRONTEND_URL}products?page=1&limit=10&sort=asc&maxPrice=1000&gender=&age=&trending=false&sale=false&sizes=`}>Products</Link></li>
            <li><Link onClick={toggleMenu} to={`${import.meta.env.MODE === 'development' ? import.meta.env.VITE_LOCAL_FRONTEND_URL : import.meta.env.VITE_FRONTEND_URL}products?page=1&limit=10&sort=asc&maxPrice=1000&gender=&age=&trending=false&sale=true&sizes=`}>Sale</Link></li>
            <li><Link onClick={toggleMenu} to="/men">Men</Link></li>
            <li><Link onClick={toggleMenu} to="/women">Women</Link></li>
            <li><Link onClick={toggleMenu} to="/kids">Kids</Link></li>
          </ul>
        </div>
        <div className={styles.navbarIcons} onClick={() => setIsCartOpen((prevState) => !prevState)}>
         <div className={styles.cartIcon}>
            <ShoppingCartOutlinedIcon style={{fontSize: '2.5rem', cursor: 'pointer',}} />
            <span>3</span>
         </div>
          <div className={styles.menuIcon} onClick={toggleMenu}>
            {isMenuOpen ? <CloseIcon style={{fontSize: '2.5rem'}}/> : <MenuIcon style={{fontSize: '2.5rem'}}/>}
          </div>
        </div>
      </div>
    </nav>
  );
}