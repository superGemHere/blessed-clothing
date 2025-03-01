import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import styles from './header.module.css';
import { useSelector } from 'react-redux';
import { useAuth } from '../../../Context/authContext.jsx';

export default function Navbar({
  navbarHeight,
  visibilityState
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const location = useLocation();
  const {isAdmin, user} = useAuth();

  const totalItems = useSelector(state => 
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  useEffect(() => {
    if (visibilityState.isCartOpen) {
      setIsMenuOpen(false);
    }
  }, [visibilityState.isCartOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProducts = () => {
    setIsProductsOpen(!isProductsOpen);
  };

  const isActive = (path, category) => {
    if (category === 'male'){
      const isMale = location.search.includes('gender=male')
      return isMale;
    }else if (category === 'female'){
      const isFemale = location.search.includes('gender=female')
      return isFemale;
    }else if (category === 'child'){
      const isChild =  location.search.includes('child')
      return isChild;
    }else {
      return location.search === `?page=1&limit=10&sort=asc&maxPrice=1000&gender=&age=&trending=false&sale=false&sizes=`;
    }
  };

  const getProductsUrl = (category, age) => {
    const baseUrl = `${import.meta.env.MODE === 'development' ? import.meta.env.VITE_LOCAL_FRONTEND_URL : import.meta.env.VITE_FRONTEND_URL}products`;
    return `${baseUrl}?page=1&limit=10&sort=asc&maxPrice=1000&gender=${category}&age=${age}&trending=false&sale=false&sizes=`;
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLogo}>
          <Link to="/">FootGear</Link>
        </div>
        <div className={`${styles.navbarMenu} ${isMenuOpen ? styles.active : ''}`} style={{top: `${navbarHeight + 1}px`}}>
          <ul>
            <li><Link onClick={toggleMenu} to="/" className={isActive('/') ? styles.activeLink : ''}>Home</Link></li>
            <li className={styles.productsDropdown}>
              <span 
                onClick={toggleProducts} 
                className={`${styles.productsToggle} ${isProductsOpen || location.pathname.match(/\/(men|women|kids|products)/) ? styles.activeLink : ''}`}
              >
                Products
                
              </span>
              <ul className={`${styles.productCategories} ${isProductsOpen ? styles.open : ''}`}>
                <li>
                  <Link 
                    onClick={toggleMenu} 
                    to={getProductsUrl('', '')}
                    className={isActive('/products') ? styles.activeLink : ''}
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link 
                    onClick={toggleMenu} 
                    to={getProductsUrl("male", "")}
                    className={isActive(null, 'male') ? styles.activeLink : ''}
                  >
                    Men
                  </Link>
                </li>
                <li>
                  <Link 
                    onClick={toggleMenu} 
                    to={getProductsUrl("female", "")}
                    className={isActive(null, 'female') ? styles.activeLink : ''}
                  >
                    Women
                  </Link>
                </li>
                <li>
                  <Link 
                    onClick={toggleMenu} 
                    to={getProductsUrl("", "child")}
                    className={isActive(null, 'child') ? styles.activeLink : ''}
                  >
                    Kids
                  </Link>
                </li>
              </ul>
              
            </li>
            <li>
              <Link 
                onClick={toggleMenu} 
                to={`${import.meta.env.MODE === 'development' ? import.meta.env.VITE_LOCAL_FRONTEND_URL : import.meta.env.VITE_FRONTEND_URL}products?page=1&limit=10&sort=asc&maxPrice=1000&gender=&age=&trending=false&sale=true&sizes=`}
                className={isActive('/sale') ? styles.activeLink : ''}
              >
                Sale
              </Link>
            </li>
          </ul>
        </div>
        <div className={styles.navbarIcons}>
         {user ? (<Link className={styles.cartIcon} to={`${import.meta.env.MODE === 'development' ? import.meta.env.VITE_LOCAL_FRONTEND_URL : import.meta.env.VITE_FRONTEND_URL}users/logout`}>
            <LogoutRoundedIcon style={{fontSize: '2.5rem', cursor: 'pointer',}} />
          </Link>)
         : (<Link className={styles.cartIcon} to={`${import.meta.env.MODE === 'development' ? import.meta.env.VITE_LOCAL_FRONTEND_URL : import.meta.env.VITE_FRONTEND_URL}users/login`}>
            <AccountCircleRoundedIcon style={{fontSize: '2.5rem', cursor: 'pointer',}} />
          </Link>)}
         {isAdmin && (
          <Link className={styles.cartIcon} to={`${import.meta.env.MODE === 'development' ? import.meta.env.VITE_LOCAL_FRONTEND_URL : import.meta.env.VITE_FRONTEND_URL}users/admin`}>
            <AdminPanelSettingsRoundedIcon style={{fontSize: '2.5rem', cursor: 'pointer',}} />
          </Link>
          )
         }
         <div className={styles.cartIcon} onClick={() => visibilityState.setIsCartOpen((prevState) => !prevState)}>
            <ShoppingCartOutlinedIcon style={{fontSize: '2.5rem', cursor: 'pointer',}} />
            <span>{totalItems}</span>
         </div>
          <div className={styles.menuIcon} onClick={toggleMenu}>
            {isMenuOpen ? <CloseIcon style={{fontSize: '2.5rem'}}/> : <MenuIcon style={{fontSize: '2.5rem'}}/>}
          </div>
        </div>
      </div>
    </nav>
  );
}