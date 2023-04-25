import React, { Component, useState } from "react";
import MyImage from "../../../public/aa.jpg";
import { Box, IconButton } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import LightModeIcon from "@mui/icons-material/LightMode";
import Typewriter from "typewriter-effect";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faFacebookF } from "@fortawesome/free-solid-svg-icons";
import download from "js-file-download";

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

  const fileName = "SM_Turag_Resume.pdf";
  const filePath = "/Image/Resume_SMTurag.pdf";

  const handleDownload = async () => {
    try {
      const response = await fetch(filePath);
      const blob = await response.blob();
      download(blob, fileName);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
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
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button
            onClick={handleDownload}
            style={{ padding: 10, borderRadius: 25, fontSize: 20 }}
          >
            Download CV
          </button>

         

          <IconButton onClick={toggleDarkMode} aria-label="delete">
            {darkMode ? <LightModeOutlinedIcon /> : <LightModeIcon />}
          </IconButton>
          {/* <FontAwesomeIcon icon={solid("facebook-f")} /> */}
          <FontAwesomeIcon icon={faFacebookF} />
        </Box>
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
