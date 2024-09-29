import { AuthProvider } from './Context/authContext.jsx'
import { Routes, Route } from 'react-router-dom'

import Header from './components/outlet/Header/Header.jsx'
import Home from './components/main/Home/Home.jsx'
import Footer from './components/outlet/Footer/Footer.jsx'
import Products from './components/main/Products/Products.jsx'
import SingleProduct from './components/main/SingleProduct/SingleProducts.jsx'
import Login from './components/main/Login/Login.jsx'
import Register from './components/main/Register/Register.jsx'
import Logout from './components/main/Logout/Logout.jsx'
import AdminPanel from './components/main/AdminPanel/AdminPanel.jsx'
import NotFound from './components/main/404NotFound/NotFound.jsx'

function App() {

  return (
    <>
    <AuthProvider >
      <Header />
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
    </>
  )
}

export default App
