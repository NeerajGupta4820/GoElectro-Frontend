import "./Footer.css";
import logo from "../../assets/Images/Logo/Logo.webp";
import { FaRegEnvelope, FaArrowRight,FaFacebookF, FaTwitter,FaWhatsapp,FaPinterestP } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="f-row">
        <div className="f-col">
          <img src={logo} alt="logo" className="f-logo" />
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            veniam numquam maxime inventore sunt tempora quaerat aut temporibus
            in facilis veritatis illum perferendis cum magni, laudantium at.
            Magnam, asperiores accusantium!
          </p>
        </div>
        <div className="f-col">
          <h3>Office
            <div className="underline">
              <span></span>
            </div>
          </h3>
          <p>ITPL Road</p>
          <p>Whitefield, Banglore</p>
          <p>Karnataka, PIN 124103m iNDIA</p>
          <p className="email-id">lasfjls@gmail.com</p>
          <h4>+91-9999999999</h4>
        </div>
        <div className="f-col">
          <h3>Links<div className="underline">
              <span></span>
            </div></h3>
          <ul>
            <li>
              <a href=""></a></li>
              <li><a href="">Home</a></li>
              <li><a href="">About</a></li>
              <li><a href="">All Products</a></li>
              <li><a href="">Contact</a></li>
          </ul>
        </div>
        <div className="f-col">
          <h3>NewsLetter<div className="underline">
              <span></span>
            </div></h3>
          <form action="">
          <FaRegEnvelope />
            <input type="email" placeholder="Enter your Email" />
            <button type="submit"><FaArrowRight/></button>
          </form>
          <div className="social-icon">
            <FaFacebookF/>
            <FaTwitter/>
            <FaWhatsapp/>
            <FaPinterestP/>
          </div>
        </div>
      </div>
      <hr />
      <p>Developed by Sanjeev and Neeraj</p>
    </footer>
  );
};

export default Footer;
