export const storeRatingSystemProject = {
    id: 12,
    title: "Store Rating System: Full-Stack Web Application",
    description:
      "A comprehensive fullstack web application for rating and managing stores with role-based access control, built with NestJS backend and React frontend.",
    image: "/paper/project-store-rating.webp",
    tools: ["NestJS", "React", "TypeScript", "PostgreSQL", "JWT", "TypeORM", "React Router"],
    slug: "store-rating-system",
    overview:
      "Store Rating System is a production-ready web application that enables users to submit and manage store ratings with a sophisticated role-based access control system. The application supports three distinct user roles: System Administrator, Normal User, and Store Owner, each with tailored functionality and dashboards. Built with modern technologies including NestJS for the backend API and React with TypeScript for the frontend interface.",
    challenges: [
      "Implementing secure role-based authentication and authorization across multiple user types.",
      "Designing a scalable database schema to handle complex relationships between users, stores, and ratings.",
      "Creating intuitive user interfaces for different user roles while maintaining consistent design patterns.",
      "Ensuring real-time rating calculations and aggregations for store performance metrics.",
      "Implementing comprehensive form validations and data integrity checks.",
      "Managing complex state management across multiple user dashboards and components."
    ],
    solution:
      "The project utilizes a robust NestJS backend with JWT authentication, TypeORM for database management, and comprehensive validation using class-validator. The frontend is built with React and TypeScript, featuring protected routes, context-based state management, and responsive design. The application implements proper separation of concerns with modular architecture, making it maintainable and scalable. Database relationships are carefully designed with proper indexing and constraints to ensure data integrity and optimal performance.",
    outcome:
      "Successfully delivered a fully functional store rating platform that demonstrates enterprise-level development practices. The application features complete CRUD operations, advanced filtering and search capabilities, real-time dashboard analytics, and secure user management. The codebase follows industry best practices with comprehensive documentation, proper Git workflow, and production-ready configurations. The project showcases proficiency in modern full-stack development, security implementation, and professional software engineering practices."
};