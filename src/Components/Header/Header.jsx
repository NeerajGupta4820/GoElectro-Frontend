import  { useState, useEffect } from 'react';
import "./Header.css"
import image1 from '../../assets/Images/home/header/image1.webp';
import image2 from '../../assets/Images/home/header/image2.webp';
import image3 from '../../assets/Images/home/header/image3.webp';
import image4 from '../../assets/Images/home/header/image4.webp';
import image5 from '../../assets/Images/home/header/image5.webp';
import image6 from '../../assets/Images/home/header/image6.webp';
import image7 from '../../assets/Images/home/header/image7.webp';
import image8 from '../../assets/Images/home/header/image8.webp';

const Header = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [image1, image2, image3, image4, image5, image6, image7, image8];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <section className="main-header">
            <div className="header-slider">
                {images.map((image, index) => (
                    <img
                        key={index} 
                        src={image}
                        alt={`Slide ${index + 1}`}
                        className={`header-image ${index === currentImageIndex ? "active" : ""}`} 
                    />
                ))}
            </div>
        </section>
    );
};

export default Header;
