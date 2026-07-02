import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import MyImage from "../../public/aa.jpg";
import styles from "@/styles/Home.module.css";
import Typewriter from "typewriter-effect";

const MainPage = () => {
  const [hintsText, setHintsText] = useState([
    "I am S M Turag",
    "I am developer",
  ]);
  const [loop, setLoop] = useState(0);
  useEffect(() => {
    console.log(loop);
  }, [loop]);
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box>
        <div className={styles.image_container}>
          <Image
            src={MyImage}
            className={styles.proImage}
            alt="Picture of the author"
          />
          <Box className={styles.text_container}>
            <h4>Welcome</h4>

            <h2>
              <Typewriter
                onInit={(typewriter) => {
                  typewriter
                    .typeString(hintsText[loop])
                    .callFunction(() => {
                      console.log("String typed out!");
                    })
                    .pauseFor(250)
                    .deleteAll()
                    .callFunction(() => {
                      console.log("All strings were deleted");
                      setLoop(1);
                    })
                    .start();
                }}
              />
            </h2>
          </Box>
        </div>
      </Box>
      <Box className={styles.about}>
        <Box className={styles.headLineContainer}>
        <h1 className={'upper'}>Upper H1 tag</h1>
        <h1 className={'center'}>Centered H1 tag</h1>
          <style jsx>{`
           .upper {
            position: absolute;
            top: 0;
            text-align: center;
            font-size:5rem;
            white-space: nowrap;
          }
          .center {
            text-align: center;
          }
          `}</style>
        

         
        </Box>
      </Box>
    </Box>
  );
};

export default MainPage;
