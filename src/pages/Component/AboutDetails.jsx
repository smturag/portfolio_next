import React, { Component } from "react";
import styles from "@/styles/Home.module.css";
import ShowCmp from "./ShowCmp";
import { Box, Grid } from "@mui/material";

export default function AboutDetails() {

    
  return (
    <Box className={styles.info_container}>
      <Grid container direction={"row"}>
        <Grid xs={12} sm={12} lg={7} item>
          <Box sx={{ padding: "25px" }}>
            <h2 className="details">
              I'm Simone Olivia, a Web Developer I help you build brand for your
              business at an affordable price. Thousands of clients have
              procured exceptional results while working with our dedicated
              team. when an unknown printer took a galley of type and scrambled
              it to make a type specimen book. Delivering work within time and
              budget which meets client’s requirements is our moto. Lorem Ipsum
              has been the industry's standard dummy text ever when an unknown
              printer took a galley.
            </h2>
            <style jsx>
              {`
                .details {
                  font-family: Monospace;
                  margin-bottom: 10px;
                }
              `}
            </style>
          </Box>
        </Grid>
        <Grid xs={12} sm={12} lg={5} item>
          <Box sx={{ paddingLeft: "50px", paddingRight: "50px" }}>
            <ShowCmp title={"Name"} info={"S M Turag"} />
            <ShowCmp title={"Email:"} info={"turag.shagor01@gmail.com"} />
            <ShowCmp title={"From"} info={"Dhaka Bangladesh"} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
