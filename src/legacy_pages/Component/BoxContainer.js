import React, { Component } from "react";
import { Box, Grid, Avatar, Card, Paper } from "@mui/material";
import HomeStyle from "@/styles/Home.module.css";
import AddRoadIcon from "@mui/icons-material/AddRoad";
import { BorderColor } from "@mui/icons-material";

export default function BoxContainer(props) {
  return (
    <Grid
      container
      direction={"row"}
      wrap="nowrap"
      sx={{ justifyContent: "center" }}
      className={HomeStyle.box_container}
    >
      <Grid item>
        <Card className={HomeStyle.icon_container}>{props.icon}</Card>
      </Grid>
      <Grid item>
        <Grid container direction={"column"} sx={{ justifyContent: "center" }}>
          <Grid item>
            <p className={HomeStyle.headText}>{props.title}</p>
          </Grid>
          <Grid item>
            <p className={HomeStyle.detailsText}>{props.description}</p>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
