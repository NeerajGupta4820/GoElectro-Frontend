import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../redux/slices/userSlice";
import { clearCart } from "../../redux/slices/cartSlice";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useUpdateCartMutation } from "../../redux/api/cartAPI";
import { FaTimes, FaRegUser } from "react-icons/fa";
import { FaBars } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import Pill from "../Pill/Pill";
import "./Navbar.css";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const { cartItems = [], totalAmount, totalQuantity } = useSelector((state) => state.cart.cart || {});
  const [updateCart] = useUpdateCartMutation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [width, setWidth] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const mobileMenuRef = useRef(null);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const handleSearch = () => {
    if (searchTerm) {
      navigate(`/search?query=${searchTerm}`);
      setSearchTerm("");
    }
  };

  const logoutUser = async () => {
    try {
      await updateCart({ cartItems, totalQuantity, totalAmount }).unwrap();
      dispatch(clearCart());
      dispatch(clearUser());
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update cart. Please try again.",error.message);
    }
  };

  const handleProfileRedirect = () => {
    if (user.role === "admin") navigate("/admin");
    else navigate("/profile");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 800) setWidth(true);
      else setWidth(false);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">MyLogo</Link>
        </div>

        <div className="navbar-search">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search products..."
            className="search-input"
          />
          <button onClick={handleSearch} className="search-button">
            Search
          </button>
        </div>

        <ul ref={mobileMenuRef} className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
          {isMobileMenuOpen && (
            <>
              <li className="menu-icon" onClick={toggleMobileMenu}>
                <FaTimes />
              </li>
              <li onClick={toggleMobileMenu}>
                <Link to="/">Home</Link>
              </li>
              <li onClick={toggleMobileMenu}>
                <Link to="/about">About</Link>
              </li>
              <li onClick={toggleMobileMenu}>
                <Link to="/contact">Contact</Link>
              </li>
            </>
          )}
          <li>
            <Link to="/cart">
              <FiShoppingCart />
            </Link>
            {cartItems.length !== 0 && <Pill label={cartItems.length} />}
          </li>
          {!user ? (
            <>
              <li onClick={toggleMobileMenu}>
                <Link to="/login">Login</Link>
              </li>
              <li onClick={toggleMobileMenu}>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          ) : (
            <li onClick={toggleDropdown} style={{ position: "relative", cursor: "pointer", color: "white" }}>
              <FaRegUser style={{ color: "black", fontWeight: "600" }} />
              {dropdownOpen && (
                <ul style={{ position: "absolute", top: "100%", right: 0, backgroundColor: "#333", color: "white", listStyleType: "none", padding: "0.5rem", borderRadius: "8px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", minWidth: "120px", zIndex: 1000 }}>
                  <li onClick={handleProfileRedirect} style={{ cursor: "pointer", padding: "0.5rem", borderBottom: "1px solid rgba(255, 255, 255, 0.2)" }}>
                    Dashboard
                  </li>
                  <li onClick={logoutUser} style={{ cursor: "pointer", padding: "0.5rem", color: "#ff4d4d" }}>
                    Logout
                  </li>
                </ul>
              )}
            </li>
          )}
        </ul>
        
        {width && (
          <div className="menu-icon" onClick={toggleMobileMenu}>
            <FaBars />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
