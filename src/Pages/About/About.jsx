import PropTypes from "prop-types";
import { useState } from "react";
import img1 from "../../assets/Images/about/1.png";
import img2 from "../../assets/Images/about/2.jpg";
import img3 from "../../assets/Images/about/About Us.webp";
import img4 from "../../assets/Images/about/Conviennce.webp";
import img5 from "../../assets/Images/about/Execptional Service.webp";
import img6 from "../../assets/Images/about/Quality Assurance.webp";
import "./About.css";
const stories = [
  {
    title: "The journey to relaxation.",
    description:
      "Finding a hammock you can truly relax in didn’t happen overnight. It started with a chance discovery while on vacation, and took a lot of hard work (and a lot of hanging around) to bring the softest, most comfortable, and thoughtfully crafted hammocks to your backyard.",
    image: img1,
  },
  {
    title: "The way to heaven.",
    description:
      "More off this less hello salamander lied porpoise much over tightly circa horse taped so innocuously outside crud mightily rigorous negative one inside gorilla and drew humbly shot tortoise inside opaquely. Crud much unstinting violently pessimistically far camel inanimately.",
    image: img2,
  },
];

const StoryItem = ({ item, index }) => {
  const { title, description, image } = item;
  return (
    <>
      <div className={`col-12 md-col-5 ${index % 2 === 0 ? "order-lg-2" : ""}`}>
        <div className={`story-text ${index % 2 === 0 ? "pl-lg" : "pr-lg"}`}>
          <h4 className="story-title">{title}</h4>
          <p className="story-description">{description}</p>
        </div>
      </div>
      <div className={`col-12 md-col-5 ${index % 2 === 0 ? "" : "order-lg-2"}`}>
        <div className="story-image-wrapper">
          <img src={image} alt={title} className="story-image" />
        </div>
      </div>
    </>
  );
};

StoryItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};
const About = () => {
  const [clickedDiv, setClickedDiv] = useState(null);

  const handleDivClick = (index) => {
    if (clickedDiv === index) {
      setClickedDiv(null);
    } else {
      setClickedDiv(index);
    }
  };
  return (
    <div className="ffff">
      <div className="text-2xl text-center pt-8 border-t">
        <h1 className="">About Us</h1>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full md:max-w-[450px]" src={img3} alt="" />
        <div className="flex flex-col justify-center gap-6 md:wd-2/4">
          <p className="">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo odit
            alias tenetur, quidem dolorem sit commodi illum deserunt impedit, at
            ullam. Corrupti dolorum magni sapiente est dignissimos fugit quos
            rerum.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod at
            voluptas facilis est unde magnam vero odit! Doloribus, nihil dolor,
            nemo numquam harum cum, laboriosam dolores quisquam sint libero
            delectus.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
            magni quibusdam ea voluptas iste voluptates illo quo distinctio
            facilis alias officiis at inventore sequi similique aut accusantium
            ex suscipit animi.
          </p>
        </div>
      </div>

      <div className="text-xl py-4">
        <h1>Why Choose Us</h1>
      </div>

      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="flex flex-col md:flex-row text-sm mb-20 equal-width-container">
          {[
            {
              title: "Quality Assurance:",
              image: img4,
              description:
                " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti, iste voluptates illo quo distinctio facilis alias officiis at inventore sequi similique aut accusantium ex suscipit animi.",
            },
            {
              title: "Convenience:",
              image: img5,
              description:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti, iste voluptates illo quo distinctio facilis alias officiis at inventore sequi similique aut accusantium ex suscipit animi.",
            },
            {
              title: "Exceptional Service:",
              image: img6,
              description:
                " Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti, iste voluptates illo quo distinctio facilis alias officiis at inventore sequi similique aut accusantium ex suscipit animi.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="equal-width-item border px-10 md:px-16 py-8 sm:py-10 flex flex-col gap-5"
              onClick={() => handleDivClick(index)}
              style={{ cursor: "pointer" }}
            >
              {clickedDiv === index ? (
                <h2 className="text-gray-600">{item.description}</h2>
              ) : (
                <>
                  <img
                    className="w-full md:max-w-[45px]"
                    src={item.image}
                    alt={item.title}
                  />
                  <h2 className="clicked-text">{item.title}</h2>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
      <section className="about-section">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Story</h2>
            <p className="section-description">
              We not only make the world’s most comfortable hammocks, but
              through training and sustainable job creation, we empower our
              weavers and their families to break the cycle of poverty and build
              a brighter future.
            </p>
          </div>

          {stories.map((item, i) => (
            <div className="row align-items-center story-row" key={i}>
              <StoryItem item={item} index={i + 1} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
