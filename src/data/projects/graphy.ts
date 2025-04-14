
export const graphyProject = {
  id: 3,
  title: "Graphy: Virtual Assistant Using GraphRAG",
  description:
    "Developed a virtual assistant with Retrieval Augmented Generation (RAG) and Next.js, featuring a secure document management system.",
  image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  tools: ["Neo4j", "Next.js", "LLM", "GraphRAG"],
  slug: "graphy-virtual-assistant",
  overview:
    "Graphy is an advanced AI-powered virtual assistant designed to leverage Retrieval-Augmented Generation (RAG) using Neo4j's graph database. The system can efficiently retrieve and process user queries from structured knowledge bases while maintaining document-level security and integrity.",
  challenges: [
    "Ensuring fast and accurate knowledge retrieval across structured data.",
    "Building a scalable and secure document-handling system.",
    "Maintaining a balance between accuracy and response time.",
  ],
  solution:
    "Neo4j was used to establish relationships between knowledge entities, improving query performance. Next.js was integrated for a modern, user-friendly interface. Secure document handling was implemented using encrypted storage and access control mechanisms. Optimized indexing and caching techniques were applied to minimize query response times.",
  outcome:
    "Graphy significantly reduced response latency while ensuring data security. Users reported a 40% improvement in the accuracy of knowledge retrieval compared to conventional keyword-based assistants.",
};
