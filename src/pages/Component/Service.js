import React, { Component, useEffect, useState } from "react";
import { Grid } from "@mui/material";
import BoxContainer from "./BoxContainer";
import { WorkInfo } from "../../Data/Information";

export default function Service() {
  const [leftSlice, setLeftSlice] = useState([]);
  const [rightSlice, setRightSlice] = useState([]);

  useEffect(() => {
    const midPoint = Math.ceil(WorkInfo.length / 2);
    const leftArr = WorkInfo.slice(0, midPoint);
    const rightArr = WorkInfo.slice(midPoint);
    setLeftSlice(leftArr);
    setRightSlice(rightArr);
  }, [WorkInfo]);

  return (
    <Grid container direction={"row"}>
      <Grid item xs={12} md={6}>
        {leftSlice.map((item, index) => (
          <BoxContainer
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </Grid>
      <Grid item xs={12} md={6}>
        {rightSlice.map((item, index) => (
          <BoxContainer
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </Grid>
    </Grid>
  );
}
