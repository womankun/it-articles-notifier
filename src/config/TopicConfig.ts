export type TopicConfig = {
  topic: string;
  watcherName: string;
};

export const TopicConfigs: TopicConfig[] = [
  { topic: "next", watcherName: "Next.js" },
  { topic: "react", watcherName: "React" },
  { topic: "tailwind", watcherName: "Tailwind CSS" },
  { topic: "spring-boot", watcherName: "Spring Boot" }
];
