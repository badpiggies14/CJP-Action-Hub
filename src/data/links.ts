export type LinkKey =
  | "officialWebsite"
  | "x"
  | "instagram"
  | "youtube"
  | "telegram"
  | "email"
  | "pressEmail"
  | "correctionEmail";

export const links: Record<LinkKey, string> = {
  officialWebsite: "https://cockroachjantaparty.org/",
  x: "",
  instagram: "https://www.instagram.com/cockroachjantaparty/",
  youtube: "",
  telegram: "",
  email: "",
  pressEmail: "",
  correctionEmail: ""
};

export type FollowLink = {
  key: LinkKey;
  label: string;
  description: string;
  kind: "url" | "email" | "form";
  qrImage?: string;
};

export const followLinks: FollowLink[] = [
  {
    key: "officialWebsite",
    label: "Official Website",
    description: "Read official updates and the full manifesto.",
    kind: "url"
  },
  {
    key: "x",
    label: "X / Twitter",
    description: "Official social link pending.",
    kind: "url"
  },
  {
    key: "instagram",
    label: "Instagram",
    description: "Follow the official Instagram page.",
    kind: "url",
    qrImage: "/qr/instagram.png"
  },
  {
    key: "youtube",
    label: "YouTube",
    description: "Official social link pending.",
    kind: "url"
  },
  {
    key: "telegram",
    label: "Telegram",
    description: "Official community link pending.",
    kind: "url"
  },
  {
    key: "email",
    label: "Email",
    description: "Official email pending.",
    kind: "email"
  },
  {
    key: "pressEmail",
    label: "Press Contact",
    description: "Official press email pending.",
    kind: "email"
  }
];

export function isConfigured(value: string | undefined) {
  return Boolean(value && value.trim().length > 0);
}

export function linkValue(key: LinkKey) {
  return links[key];
}

export function mailtoLink(email: string, subject: string, body?: string) {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = body ? `&body=${encodeURIComponent(body)}` : "";
  const recipient = isConfigured(email) ? email : "";
  return `mailto:${recipient}?subject=${encodedSubject}${encodedBody}`;
}

export const pendingMessage = "Official link pending - update in src/data/links.ts";
