export async function copyText(text: string) {
  if (!navigator?.clipboard) {
    throw new Error("Clipboard API is not available in this browser.");
  }

  await navigator.clipboard.writeText(text);
}

export async function shareText(title: string, text: string, url?: string) {
  if (!navigator?.share) {
    await copyText([text, url].filter(Boolean).join("\n"));
    return "copied";
  }

  await navigator.share({ title, text, url });
  return "shared";
}
