import React, { Component, useEffect, useState } from "react";
import { Box, paper, LinearProgress, Container, Grid } from "@mui/material";
import { skillsData } from "../../Data/Information";
import SkillsLoadingCmp from "./SkillsLoadingCmp";

export default function SkillsContainer(props) {
  const [leftSlice, setLeftSlice] = useState([]);
  const [rightSlice, setRightSlice] = useState([]);

  useEffect(() => {
    const midPoint = Math.ceil(skillsData.length / 2);
    setLeftSlice(skillsData.slice(0, midPoint));
    setRightSlice(skillsData.slice(midPoint));
  }, [skillsData]);

  return (
    <Box>
      <h1
        style={{
          textAlign: "center",
          padding: "15px",
          textDecoration: "underline",
        }}
      >
        My Skills
      </h1>
      <Box>
        <Grid
          container
          spacing={15}
          direction={"row"}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Grid item>
            <Grid spacing={5} container direction={"column"}>
              {leftSlice.map((item, index) => (
                <Grid item key={index}>
                  <SkillsLoadingCmp
                    name={item.name}
                    percentage={item.percent}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item>
            {" "}
            <Grid container spacing={5} direction={"column"}>
              {rightSlice.map((item, index) => (
                <Grid item key={index}>
                  <SkillsLoadingCmp
                    name={item.name}
                    percentage={item.percent}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
