export type CreatorKitItem = {
  title: string;
  description: string;
  href?: string;
  type: "download" | "copy" | "guide" | "pending";
};

export const creatorKitItems: CreatorKitItem[] = [
  {
    title: "Caption bank",
    description: "Ready-to-copy caption lines.",
    href: "/creator-kit/caption-bank.txt",
    type: "download"
  },
  {
    title: "Hashtag bank",
    description: "Configurable starter hashtags.",
    href: "/creator-kit/hashtag-bank.txt",
    type: "download"
  },
  {
    title: "Font/color guide",
    description: "Simple visual rules for consistent supporter graphics.",
    href: "/creator-kit/font-color-guide.txt",
    type: "guide"
  },
  {
    title: "Do / Don't guide",
    description: "Responsible sharing rules for supporter-made content.",
    href: "/creator-kit/do-dont-guide.txt",
    type: "guide"
  }
];

export const downloadAllZip = "";

export const doGuide = [
  "Keep it witty, civic, transparent, and non-abusive.",
  "Link people to official channels for official updates.",
  "Mark supporter-made graphics clearly.",
  "Correct yourself quickly if information changes."
];

export const dontGuide = [
  "Do not impersonate the party or fabricate official handles.",
  "Do not target people by caste, religion, gender, or protected traits.",
  "Do not share unverified claims as facts.",
  "Do not use harassment, hate, or dehumanizing language."
];

export const colorGuide = [
  { name: "Paper", value: "#f6ead0" },
  { name: "Ink", value: "#111111" },
  { name: "Stamp red", value: "#b91c1c" },
  { name: "Ochre", value: "#c78b2b" }
];
