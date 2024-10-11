import { useEffect, useRef, useState } from 'react'
import { AuthProvider } from './Context/authContext.jsx'
import { Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store.js'

import Header from './components/outlet/Header2/Header.jsx'
import Navbar from './components/outlet/Header1/Header.jsx'
import Home from './components/main/Home/Home.jsx'
import Footer from './components/outlet/Footer/Footer.jsx'
import Products from './components/main/Products/Products.jsx'
import SingleProduct from './components/main/SingleProduct/SingleProducts.jsx'
import Login from './components/main/Login/Login.jsx'
import Register from './components/main/Register/Register.jsx'
import Logout from './components/main/Logout/Logout.jsx'
import AdminPanel from './components/main/AdminPanel/AdminPanel.jsx'
import NotFound from './components/main/404NotFound/NotFound.jsx'
import WelcomeModal from './components/Widgets/WelcomeModal/WelcomeModal.jsx'
import Cart from './components/main/Cart/Cart.jsx'

function App() {
  const navbarRef = useRef(null); 
  const [navbarHeight, setNavbarHeight] = useState(0);

  // Getting the height of the navbar so I can dynamically set cart's top position 
  const updateNavbarHeight = () => {
    if (navbarRef.current) {
      const height = navbarRef.current.offsetHeight; 
      setNavbarHeight(height); 
    }
  };

  // Measure the height of the navbar after it renders and on window resize
  useEffect(() => {
    updateNavbarHeight();
    
    window.addEventListener('resize', updateNavbarHeight);
    
    return () => {
      window.removeEventListener('resize', updateNavbarHeight);
    };
  }, []);

  return (
    <Provider store={store}>
      <AuthProvider >
        <WelcomeModal />
        <div ref={navbarRef}>
          <Navbar navbarHeight={navbarHeight}/>
        </div>
        <Cart navbarHeight={navbarHeight}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/details/:productId" element={<SingleProduct />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/users/register" element={<Register />} />
          <Route path="/users/logout" element={<Logout />} />
          <Route path="/users/admin" element={<AdminPanel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </Provider>
  )
}

export default App
