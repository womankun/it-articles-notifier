export type TopicConfig = {
  topic: string;
  watcherName: string;
};

export const TopicConfigsZenn: TopicConfig[] = [
  { topic: "next", watcherName: "Next.js" },
  { topic: "react", watcherName: "React" },
  { topic: "tailwind", watcherName: "Tailwind CSS" },
  { topic: "spring-boot", watcherName: "Spring Boot" }
];
