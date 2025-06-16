export const pathPilotProject = {
    id: 5,
    title: "PathPilot: Autonomous Navigation & Pathfinding System",
    description:
      "Developed an advanced autonomous navigation platform for robots and drones using real-time pathfinding algorithms, interactive visualization, and dynamic obstacle avoidance.",
    image: "/paper/project-1.webp",
    tools: ["React", "Next.js", "Python", "Flask", "Dijkstra", "A*", "ROS", "OpenCV"],
    slug: "pathpilot-platform",
    overview:
      "PathPilot is a robust pathfinding and navigation system designed for autonomous vehicles and robotics applications. It combines efficient algorithms (Dijkstra, A*) with real-time visualization and control through a user-friendly web interface. The system leverages Python and Flask for backend logic, React and Next.js for the frontend, and integrates robotics frameworks (ROS) and image processing (OpenCV) for real-world deployment.",
    challenges: [
      "Implementing efficient and reliable pathfinding algorithms for dynamic environments.",
      "Visualizing robot navigation and path planning in real time.",
      "Integrating sensor data for obstacle detection and avoidance.",
      "Ensuring cross-platform compatibility for both web and hardware interfaces.",
    ],
    solution:
      "PathPilot utilizes Dijkstra and A* algorithms for optimal route planning, with a React-based dashboard for interactive map visualization and control. The backend, powered by Flask, handles algorithm execution and communicates with robotic hardware using ROS. OpenCV processes camera feeds for obstacle recognition, while the system adapts to changing environments through real-time sensor input.",
    outcome:
      "PathPilot enabled seamless autonomous navigation for robots and drones in complex environments. Its real-time visualization and adaptability reduced manual intervention, improving operational efficiency and safety. The platform has been successfully demonstrated in both simulated and real-world scenarios.",
  };