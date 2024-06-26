import React, { useState } from "react";
import { Button, CardMedia } from "@mui/material";
import { MdArrowRight, MdArrowLeft } from "react-icons/md";
const ImageSlider = ({ item }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? item.images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const isLastSlide = currentIndex === item.images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  return (
    <div style={{ position: "relative" }}>
      <CardMedia
        key={item.images[currentIndex]?.url}
        component="img"
        height="194"
        src={item.images[currentIndex]?.url}
        alt="Paella dish"
      />
      <div onClick={prevSlide} className="my-custom-class1">
        <MdArrowLeft size={40} />
      </div>
      <div onClick={nextSlide} className="my-custom-class ">
        <MdArrowRight size={40} />
      </div>
    </div>
  );
};

export default ImageSlider;
