import React, { Component } from "react";
import { Box } from "@mui/material";
import CmpStyle from "@/styles/HeaderCmp.module.css";
import Slider from "react-slick";



export default function SlideShowCmp(props) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1
      };
  return (
    <Slider {...settings}>
      <div>
        <img src="https://via.placeholder.com/350x150" alt="Item 1" />
      </div>
      <div>
        <img src="https://via.placeholder.com/350x150" alt="Item 2" />
      </div>
      <div>
        <img src="https://via.placeholder.com/350x150" alt="Item 3" />
      </div>
      <div>
        <img src="https://via.placeholder.com/350x150" alt="Item 4" />
      </div>
      <div>
        <img src="https://via.placeholder.com/350x150" alt="Item 5" />
      </div>
    </Slider>
  );
}
