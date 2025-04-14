
export const qnsaiProject = {
  id: 5,
  title: "QnsAI: Automated Question Paper Generation",
  description:
    "Implemented customizable question paper generation using Fine-Tuned Llama 3.2, supporting multiple input formats.",
  image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
  tools: ["Llama 3.2", "JavaScript", "QTI", "YouTube API"],
  slug: "qnsai-auto-question",
  overview:
    "QnsAI automates the process of question paper generation using a fine-tuned Llama 3.2 model. The platform allows educators to create question papers based on Bloom's Taxonomy, with customizable difficulty levels and support for various input formats, including text, documents, and YouTube video transcripts.",
  challenges: [
    "Developing an AI model capable of generating contextually appropriate questions.",
    "Ensuring question quality aligns with educational standards.",
    "Supporting multiple input formats while maintaining accuracy.",
  ],
  solution:
    "Llama 3.2 was fine-tuned using a diverse dataset of academic materials. A preprocessing pipeline was designed to convert YouTube video transcripts into structured content for question generation. A browser extension was built to integrate with educational platforms for seamless usability.",
  outcome:
    "The system reduced the time required for manual question paper creation by 40%, while achieving a 25% improvement in question accuracy compared to traditional methods.",
};
