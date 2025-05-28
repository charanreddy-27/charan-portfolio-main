interface Author {
  name: string;
  orcidId?: string;
}

const papers = [
  {
    title:
      "Lung Disease Detection and Classification with Improved Deep Learning Model Using X-Ray Images",
    authors: [
      { name: "Charan Reddy Chanda", orcidId: "0000-0002-1234-5678" },
      { name: "Dr. Babu Kumar", orcidId: "0000-0001-8765-4321" },
      { name: "Dr. Sarah Johnson", orcidId: "0000-0003-5678-1234" },
      { name: "Prof. Michael Chen", orcidId: "0000-0004-4321-8765" }
    ],
    publishedDate: "April 2025",
    publication: "Springer",
    tags: ["Deep Learning", "Medical Image Analysis", "X-Ray Imaging", "Lung Disease Detection", "Computer-Aided Diagnosis"],
    slug: "lung-disease-detection-xray-deep-learning",
    link: "",
    image: "/paper/paper-1.webp",
  },
];

export default papers;
export type { Author };
