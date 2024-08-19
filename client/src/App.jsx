import { Routes, Route } from 'react-router-dom'

import Header from './components/outlet/Header/Header.jsx'
import Home from './components/main/Home/Home.jsx'
import Footer from './components/outlet/Footer/Footer.jsx'
import Products from './components/main/Products/Products.jsx'
import SingleProduct from './components/main/SingleProduct/SingleProducts.jsx'
import Login from './components/main/Login/Login.jsx'

function App() {

  return (
    <>
    <Header />
    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/details/:productId" element={<SingleProduct />} />
      <Route path="/users/login" element={<Login />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
