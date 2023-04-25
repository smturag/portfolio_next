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
              business at an affordable price. Full Stack Web Developer
              specializing in front end & backend development. Experienced with
              all stages of the development cycle for dynamic web projects.
              Well-versed in numerous programming languages including HTML5, PHP
              OOP, JavaScript, CSS, MySQL. Strong background in project
              management and customer relations.
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
