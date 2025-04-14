import { IconType } from "react-icons";
import {
  SiNeo4J,
  SiSelenium,
  SiPagerduty,
  SiOracle,
  SiPython,
  SiWordpress,
  SiCisco,
  SiOpenjdk,
  SiAtlassian,
  SiClickup,
  SiLinkedin,
  SiHackerrank
} from "react-icons/si";
import {
  BsFillKanbanFill,
  BsBook,
  BsAward,
  BsGraphUp,
  BsBuilding,
  BsWindow,
} from "react-icons/bs";

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
  skills: string[];
  detailsUrl: string;
  icon: IconType;
};

export const certifications: Certification[] = [
  // Existing certifications...

  {
    id: "hr-csharp-2023",
    title: "C# (Basic) Certificate",
    issuer: "HackerRank",
    date: "May 2023",
    description: "Certification demonstrating fundamental knowledge and proficiency in C# programming.",
    skills: ["C#", "Programming", "Object-Oriented Programming"],
    detailsUrl: "https://www.linkedin.com/in/chandacharanreddy/details/certifications/",
    icon: SiHackerrank, // Choose an appropriate icon
  },
  {
    id: "matlab-certified-2023",
    title: "MATLAB Certified",
    issuer: "MathWorks",
    date: "June 2023",
    description: "Certification in MATLAB, focusing on data analysis, visualization, and mathematical computing.",
    skills: ["MATLAB", "Data Analysis", "Mathematical Modeling"],
    detailsUrl: "https://www.linkedin.com/in/chandacharanreddy/details/certifications/",
    icon: SiOracle, // Choose an appropriate icon
  },
  {
    id: "intro-cybersecurity-2023",
    title: "Introduction to Cyber Security",
    issuer: "Cisco",
    date: "June 2023",
    description: "Fundamentals of cybersecurity concepts, strategies, and defense mechanisms in a digital world.",
    skills: ["Cyber Security", "Networking", "Risk Management"],
    detailsUrl: "https://www.linkedin.com/in/chandacharanreddy/details/certifications/",
    icon: SiCisco,
  },
  {
    id: "generative-ai-2023",
    title: "What Is Generative AI?",
    issuer: "LinkedIn",
    date: "July 2023",
    description: "Certification exploring generative AI techniques, including machine learning and neural networks.",
    skills: ["Generative AI", "Machine Learning", "Artificial Intelligence"],
    detailsUrl: "https://www.linkedin.com/in/chandacharanreddy/details/certifications/",
    icon: SiLinkedin, // Choose an appropriate icon
  },
  {
    id: "python-101-ibm-2023",
    title: "Python 101 by IBM",
    issuer: "IBM",
    date: "July 2023",
    description: "Introduction to Python programming, covering syntax, data structures, and basic algorithms.",
    skills: ["Python", "Programming", "Data Structures"],
    detailsUrl: "https://www.linkedin.com/in/chandacharanreddy/details/certifications/",
    icon: SiPython,
  },
  {
    id: "intro-cloud-ibm-2023",
    title: "Introduction to Cloud",
    issuer: "IBM",
    date: "July 2023",
    description: "Certification introducing cloud computing concepts, platforms, and services.",
    skills: ["Cloud Computing", "IBM Cloud", "Cloud Infrastructure"],
    detailsUrl: "https://www.linkedin.com/in/chandacharanreddy/details/certifications/",
    icon: SiOpenjdk, // Choose an appropriate icon
  },
  {
    id: "generative-ai-evolution-2023",
    title: "Generative AI: The Evolution of Thoughtful Online Search",
    issuer: "LinkedIn",
    date: "July 2023",
    description: "Certification covering the evolution of AI technologies and their impact on search engines and content generation.",
    skills: ["Generative AI", "AI Trends", "Search Algorithms"],
    detailsUrl: "https://www.linkedin.com/in/chandacharanreddy/details/certifications/",
    icon: SiLinkedin, // Choose an appropriate icon
  },
  {
    id: "data-science-101-ibm-2023",
    title: "Data Science 101 by IBM",
    issuer: "IBM",
    date: "July 2023",
    description: "Certification in data science, including statistical analysis, data visualization, and machine learning fundamentals.",
    skills: ["Data Science", "Machine Learning", "Statistics"],
    detailsUrl: "https://www.linkedin.com/in/chandacharanreddy/details/certifications/",
    icon: SiPython,
  },
  {
    id: "sql-relational-2023",
    title: "SQL and Relational Databases 101",
    issuer: "Cognitive Class",
    date: "August 2023",
    description: "Introduction to SQL and relational databases, covering queries, joins, and data manipulation.",
    skills: ["SQL", "Databases", "Relational Databases"],
    detailsUrl: "https://www.linkedin.com/in/chandacharanreddy/details/certifications/",
    icon: SiOracle,
  },
  {
    id: "nosql-db-2023",
    title: "NoSQL and DBaaS 101",
    issuer: "Cognitive Class",
    date: "October 2023",
    description: "Certification on NoSQL databases and Database-as-a-Service concepts for modern data architectures.",
    skills: ["NoSQL", "Database as a Service", "Data Management"],
    detailsUrl: "https://www.linkedin.com/in/chandacharanreddy/details/certifications/",
    icon: SiNeo4J,
  },
  {
    id: "accenture-data-analytics-2024",
    title: "Accenture - Data Analytics and Visualization Job Simulation",
    issuer: "Accenture",
    date: "March 2024",
    description: "Certification in data analytics and visualization techniques using real-world job simulation scenarios.",
    skills: ["Data Analytics", "Data Visualization", "Business Intelligence"],
    detailsUrl: "https://www.linkedin.com/in/chandacharanreddy/details/certifications/",
    icon: BsGraphUp,
  },
  {
    id: "intro-data-science-cisco-2024",
    title: "Introduction to Data Science",
    issuer: "Cisco",
    date: "June 2024",
    description: "Fundamentals of data science, focusing on data collection, analysis, and interpretation.",
    skills: ["Data Science", "Data Analysis", "Data Processing"],
    detailsUrl: "https://www.linkedin.com/in/chandacharanreddy/details/certifications/",
    icon: BsWindow,
  },
  {
    id: "advanced-cybersecurity-2024",
    title: "Advanced Cyber Security Threats and Governance",
    issuer: "Great Learning",
    date: "June 2024",
    description: "In-depth study of advanced cybersecurity threats, governance frameworks, and defense strategies.",
    skills: ["Cyber Security", "Risk Management", "Governance"],
    detailsUrl: "https://www.linkedin.com/in/chandacharanreddy/details/certifications/",
    icon: BsAward,
  },
  {
    id: "clickup-novice-2024",
    title: "ClickUp Novice Certificate of Completion",
    issuer: "ClickUp",
    date: "July 2024",
    description: "Certification demonstrating proficiency in ClickUp task management and project tracking.",
    skills: ["ClickUp", "Project Management", "Task Management"],
    detailsUrl: "https://www.linkedin.com/in/chandacharanreddy/details/certifications/",
    icon: SiClickup, // ClickUp icon
  },  
  {
    id: "networking-basics-cisco-2024",
    title: "Networking Basics",
    issuer: "Cisco",
    date: "September 2024",
    description: "Certification in fundamental networking concepts, including network configurations and protocols.",
    skills: ["Networking", "Network Protocols", "Cisco"],
    detailsUrl: "https://www.linkedin.com/in/chandacharanreddy/details/certifications/",
    icon: SiCisco,
  },
  {
    id: "intro-iot-nptel-2024",
    title: "Introduction to Internet of Things",
    issuer: "NPTEL",
    date: "October 2024",
    description: "Introduction to IoT, covering sensors, devices, and connectivity for building IoT systems.",
    skills: ["IoT", "Sensors", "Connectivity"],
    detailsUrl: "https://www.linkedin.com/in/chandacharanreddy/details/certifications/",
    icon: BsBuilding,
  },
  {
    id: "iot-intro-cisco-2024",
    title: "Introduction to IoT",
    issuer: "Cisco",
    date: "December 2024",
    description: "Introduction to the Internet of Things, focusing on technologies and solutions in IoT.",
    skills: ["IoT", "Networking", "Technology Solutions"],
    detailsUrl: "https://www.linkedin.com/in/chandacharanreddy/details/certifications/",
    icon: SiCisco,
  },
  {
    id: "kafka-data-pipelines-2025",
    title: "Simplifying Data Pipelines with Apache Kafka",
    issuer: "Cognitive Class",
    date: "February 2025",
    description: "Certification on building scalable and efficient data pipelines using Apache Kafka.",
    skills: ["Apache Kafka", "Data Pipelines", "Stream Processing"],
    detailsUrl: "https://www.linkedin.com/in/chandacharanreddy/details/certifications/",
    icon: SiNeo4J,
  },
  {
    id: "celonis-process-mining-2025",
    title: "Academic Process Mining Fundamentals",
    issuer: "Celonis",
    date: "March 2025",
    description: "Certification on process mining fundamentals, focusing on data-driven process improvement.",
    skills: ["Process Mining", "Data Analysis", "Business Process Optimization"],
    detailsUrl: "https://www.linkedin.com/in/chandacharanreddy/details/certifications/",
    icon: BsBook,
  },
];


export default certifications;
