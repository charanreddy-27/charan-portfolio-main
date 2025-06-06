interface Author {
  name: string;
  orcidId?: string;
}

const papers = [
  {
    title:
      "Lung Disease Detection and Classification with Improved Deep Learning Model Using X-Ray Images",
    authors: [
      { name: "Dr.Babu Kumar", orcidId: "0000-0002-1956-4565" },
      { name: "Charan Reddy Chanda", orcidId: "0009-0003-2414-6717" },
      { name: "Gudisa Vathsalya Reddy", orcidId: "0009-0003-8634-5834" },
      { name: "T.Purna Chandu", orcidId: "0009-0001-9065-1485" }
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
