import React, { useState } from "react";
import Image from "next/image";
import styles from "../../../styles/ProjectPortfolio.module.css";

export default function WorkingProject() {
  const [projects, setProjects] = useState([
    {
      name: "GT Shop E-commerce",
      description: "E_Commerce Project",
      technologies: ["React", "CSS", "JavaScript"],
      image: "/Image/gtshop.png",
      url: "https://gtshopltd.com/",
    },
    {
      name: "GT Shop E-commerce API",
      description: "GT Shop E Commerce API",
      technologies: ["Laravel"],
      image: "/Image/gtshop.png",
      url: "https://gtshopltd.com/",
    },
    {
        name: "GT Shop Loan Collection",
        description: "Loan collection apps for GTShop",
        technologies: ["React Native",'Redux'],
        image: "/Image/gtshop.png",
        url: "https://gtshopltd.com/",
      },
      {
        name: "GT Shop Customer mobile apps",
        description: "E Commerce mobile apps for GTShop",
        technologies: ["React Native",'Redux',],
        image: "/Image/gtshop.png",
        url: "https://gtshopltd.com/",
      },
      {
        name: "Mimmi Enterprise",
        description: "Mimmi shop ",
        technologies: ["Laravel"],
        image: "/Image/mimmi.png",
        url: "https://gtshopltd.com/",
      },
      {
        name: "Web Scrapping",
        description: "Web Scrapper ",
        technologies: ["Laravel","PHP"],
        image: "/Image/mimmi.png",
        url: "https://gtshopltd.com/",
      },
  ]);

  return (
    <>
      <div className={styles.projectPortfolio}>
        <h2>My Projects</h2>
        <div className={styles.projectList}>
          {projects.map((project, index) => (
            <div key={index} className={styles.projectItem}>
              <Image
                src={project.image}
                alt={project.name}
                width={300}
                height={200}
              />
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <ul>
                {project.technologies.map((technology, index) => (
                  <li key={index}>{technology}</li>
                ))}
              </ul>
              <a href={project.url}>View Project</a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
