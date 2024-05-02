import { Routes, Route } from 'react-router-dom'

import Header from './components/outlet/Header/Header.jsx'
import Home from './components/main/Home/Home.jsx'

function App() {

  return (
    <>
    <Header />
    <Routes>

      <Route path="/" element={<Home />} />

    </Routes>
    </>
  )
}

export default App
