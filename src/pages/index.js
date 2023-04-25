import React, { Component, useState } from "react";
import Head from "next/head";
import { Box, Stack, IconButton, Grid } from "@mui/material";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Service from "./Component/Service";
import HeaderCmp from "./Component/HeaderCmp";
import AboutDetails from "./Component/AboutDetails";
import ResumeDetails from "./Component/ResumeDetails";
import IntroCmp from "./Component/IntroCmp";
import Working from '../pages/Component/Work_Directory/Working'

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>

      <main className={styles.main}>
        <Stack direction={"column"}>
          <Box>
            <IntroCmp />
          </Box>

          <Box>
            <HeaderCmp downText={"About Me "} upText={"Know Me More"}>
              <AboutDetails />
            </HeaderCmp>
          </Box>
          <Box className={styles.third_container}>
            <HeaderCmp downText={"SERVICE "} upText={"What I Do "}>
              <Box>
                <Service  />
              </Box>
            </HeaderCmp>
          </Box>
          <Box className={styles.resume_container}>
            <HeaderCmp downText={"Summary"} upText={"Resume"}>
              <ResumeDetails />
            </HeaderCmp>
          </Box>
          <Box className={styles.work_container}>
            <HeaderCmp
              downText={"Working History"}
              upText={"My Work"}
            >
              <Working/>
            </HeaderCmp>
          </Box>
        </Stack>
      </main>
    </>
  );
}

