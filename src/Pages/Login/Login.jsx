import { useState, useEffect } from "react";
import { useLoginUserMutation } from "../../redux/api/userAPI.js";
import loginImage from "../../assets/Images/login/img.webp";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setUser } from "../../redux/slices/userSlice";
import { setCartData } from "../../redux/slices/cartSlice";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginUser, { isLoading }] = useLoginUserMutation();

  useEffect(() => {
    const emailInput = document.getElementById("email");
    if (emailInput) {
      emailInput.focus();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email.");
      return;
    }

    try {
      const result = await loginUser({ email, password }).unwrap();
      console.log(result);
      if ("result:",result.success) {
        const { token, user, cart} = result;

        dispatch(setUser({ user, token }));
        dispatch(setCartData({cart}));
        localStorage.setItem("cartData", JSON.stringify(cart));

        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          draggable: true,
          theme: "dark",
        });

        navigate("/");
      }
    } catch (error) {
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

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleGoogleLogin = () => {
    console.log("Login with Google");
  };

  return (
    <div className="login-page">
      <div className="image-container">
        <img src={loginImage} alt="Login" />
      </div>
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
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
