import  { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import loginImage from "../../assets/Images/login/img.webp";
import { toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../../Context/UserContext";

const Login = () => {
  const {user,loginUser} = useContext(UserContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);
    try {
      if (!formData.email || !formData.password) {
        toast("⚠️ All fields are mandatory", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          draggable: true,
          theme: "dark",
        });
        return;
      }

      const res = await axios.post(`${import.meta.env.REACT_APP_BASE_URL}/api/user/login`, {
        email: formData.email,
        password: formData.password,
      });

      toast.success("Login successful!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        draggable: true,
        theme: "dark",
      });
      loginUser(res.data.user,res.data.token);
      navigate("/");
      
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);

      toast.error(
        `❌ Login failed: ${error.response?.data?.message || error.message}`,
        {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          theme: "dark",
        }
      );
    }
  };

  const handleGoogleLogin = () => {
    console.log("Login with Google");
  };

  useEffect(()=>{
    console.log(user);
    if(user){
      return navigate("/");
    }
  },[]);

  return (
    <div className="login-page">
      <div className="image-container">
        <img src={loginImage} alt="Login" />
      </div>
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Login</button>
          <button className="google-login" onClick={handleGoogleLogin}>
            <FcGoogle /> <span>Sign in with Google</span>
          </button>
        </form>
        <div className="links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <span> | </span>
          <Link to="/signup">Signup</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
