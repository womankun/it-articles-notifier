export type TopicConfig = {
  topic: string;
  watcherName: string;
};

export const TopicConfigsZenn: TopicConfig[] = [
  { topic: "next", watcherName: "Next.js" },
  { topic: "react", watcherName: "React" },
  { topic: "typescript", watcherName: "TypeScript" },
  { topic: "springboot", watcherName: "Spring Boot" }
];
