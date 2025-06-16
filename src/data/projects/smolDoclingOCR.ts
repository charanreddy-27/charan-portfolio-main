export const smolDoclingOCRProject = {
    id: 11,
    title: "SmolDocling-OCR: Lightweight Document OCR Pipeline",
    description:
      "A lightweight, efficient OCR pipeline for extracting text from scanned documents and images, designed for educational and linguistic research use-cases.",
    image: "/paper/project-4.webp",
    tools: ["Python", "Tesseract OCR", "OpenCV", "Pillow", "Flask", "React"],
    slug: "smoldocling-ocr",
    overview:
      "SmolDocling-OCR provides a streamlined workflow for converting scanned documents and images into machine-readable text. The system leverages Tesseract for OCR, OpenCV for image pre-processing, and a simple web interface for uploading images and viewing results. Designed for researchers and students, it emphasizes accuracy, speed, and ease of deployment.",
    challenges: [
      "Handling diverse document qualities and layouts (skew, noise, handwriting).",
      "Optimizing pre-processing to improve OCR accuracy across languages.",
      "Building a simple, user-friendly web interface for non-technical users.",
      "Ensuring lightweight deployment suitable for resource-constrained environments."
    ],
    solution:
      "The pipeline integrates image enhancement with OpenCV and Pillow, followed by text extraction using Tesseract OCR. A Flask backend processes uploads and OCR tasks, while a React frontend allows users to submit documents and view extracted text. The system is containerized for easy deployment.",
    outcome:
      "SmolDocling-OCR enables rapid and reliable text extraction from various educational and research documents. Its lightweight design allows deployment on low-resource hardware, and its modular structure supports easy customization for different research needs."
  };