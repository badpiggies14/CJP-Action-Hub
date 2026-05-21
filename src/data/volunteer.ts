import { links, mailtoLink } from "@/data/links";

export type VolunteerSkill = {
  name: string;
  description: string;
  impact: string;
};

export const volunteerSkills: VolunteerSkill[] = [
  {
    name: "Designer",
    description: "Turn slogans and manifesto points into clean, readable posters.",
    impact: "Useful for share cards, profile frames, and printable assets."
  },
  {
    name: "Video editor",
    description: "Cut short clips, captions, reels, and explainers.",
    impact: "Useful when attention spans are shorter than press conferences."
  },
  {
    name: "Meme creator",
    description: "Make satire that is witty, non-abusive, and easy to verify.",
    impact: "Useful for spreading a message without spreading nonsense."
  },
  {
    name: "Researcher",
    description: "Collect sources, summarize claims, and flag uncertain information.",
    impact: "Useful for keeping community material honest."
  },
  {
    name: "Translator",
    description: "Adapt captions and explainers into local languages.",
    impact: "Useful for making official ideas easier to understand."
  },
  {
    name: "Local organizer",
    description: "Coordinate small civic actions and local supporter groups.",
    impact: "Useful for turning online energy into responsible offline work."
  },
  {
    name: "Social media helper",
    description: "Schedule posts, reply cleanly, and point people to official sources.",
    impact: "Useful for keeping momentum consistent."
  },
  {
    name: "Web developer",
    description: "Improve this hub, fix accessibility, and add static tools.",
    impact: "Useful for keeping the toolkit fast, open, and privacy-friendly."
  },
  {
    name: "Content writer",
    description: "Write captions, explainers, FAQs, and press-style notes.",
    impact: "Useful for making satire understandable without making it careless."
  },
  {
    name: "Press/media helper",
    description: "Draft factual notes, correction emails, and media explainers.",
    impact: "Useful for keeping public communication clear."
  },
  {
    name: "Community moderator",
    description: "Keep spaces clean, non-abusive, and safe from misinformation.",
    impact: "Useful for making the movement easier to join."
  }
];

export function volunteerHref(skillName: string) {
  if (links.volunteerForm) {
    return links.volunteerForm;
  }

  return mailtoLink(
    links.email,
    `CJP Action Hub Volunteer: ${skillName}`,
    `Hi,\n\nI would like to volunteer as a ${skillName}.\n\nMy skills:\nMy availability:\nMy city/time zone:\n\nI understand CJP Action Hub is an independent support project and will follow official sources for official updates.\n`
  );
}
