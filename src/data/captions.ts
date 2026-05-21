export type CaptionPlatform = "X / Twitter" | "Instagram" | "WhatsApp" | "Telegram";
export type CaptionTone = "Funny" | "Serious" | "Angry but clean" | "Youthful" | "Press-style";
export type CaptionTopic =
  | "Follow the movement"
  | "Five demands"
  | "Volunteer"
  | "Share a meme"
  | "Read manifesto";

export const captionPlatforms: CaptionPlatform[] = [
  "X / Twitter",
  "Instagram",
  "WhatsApp",
  "Telegram"
];

export const captionTones: CaptionTone[] = [
  "Funny",
  "Serious",
  "Angry but clean",
  "Youthful",
  "Press-style"
];

export const captionTopics: CaptionTopic[] = [
  "Follow the movement",
  "Five demands",
  "Volunteer",
  "Share a meme",
  "Read manifesto"
];

export const captionBank = [
  "Five demands. Zero sponsors. One stubborn swarm.",
  "You cannot squash a movement.",
  "Headquartered wherever the WiFi works.",
  "Chronically online, politically awake.",
  "The lazy have logged in."
];

export const hashtagBank = [
  "#CJPActionHub",
  "#CockroachJantaParty",
  "#YouCannotSquashAMovement",
  "#FiveDemandsZeroSponsors",
  "#TheSwarm"
];

const toneOpeners: Record<CaptionTone, string[]> = {
  Funny: [
    "The lazy have clocked in for democracy.",
    "New status unlocked: politically awake and still under-caffeinated.",
    "This is your reminder that stubborn swarms are hard to ignore."
  ],
  Serious: [
    "Official updates matter. Read, verify, and share responsibly.",
    "Civic participation starts with knowing what is being demanded.",
    "A movement grows when people follow official sources and act transparently."
  ],
  "Angry but clean": [
    "Accountability should not need a permission slip.",
    "People are tired of being ignored, counted late, or counted wrong.",
    "The question is simple: where did the money go?"
  ],
  Youthful: [
    "Chronically online, politically awake, and still asking questions.",
    "The group chat has discovered civic duty.",
    "Posting is not everything, but it is a start."
  ],
  "Press-style": [
    "CJP Action Hub is an independent community toolkit for supporters.",
    "Supporters can use this independent hub to find official links and share civic material.",
    "The project provides share cards, captions, and creator resources for responsible support."
  ]
};

const topicClosers: Record<CaptionTopic, string[]> = {
  "Follow the movement": [
    "Follow official CJP channels before trusting screenshots.",
    "Start with the official website, then share responsibly.",
    "One follow, one verified source, one less rumor."
  ],
  "Five demands": [
    "Read the five demands and send them to someone who keeps asking what this is about.",
    "Five demands. Zero sponsors. Plenty of questions.",
    "The manifesto is short enough to read and sharp enough to discuss."
  ],
  Volunteer: [
    "Design, edit, translate, research, organize - pick one skill and help cleanly.",
    "Five minutes is enough to volunteer one useful skill.",
    "Movements need spreadsheets and captions too."
  ],
  "Share a meme": [
    "Make it funny, keep it clean, and mark supporter-made graphics clearly.",
    "A good meme punches up, cites the official link, and avoids misinformation.",
    "Use satire responsibly. The internet has enough chaos already."
  ],
  "Read manifesto": [
    "Read the official manifesto before forwarding the hot take.",
    "Start with the demands, not the rumor mill.",
    "Read once. Read twice. Then share the official source."
  ]
};

export function generateCaptions(
  platform: CaptionPlatform,
  tone: CaptionTone,
  topic: CaptionTopic
) {
  const tags = platform === "WhatsApp" ? "" : ` ${hashtagBank.slice(0, 3).join(" ")}`;
  return toneOpeners[tone].map((opener, index) => {
    const closer = topicClosers[topic][index % topicClosers[topic].length];
    return `${opener} ${closer}${tags}`;
  });
}
