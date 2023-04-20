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
    "Information",
    ""
  ),
  InfoFunc(
    "2012-2014",
    'Science',
    'Rangpur Govt. College',
    "Information",
    ""
  ),
  InfoFunc(
    '2010-2012',
    'Science',
    'Gias Uddin High School',
    "Information",
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
    skillsFunc('HTML',10),
    skillsFunc('css',20),
    skillsFunc('JavaScript',30),
    skillsFunc('React',40),
    skillsFunc('Laravel',50),



  ]


  function WorkDescription(icon,title,description){
    return{
      icon,title,description
    }
  }

  const WorkInfo=[
    WorkDescription('icon1','Html', 'Html description'),
    WorkDescription('icon2','Html2', 'Html description2'),
    WorkDescription('icon3','Html3', 'Html description3'),
    WorkDescription('icon3','Html3', 'Html description3')


  ]

export {EducationItems,ExperienceItems,Check,skillsData,WorkInfo}