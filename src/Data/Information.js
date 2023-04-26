const InfoFunc = (year, background, institute, info,Work_on) => {
  return {
    year,
    background,
    institute,
    info,
    Work_on

  };
};
const EducationItems = [
  InfoFunc(
    "2016-2020",
    "Computer Science & Engineering",
    "Daffodil international University",
    "Dhaka",
    ""
  ),
  InfoFunc(
    "2012-2014",
    'Science',
    'Rangpur Govt. College',
    "Rangpur",
    ""
  ),
  InfoFunc(
    '2010-2012',
    'Science',
    'Gias Uddin High School',
    "Lalmonirhat",
    ""

  )
];

const ExperienceItems = [
    InfoFunc(
      "2022/05 - 2022/09",
      "Web Developer intern",
      "Bitbytesoft Ltd",
      "Finland",
      "Laravel"
    ),
    InfoFunc(
      "2022/09 - Current",
      'Web & Apps developer ',
      'IT Deal Software Ltd',
      "Rangpur",
      "React,Laravel,React Native"
    ),
   
  ];

  const Check = [1,2,3,4,5,6,7,8]

  const skillsFunc=(name,percent)=>{
    return{name,percent}
  }

  const skillsData = [
    skillsFunc('Web Design',80),
    skillsFunc('JavaScript',80),
    skillsFunc('HTML/CSS',90),
    skillsFunc('React JS',85),
    skillsFunc('React Native',80),
    skillsFunc('Laravel',70),
    skillsFunc('Next JS',80),
    skillsFunc('Express JS',80),






  ]


  function WorkDescription(icon,title,description){
    return{
      icon,title,description
    }
  }

  const WorkInfo=[
    WorkDescription('Web','Web Designing', 'React, Laravel, React Native', 'Next'),
    WorkDescription('Android','Android', 'React Native'),
    WorkDescription('Backend','Backend', 'Next , Laravel, Express JS' ),
    WorkDescription('Scrapping','Scrapping', 'PHP , JavaScript')


  ]

export  {EducationItems,ExperienceItems,Check,skillsData,WorkInfo}