export const iotSmokeDetectorProject = {
  id: 7,
  title: "IoT Smoke Detector & Alert System",
  description:
    "Developed a smart IoT-based smoke detector system for real-time fire detection and instant alert notifications, enhancing home and industrial safety.",
  image: "/paper/project-4.webp",
  tools: ["Arduino", "ESP8266", "MQ-2 Smoke Sensor", "C++", "Node.js", "Express", "Firebase", "React", "Twilio API"],
  slug: "iot-smoke-detector",
  overview:
    "The IoT Smoke Detector project is an intelligent fire safety solution that uses sensors and wireless modules to monitor smoke levels in real time. The system sends instant notifications to users via SMS, email, and a dedicated web dashboard. Data is collected by an Arduino with an MQ-2 smoke sensor and transmitted via ESP8266 to a Node.js backend, which processes alerts and updates the frontend dashboard built in React.",
  challenges: [
    "Ensuring reliable and timely communication between hardware sensors and the backend server.",
    "Minimizing false positives while maintaining high sensitivity to smoke.",
    "Implementing real-time notifications to multiple channels (SMS, email, web).",
    "Designing a user-friendly dashboard for monitoring and alert management."
  ],
  solution:
    "The system utilizes an MQ-2 smoke sensor connected to an Arduino, with data relayed wirelessly using an ESP8266 module. A Node.js/Express backend receives and evaluates the sensor data, triggering alerts when smoke is detected above threshold levels. Notifications are sent instantly using the Twilio API and Firebase Cloud Messaging. Users can monitor sensor status and alert history via a React-powered web dashboard.",
  outcome:
    "The IoT Smoke Detector enhanced early fire detection capabilities, providing real-time alerts and improving safety for homes and workplaces. The project demonstrated seamless integration of hardware and cloud technologies, and received positive feedback for its reliability and ease of use.",
};