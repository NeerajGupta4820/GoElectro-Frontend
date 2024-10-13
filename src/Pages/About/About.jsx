import React from "react";
import './About.css'

const About = () => {
  return (
    <div className="ffff">
      <div className="text-2xl text-center pt-8 border-t">
        <h1 className="">About Us</h1>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className="w-full md:max-w-[450px]" src="https://cdn.thewirecutter.com/wp-content/media/2024/07/laptopstopicpage-2048px-3685-2x1-1.jpg?width=2048&quality=75&crop=2:1&auto=webp" alt="" />
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
        <div className="border px-10 md:px-16 py-8 sm:py-10 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel
            laborum voluptatibus labore sequi earum ab distinctio, sunt magnam
            modi! Minus suscipit totam laborum sunt temporibus sequi itaque
            assumenda reprehenderit ratione?
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-10 flex flex-col gap-5">
          <b>Conviennce:</b>
          <p className="text-gray-600">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel
            laborum voluptatibus labore sequi earum ab distinctio, sunt magnam
            modi! Minus suscipit totam laborum sunt temporibus sequi itaque
            assumenda reprehenderit ratione?
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-10 flex flex-col gap-5">
            <b>Execptional Service: </b>
            <p className="text-gray-600">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel laborum voluptatibus labore sequi earum ab distinctio, sunt magnam modi! Minus suscipit totam laborum sunt temporibus sequi itaque assumenda reprehenderit ratione?</p>
        </div>

      </div>
    </div>
  );
};

export default About;
