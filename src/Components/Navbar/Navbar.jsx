import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { UserContext } from "../../Context/UserContext";
import { FaRegUser } from "react-icons/fa";

const Navbar = () => {
  const { user, logoutUser } = useContext(UserContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchItem, setSearchItem] = useState("");

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleSearchChange = (e) => {
    setSearchItem(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Search Item:", searchItem);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">MyLogo</Link>
        </div>
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            className="search-input"
            type="text"
            value={searchItem}
            onChange={handleSearchChange}
            placeholder="Search..."
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>
        <ul className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          {!user ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Signup</Link>
              </li>
            </>
          ) : (
            <>
              <li style={{color:"white",cursor:"pointer"}} onClick={()=>{logoutUser()}}>
                Logout
              </li>
              <li>
                <Link to="/profile">
                  <FaRegUser />
                </Link>
              </li>
            </>
          )}
        </ul>
        <div className="menu-icon" onClick={toggleMobileMenu}>
          <i className={`fas ${isMobileMenuOpen ? "fa-times" : "fa-bars"}`}></i>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
