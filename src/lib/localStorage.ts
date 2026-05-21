export const progressKey = "cjp-action-hub-progress";

export type ProgressId =
  | "followed"
  | "downloaded-card"
  | "copied-caption"
  | "read-demands"
  | "shared-friend"
  | "volunteered";

export type ProgressMap = Record<ProgressId, boolean>;

export const progressItems: Array<{ id: ProgressId; label: string }> = [
  { id: "followed", label: "I followed official website/socials" },
  { id: "downloaded-card", label: "I downloaded a share card" },
  { id: "copied-caption", label: "I copied a caption" },
  { id: "read-demands", label: "I read the five demands" },
  { id: "shared-friend", label: "I shared with a friend" },
  { id: "volunteered", label: "I volunteered a skill" }
];

export const defaultProgress: ProgressMap = {
  followed: false,
  "downloaded-card": false,
  "copied-caption": false,
  "read-demands": false,
  "shared-friend": false,
  volunteered: false
};

export function readProgress(): ProgressMap {
  if (typeof window === "undefined") {
    return defaultProgress;
  }

  const stored = window.localStorage.getItem(progressKey);
  if (!stored) {
    return defaultProgress;
  }

  try {
    return { ...defaultProgress, ...JSON.parse(stored) } as ProgressMap;
  } catch {
    return defaultProgress;
  }
}

export function saveProgress(progress: ProgressMap) {
  window.localStorage.setItem(progressKey, JSON.stringify(progress));
}

export function resetProgress() {
  window.localStorage.removeItem(progressKey);
}
