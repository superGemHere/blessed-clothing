import { Routes, Route } from 'react-router-dom'

import Header from './components/outlet/Header/Header.jsx'
import Home from './components/main/Home/Home.jsx'
import Footer from './components/outlet/Footer/Footer.jsx'

function App() {

  return (
    <>
    <Header />
    <Routes>

      <Route path="/" element={<Home />} />
    </Routes>
    <Footer />
    </>
  )
}

export default App
