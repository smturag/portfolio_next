import React, { Component, useState } from "react";
import MyImage from "../../../public/aa.jpg";
import { Box, IconButton } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import Typewriter from "typewriter-effect";
import Image from "next/image";
import styles from "@/styles/Home.module.css";

export default function IntroCmp() {
  const [darkMode, setDarkMode] = useState(false);
  const [titleList, setTitleList] = useState([
    "SM Turag.",
    "freelancer.",
    "developer",
  ]);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("dark-mode");
  };

  return (
    <Box className={styles.first_div}>
      <Box>
        <Image
          src={MyImage}
          className={styles.proImage}
          alt="Picture of the author"
        />
      </Box>
      <Box className={styles.button_container}>
        <IconButton onClick={toggleDarkMode} aria-label="delete">
          {darkMode ? <LightModeOutlinedIcon /> : <LightModeIcon />}
        </IconButton>
      </Box>
      <Box className={styles.text_container}>
        <Box>
          <h1 className={styles.welcome}>Welcome</h1>
        </Box>

        <Box
          sx={{
            display: "flex",
            direction: "row",
            justifyContent: "space-between",
            fontSize: "3vw",
          }}
        >
          <h1 className={styles.anim}> Hi, I Am </h1>
          <h1>
            <Typewriter
              options={{
                strings: titleList,
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
        </Box>
      </Box>
    </Box>
  );
}
