import React, { Component } from "react";
import { Box } from "@mui/material";
import HeaderStyle from "@/styles/HeaderCmp.module.css";

export default function HeaderCmp(props) {
  return (
    <Box className={HeaderStyle.main}>
      <Box className={HeaderStyle.header}>
      <h1 className={HeaderStyle.down_text}>{props.downText} </h1>
      <h1 className={HeaderStyle.up_text}>{props.upText}</h1>
      </Box>
      <Box >
        {props.children}
      </Box>
    </Box>
  );
}
