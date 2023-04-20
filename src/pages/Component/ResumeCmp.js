import React, { Component } from "react";
import { Paper, Box, Chip } from "@mui/material";
import CmpStyle from "@/styles/HeaderCmp.module.css";

export default function ResumeCmp(props) {
  return (
    <Paper elevation={24} className={CmpStyle.paper_container}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Chip
          label={props.year}
          sx={{ width: "30%", backgroundColor: "#67CB98" }}
        />
        <h2>{props.background}</h2>
        <h3>{props.work}</h3>
        <h3>{props.institute}</h3>
        <p>{props.info}</p>
      </Box>
    </Paper>
  );
}
