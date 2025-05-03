import {
  Blocks,
  Bot,
  ChartPie,
  Film,
  FolderPen,
  HeartHandshake,
  MessageCircle,
  MessageCircleHeart,
  MessagesSquare,
  Settings2,
  Users,
} from "lucide-react";
import React from "react";

const features = [
  {
    icon: MessageCircleHeart,
    title: "Personalized Relationship Analysis",
    description:
      "Share your unique relationship dynamics with our AI counselor. It listens and understands the specific challenges you're facing as a couple.",
  },
  {
    icon: HeartHandshake,
    title: "Emotional Understanding",
    description:
      "Express how you truly feel about each other. Our AI captures emotional nuances and helps bridge communication gaps between partners.",
  },
  {
    icon: FolderPen,
    title: "Continuous Session Memory",
    description:
      "No need to repeat your story. Our AI remembers your entire journey together, creating a seamless experience across all counseling sessions.",
  },
  {
    icon: MessagesSquare,
    title: "Tailored Improvement Suggestions",
    description:
      "Receive personalized guidance based on your specific situation. Our AI offers practical strategies to strengthen your relationship.",
  },
  {
    icon: ChartPie,
    title: "Progress Tracking & Follow-ups",
    description:
      "Your growth matters. Our AI tracks your progress over time and follows up on previous suggestions, celebrating your wins and addressing ongoing challenges.",
  },
  {
    icon: Users,
    title: "Seamless Collaboration",
    description: "You and your partner will work together to complete tasks.",
  },
];

const Features01Page = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-center">
          AI-Powered Relationship Guidance
        </h2>
        <div className="mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-screen-lg mx-auto px-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col border rounded-xl py-6 px-5"
            >
              <div className="mb-3 h-10 w-10 flex items-center justify-center bg-muted rounded-full">
                <feature.icon className="h-6 w-6" />
              </div>
              <span className="text-lg font-semibold">{feature.title}</span>
              <p className="mt-1 text-foreground/80 text-[15px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features01Page;
