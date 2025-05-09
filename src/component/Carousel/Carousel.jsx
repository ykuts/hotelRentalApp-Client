import { useEffect, useState } from "react";
import "./carousel.styles.scss";
// import { current } from "@reduxjs/toolkit";
const Carousel = ({ data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
    }, 5000);

      return () => clearInterval(interval);
  }, [data]);

  return (
    <div className="carousel-wrapper">
      <img src={data[currentIndex]} alt="rooms images" />
    </div>
  );
};

export default Carousel;
