import React, { Component } from "react";
import { Box } from "@mui/material";

export default function ShowCmp({ ...props }) {
  return (
    <>
    <Box sx={{ display: "flex", flexDirection: "row",justifyContent:'center',margin:'5px' }}>
      <p className="head">{props.title}: </p>
      <p className="info">{props.info}</p>
     
      <style jsx>
        {`
          .head {
            font-size: 2rem !important;
            font-family: Chivo Mono;
            align-items: center
          }
          .info{
            font-size: 2rem !important;
            text-align: center;
            font-family: Lobster !important;
          }
        `}
      </style>
    </Box>
    <hr />
    </>
  );
}
