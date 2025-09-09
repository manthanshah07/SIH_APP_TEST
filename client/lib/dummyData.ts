export const QUIZ_QUESTIONS = [
  {
    q: "Which activity do you enjoy the most?",
    options: ["Reading & Writing", "Solving Math Problems", "Running a Small Business", "Exploring Nature", "Learning Computers"],
    weight: "arts",
  },
  {
    q: "What kind of school project do you prefer?",
    options: ["Writing an essay or story", "Building a model or solving experiments", "Creating a small business plan", "Field study or observations", "Coding a small app"],
    weight: "science",
  },
  {
    q: "Which of these would you pick as a hobby?",
    options: ["Sketching/Design", "Math puzzles", "Trading or budgeting games", "Bird watching or gardening", "Robotics/Programming"],
    weight: "vocational",
  },
  {
    q: "Which subject do you find most interesting?",
    options: ["History and Languages", "Physics and Chemistry", "Accountancy and Business Studies", "Earth & Life Sciences", "Computer Science"],
    weight: "science",
  },
  {
    q: "How do you prefer to solve problems?",
    options: ["Write and reflect", "Apply formulas and methods", "Negotiate and persuade", "Hands-on trial and error", "Break into steps and code"],
    weight: "commerce",
  },
  {
    q: "Which career appeals to you the most?",
    options: ["Journalist", "Research Scientist", "Entrepreneur", "Environmental Officer", "Software Developer"],
    weight: "arts",
  },
  {
    q: "What motivates you at work?",
    options: ["Creative expression", "Discovery and experiments", "Growing a business", "Practical impact", "Building useful tools"],
    weight: "commerce",
  },
  {
    q: "Which environment would you prefer?",
    options: ["Studio or newsroom", "Laboratory or campus", "Office with clients", "Outdoors or fieldwork", "Tech lab or startup"],
    weight: "vocational",
  },
  {
    q: "How do you like to learn new skills?",
    options: ["Reading and courses", "Structured classes with labs", "Workshops and internships", "Hands-on apprenticeships", "Online tutorials and projects"],
    weight: "arts",
  },
  {
    q: "What is your strength in teamwork?",
    options: ["Communicating ideas clearly", "Analysing data together", "Organising tasks and finance", "Coordinating practical tasks", "Coding or debugging collaboratively"],
    weight: "science",
  },
];

export const QUIZ_RESULT_MAP = {
  arts: ["B.A.", "Journalism", "Design"],
  science: ["B.Sc.", "Engineering", "Medical"],
  commerce: ["B.Com.", "BBA", "Economics"],
  vocational: ["Vocational/Skill-based courses", "ITI", "Diploma"],
};

export const MAPPING_DATA = [
  {
    degree: "B.A.",
    stream: "Arts",
    careers: [
      {
        name: "Teacher",
        avgSalary: "₹2.5L - ₹6L per year",
        higherStudy: ["M.A.", "B.Ed."],
        skills: ["Communication", "Subject knowledge", "Classroom management"],
      },
      {
        name: "Journalist",
        avgSalary: "₹3L - ₹8L per year",
        higherStudy: ["M.A. Journalism", "Mass Communication"] ,
        skills: ["Writing", "Research", "Interviewing"],
      },
      {
        name: "Social Worker",
        avgSalary: "₹2L - ₹5L per year",
        higherStudy: ["MSW", "MA Social Work"],
        skills: ["Counselling", "Empathy", "Community engagement"],
      },
    ],
  },
  {
    degree: "B.Sc.",
    stream: "Science",
    careers: [
      {
        name: "Research Scientist",
        avgSalary: "₹4L - ₹12L per year",
        higherStudy: ["M.Sc.", "Ph.D."],
        skills: ["Data analysis", "Lab techniques", "Critical thinking"],
      },
      {
        name: "Data Analyst",
        avgSalary: "₹3L - ₹10L per year",
        higherStudy: ["M.Sc. Data Science", "M.Stat."],
        skills: ["Statistics", "SQL", "Python"],
      },
      {
        name: "Healthcare Professional",
        avgSalary: "₹3L - ₹15L per year",
        higherStudy: ["MBBS", "B.Sc Nursing", "Allied Health Diplomas"],
        skills: ["Clinical skills", "Attention to detail", "Patient care"],
      },
    ],
  },
  {
    degree: "B.Com.",
    stream: "Commerce",
    careers: [
      {
        name: "Accountant",
        avgSalary: "₹2.5L - ₹6L per year",
        higherStudy: ["M.Com.", "CA (articles)"],
        skills: ["Accounting", "Excel", "Taxation basics"],
      },
      {
        name: "Financial Analyst",
        avgSalary: "₹4L - ₹10L per year",
        higherStudy: ["MBA Finance", "CFA"],
        skills: ["Finance", "Excel", "Analytical skills"],
      },
      {
        name: "Banker",
        avgSalary: "₹3L - ₹8L per year",
        higherStudy: ["MBA", "Certification courses in Banking"],
        skills: ["Customer service", "Risk assessment", "Basic accounting"],
      },
    ],
  },
  {
    degree: "BBA",
    stream: "Commerce",
    careers: [
      {
        name: "Business Manager",
        avgSalary: "₹4L - ₹12L per year",
        higherStudy: ["MBA", "Executive programs"],
        skills: ["Management", "Leadership", "Communication"],
      },
      {
        name: "Marketing Executive",
        avgSalary: "₹3L - ₹9L per year",
        higherStudy: ["MBA Marketing", "Certifications"],
        skills: ["Marketing", "Digital tools", "Creativity"],
      },
      {
        name: "Entrepreneur",
        avgSalary: "Varies widely",
        higherStudy: ["Startup accelerators", "Business courses"],
        skills: ["Risk-taking", "Planning", "Sales"],
      },
    ],
  },
];

