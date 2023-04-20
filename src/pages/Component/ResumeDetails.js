import React, { Component, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { EducationItems, ExperienceItems } from "../Data/Information";
import ResumeCmp from "./ResumeCmp";
import SkillsContainer from "./SkillsContainer";

export default function ResumeDetails() {

  return (
    <Grid container direction={"column"} sx={{ justifyContent: "center" }}>
      <Grid item>
        <Grid
          container
          spacing={10}
          direction={"row"}
          sx={{ justifyContent: "center" }}
        >
          <Grid item>
            <h1>Educational Information</h1>
            <Grid
              container
              spacing={2}
              direction={"column"}
              sx={{ marginTop: "10px" }}
            >
              {EducationItems.map((item, index) => (
                <Grid item key={index}>
                  <ResumeCmp
                    year={item.year}
                    background={item.background}
                    info={item.info}
                    institute={item.institute}
                    work={item.Work_on}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item>
            <h1> My Experience</h1>
            <Grid
              container
              spacing={2}
              direction={"column"}
              sx={{ marginTop: "10px" }}
            >
              {ExperienceItems.map((item, index) => (
                <Grid item key={index}>
                  <ResumeCmp
                    year={item.year}
                    background={item.background}
                    info={item.info}
                    institute={item.institute}
                    work={item.Work_on}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <style jsx>
            {`
              h1 {
                text-decoration: underline;
              }
            `}
          </style>
        </Grid>
      </Grid>
      <Grid item sx={{ marginTop: "5%" }}>
        <SkillsContainer />
      </Grid>
    </Grid>
  );
}
