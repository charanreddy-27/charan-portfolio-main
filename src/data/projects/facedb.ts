export const faceDBProject = {
  id: 1,
  title: "Face Recognition and Vector Database Integration",
  description:
    "Developed a face recognition system integrated with vector databases for accurate identification, querying, and management of facial data.",
    image: "/paper/project-1.webp",
  tools: ["Python", "face_recognition", "ChromaDB", "Pinecone", "unittest"],
  slug: "face-recognition-db",
  overview:
    "This project focuses on managing and recognizing facial data using deep learning embeddings and vector database integrations. It supports operations such as adding, recognizing, updating, deleting, and querying face data. It offers backend flexibility through support for both local (ChromaDB) and cloud-based (Pinecone) vector stores.",
  challenges: [
    "Implementing accurate face recognition with variable lighting and angles.",
    "Maintaining performance with growing facial datasets.",
    "Enabling seamless switching between vector database backends.",
    "Managing API authentication securely and efficiently.",
  ],
  solution:
    "The system leverages the `face_recognition` library for generating face embeddings and supports database operations through flexible backends. ChromaDB provides a lightweight, local option, while Pinecone enables scalable, cloud-based vector similarity search. Environment variables were used to manage credentials securely, and the project was tested using the `unittest` framework. GitHub Actions ensured CI/CD workflows across Python versions and platforms.",
  outcome:
    "Delivered a reliable face recognition backend capable of supporting scalable identification tasks. Enabled dynamic backend switching and enhanced test coverage. The modular design allows deployment in both local and enterprise environments, improving adaptability and maintainability.",
};
