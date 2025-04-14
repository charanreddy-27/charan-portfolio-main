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
  {
    id: "lt-data-analytics-2023",
    title: "Programming For Data Analytics",
    issuer: "L&T Technology Services",
    date: "November 2023",
    description: "Certification in Python, Pandas, and data analytics.",
    skills: ["Python", "NumPy", "Data Analysis", "Pandas"],
    detailsUrl:
      "https://www.linkedin.com/in/george-bobby/details/certifications/",
    icon: SiPython,
  },
  {
    id: "udemy-wordpress-2023",
    title: "Complete WordPress Website Developer Course",
    issuer: "Udemy",
    date: "October 2023",
    description: "Certification in WordPress development and SEO strategies.",
    skills: ["WordPress", "Web Development", "SEO Audits"],
    detailsUrl:
      "https://www.linkedin.com/in/george-bobby/details/certifications/",
    icon: SiWordpress,
  },
  {
    id: "cisco-networking-2023",
    title: "Cisco Networking Basics",
    issuer: "Cisco",
    date: "September 2023",
    description:
      "Certification in networking fundamentals and Cisco Packet Tracer.",
    skills: ["Packet Tracer", "Cloud Computing", "Cisco Networking"],
    detailsUrl:
      "https://www.linkedin.com/in/george-bobby/details/certifications/",
    icon: SiCisco,
  },
  {
    id: "microsoft-ai-2024",
    title: "Career Essentials in Generative AI",
    issuer: "Microsoft & LinkedIn",
    date: "July 2024",
    description:
      "Certification covering NLP, Generative AI, and Artificial Intelligence.",
    skills: ["NLP", "Generative AI", "Artificial Intelligence"],
    detailsUrl:
      "https://www.linkedin.com/in/george-bobby/details/certifications/",
    icon: BsWindow,
  },
  {
    id: "snovio-sales-2024",
    title: "From Lead Generation to Closing Deals",
    issuer: "Snov.io",
    date: "June 2024",
    description: "Certification in lead generation and product marketing.",
    skills: ["Social Media Marketing", "Product Marketing", "Market Research"],
    detailsUrl:
      "https://www.linkedin.com/in/george-bobby/details/certifications/",
    icon: BsGraphUp,
  },
  {
    id: "nestle-entrepreneurship-2024",
    title: "Idea Generation & Successful Entrepreneurship",
    issuer: "Nestlé",
    date: "April 2024",
    description:
      "Certification covering entrepreneurship, communication, and project management.",
    skills: ["Entrepreneurship", "Project Management", "Public Speaking"],
    detailsUrl:
      "https://www.linkedin.com/in/george-bobby/details/certifications/",
    icon: BsBuilding,
  },
  {
    id: "aha-product-mgmt-2024",
    title: "Aha! Product Management Certification",
    issuer: "Aha!",
    date: "September 2024",
    description:
      "Product management certification covering product strategies and development.",
    skills: ["Product Strategies", "Product Management", "Product Development"],
    detailsUrl:
      "https://www.linkedin.com/in/george-bobby/details/certifications/",
    icon: BsFillKanbanFill,
  },
  {
    id: "atlassian-agile-2024",
    title: "Atlassian Agile Project Management Certification",
    issuer: "Atlassian",
    date: "September 2024",
    description:
      "Certification in Agile methodologies, Jira, and project management.",
    skills: ["Project Management", "Jira", "Product Development"],
    detailsUrl:
      "https://www.linkedin.com/in/george-bobby/details/certifications/",
    icon: SiAtlassian,
  },
  {
    id: "clickup-expert-2024",
    title: "ClickUp Expert Certification",
    issuer: "ClickUp",
    date: "September 2024",
    description: "Certification in ClickUp product management strategies.",
    skills: ["Product Strategies", "ClickUp", "Product Management"],
    detailsUrl:
      "https://www.linkedin.com/in/george-bobby/details/certifications/",
    icon: SiClickup,
  },
  {
    id: "iiba-product-mgmt-2024",
    title: "Product Management First Steps",
    issuer: "IIBA Mumbai Chapter",
    date: "May 2024",
    description:
      "Introductory certification in product management and marketing.",
    skills: ["Product Strategies", "Project Management", "Product Management"],
    detailsUrl:
      "https://www.linkedin.com/in/george-bobby/details/certifications/",
    icon: BsBook,
  },
  {
    id: "nptel-project-mgmt-2024",
    title: "Project Management Certification NPTEL",
    issuer: "NPTEL",
    date: "April 2024",
    description: "Certification covering project management fundamentals.",
    skills: [
      "Project Management",
      "Agile Methodologies",
      "Product Development",
    ],
    detailsUrl:
      "https://www.linkedin.com/in/george-bobby/details/certifications/",
    icon: BsAward,
  },
  {
    id: "neo4j-2024",
    title: "Neo4j Database Certified Professional",
    issuer: "Neo4j",
    date: "December 2024",
    description: "Certification in Graph Databases, RAG, and Data Analysis.",
    skills: [
      "Data Analysis",
      "Graph Databases",
      "Retrieval-Augmented Generation (RAG)",
    ],
    detailsUrl:
      "https://www.linkedin.com/in/george-bobby/details/certifications/",
    icon: SiNeo4J,
  },
  {
    id: "lambdatest-automation-2024",
    title: "LambdaTest Test Automation Certification",
    issuer: "LambdaTest",
    date: "September 2024",
    description: "Certification in test automation using Selenium.",
    skills: ["Selenium", "Test Automation", "Software Testing"],
    detailsUrl:
      "https://www.linkedin.com/in/george-bobby/details/certifications/",
    icon: SiSelenium,
  },
  {
    id: "pagerduty-devops-2024",
    title: "PagerDuty DevOps Professional Certification",
    issuer: "PagerDuty",
    date: "September 2024",
    description:
      "Certification in CI/CD, Infrastructure as Code, and DevOps practices.",
    skills: ["CI/CD", "Infrastructure as Code", "DevOps"],
    detailsUrl:
      "https://www.linkedin.com/in/george-bobby/details/certifications/",
    icon: SiPagerduty,
  },
  {
    id: "oracle-java-2024",
    title: "Java Programming Oracle Academy",
    issuer: "Oracle",
    date: "April 2024",
    description: "Java Programming certification from Oracle Academy.",
    skills: ["Java", "Programming", "Software Development"],
    detailsUrl:
      "https://www.linkedin.com/in/george-bobby/details/certifications/",
    icon: SiOpenjdk,
  },
];

export default certifications;