export const COLLEGES = [
  {
    name: "Govt. College of Arts & Science, Mumbai",
    location: "Mumbai, Maharashtra",
    courses: ["B.A.", "B.Sc."],
    facilities: ["Library", "Hostel", "Internet"],
    cutoff: "65%",
    lat: 19.0760,
    lng: 72.8777,
    image: "/placeholder.svg",
  },
  {
    name: "Govt. Commerce College, Pune",
    location: "Pune, Maharashtra",
    courses: ["B.Com.", "BBA"],
    facilities: ["Library", "Internet"],
    cutoff: "70%",
    lat: 18.5204,
    lng: 73.8567,
    image: "/placeholder.svg",
  },
  {
    name: "State University, Nashik",
    location: "Nashik, Maharashtra",
    courses: ["B.Sc.", "B.Tech"],
    facilities: ["Hostel", "Library", "Internet"],
    cutoff: "75%",
    lat: 19.9975,
    lng: 73.7898,
    image: "/placeholder.svg",
  },
  {
    name: "District Women’s College, Nagpur",
    location: "Nagpur, Maharashtra",
    courses: ["B.A.", "B.Com."],
    facilities: ["Library", "Internet"],
    cutoff: "60%",
    lat: 21.1458,
    lng: 79.0882,
    image: "/placeholder.svg",
  },
  {
    name: "Govt. Polytechnic College, Kolhapur",
    location: "Kolhapur, Maharashtra",
    courses: ["Diploma - Mechanical", "Diploma - Electrical"],
    facilities: ["Workshops", "Internet"],
    cutoff: "55%",
    lat: 16.7046,
    lng: 74.2444,
    image: "/placeholder.svg",
  },
];

export const TIMELINE_EVENTS = [
  { title: "B.Sc. Admissions Open", date: new Date(2025, 5, 15) },
  { title: "Scholarship Application Deadline", date: new Date(2025, 5, 30) },
  { title: "Counseling Round 1", date: new Date(2025, 6, 10) },
  { title: "B.Com. Entrance Test", date: new Date(2025, 6, 20) },
  { title: "Engineering Cut-off Release", date: new Date(2025, 6, 25) },
  { title: "Scholarship Result Date", date: new Date(2025, 7, 1) },
];

export const STUDY_MATERIALS = {
  Arts: [
    { title: "Modern History Notes", desc: "Concise notes covering modern Indian history.", link: "https://example.com/arts-history.pdf", image: "/placeholder.svg" },
    { title: "English Grammar Guide", desc: "Grammar and writing practice PDF.", link: "https://example.com/english-grammar.pdf", image: "/placeholder.svg" },
  ],
  Science: [
    { title: "Physics Problem Book", desc: "Important numerical problems for Class 11-12.", link: "https://example.com/physics.pdf", image: "/placeholder.svg" },
    { title: "Organic Chemistry Notes", desc: "Key reactions and mechanisms.", link: "https://example.com/chemistry.pdf", image: "/placeholder.svg" },
  ],
  Commerce: [
    { title: "Introduction to Accountancy", desc: "Basics of accounting and ledgers.", link: "https://example.com/accountancy.pdf", image: "/placeholder.svg" },
    { title: "Microeconomics Essentials", desc: "Core microeconomics concepts for beginners.", link: "https://example.com/economics.pdf", image: "/placeholder.svg" },
  ],
  Vocational: [
    { title: "Automobile Repair Basics", desc: "Guide to basic automobile maintenance.", link: "https://example.com/auto.pdf", image: "/placeholder.svg" },
    { title: "Basic Electrical Work", desc: "Fundamentals of household electrical tasks.", link: "https://example.com/electrical.pdf", image: "/placeholder.svg" },
  ],
};

export const AI_RECOMMENDATIONS = {
  Arts: ["Journalism", "Civil Services", "Content Writing"],
  Science: ["Engineering", "Medical", "Research"],
  Commerce: ["Chartered Accountancy", "Banking", "Business Management"],
  Vocational: ["ITI Programs", "Diploma Courses", "Skill Development Programs"],
};

export const ADMIN_DATA = {
  colleges: [
    { id: 1, name: "Govt. College of Arts & Science, Mumbai", city: "Mumbai", courses: ["B.A.", "B.Sc."], updated: "2025-03-10" },
    { id: 2, name: "Govt. Commerce College, Pune", city: "Pune", courses: ["B.Com.", "BBA"], updated: "2025-02-18" },
    { id: 3, name: "State University, Nashik", city: "Nashik", courses: ["B.Sc.", "B.Tech"], updated: "2025-04-01" },
  ],
  events: [
    { id: 1, title: "B.Sc. Admissions Open", date: "2025-06-15" },
    { id: 2, title: "Scholarship Application Deadline", date: "2025-06-30" },
  ],
  materials: [
    { id: 1, title: "Physics Problem Book", stream: "Science", link: "https://example.com/physics.pdf" },
    { id: 2, title: "English Grammar Guide", stream: "Arts", link: "https://example.com/english-grammar.pdf" },
  ],
};
