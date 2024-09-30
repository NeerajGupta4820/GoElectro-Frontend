import Home from './Pages/Home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./Components/Navbar/Navbar.jsx"
import Footer from './Components/Footer/Footer'
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import Contact from './Pages/Contact/Contact';
import Cart from './Pages/Cart/Cart';

const App = () => {
  return (
    <Router>
        <Navbar/>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path="/about" element={<About/>} />         */}
        </Routes>
        <Footer/>
    </Router>
  )
}

export default App
