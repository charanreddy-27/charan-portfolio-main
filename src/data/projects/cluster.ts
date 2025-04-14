
export const clusterProject = {
  id: 2,
  title: "Cluster: University Collaboration Platform",
  description:
    "Implemented AI-driven features for personalized project recommendations and academic collaborations.",
  image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c",
  tools: ["Next.js", "MongoDB", "AI Models"],
  slug: "cluster-platform",
  overview:
    "Cluster is an academic networking platform designed to connect university students and faculty for collaborative projects and research initiatives. The AI-driven recommendation engine intelligently suggests projects, research papers, and potential collaborators based on user interests, skills, and previous work. The system also features a discussion forum, a centralized research repository, and real-time event updates.",
  challenges: [
    "Developing an AI-based matchmaking system to suggest relevant projects.",
    "Ensuring real-time collaboration features for researchers and students.",
    "Managing a growing database while keeping retrieval times low.",
    "Implementing a secure access control system to protect sensitive research data.",
  ],
  solution:
    "To address these challenges, a hybrid AI recommendation engine was implemented using collaborative and content-based filtering techniques. The platform was built with Next.js for a responsive frontend and MongoDB for scalable data management. A real-time chat system with WebSockets was integrated for seamless communication. Role-based authentication and encryption were added to secure user data.",
  outcome:
    "The implementation led to a 20% increase in successful collaborations between students and faculty, improving academic engagement. The AI-driven recommendations significantly reduced time spent searching for relevant projects, and the user base grew rapidly due to positive feedback from early adopters.",
};
