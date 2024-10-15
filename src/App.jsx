import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Home from './Pages/Home/Home';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/Footer';
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import Contact from './Pages/Contact/Contact';
import Cart from './Pages/Cart/Cart';
import UserProfile from './Pages/userProfile/userProfile'; 
import AdminDashboard from './Pages/Admin/AdminDashboard';
import ProductDetail from './Pages/ProductDetailpage/ProductDetail';
import About from './Pages/About/About';
import AllProducts from './Pages/AllProducts/AllProducts';

const App = () => {
  const ProtectedRoute = ({ children, role }) => {
    const { user } = useSelector((state) => state.user);
    console.log(user); 
    if (!user) {
      return <Navigate to="/login" />;
    }
    if (user.role !== role) {
      return <Navigate to="/" />;
    }
    return children;
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/about' element={<About/>}/>
        <Route path="/profile/*" element={<ProtectedRoute role="user"><UserProfile /></ProtectedRoute>}/>
        <Route path="/admin/*" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>}/>
        <Route path='/allProducts' element={<AllProducts/>}/>
        <Route path="/product/:id" element={<ProductDetail />} /> 
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
