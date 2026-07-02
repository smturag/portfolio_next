import React, { Component } from "react";
import { Box, Paper, Container, Grid } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import CmpStyle from "@/styles/HeaderCmp.module.css";

export default function SkillsLoadingCmp(props) {
  return (
    <Paper className={CmpStyle.loading_paper_container}>
      <h3 style={{ marginBottom: "5%" }}>{props.name}</h3>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <LinearProgress
          variant="determinate"
          value={props.percentage}
          style={{ height: "10px", width: "100%", padding: "2%" }}
        />
        <h3 style={{ marginLeft: "5%" }}>{props.percentage}%</h3>
      </Box>
    </Paper>
  );
}
