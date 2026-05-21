"use client";

import { CheckSquare, RotateCcw, Square } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  defaultProgress,
  ProgressId,
  ProgressMap,
  progressItems,
  readProgress,
  resetProgress,
  saveProgress
} from "@/lib/localStorage";
import PosterCard from "@/components/PosterCard";

export default function ProgressChecklist() {
  const [progress, setProgress] = useState<ProgressMap>(defaultProgress);

  useEffect(() => {
    setProgress(readProgress());
  }, []);

  const completed = useMemo(() => Object.values(progress).filter(Boolean).length, [progress]);

  function toggle(id: ProgressId) {
    const next = { ...progress, [id]: !progress[id] };
    setProgress(next);
    saveProgress(next);
  }

  function handleReset() {
    resetProgress();
    setProgress(defaultProgress);
  }

  return (
    <PosterCard as="section" className="!bg-ink !text-paper" aria-labelledby="progress-title">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="font-body text-sm font-black uppercase tracking-[0.16em] text-paper/70">
            Local only. No account.
          </p>
          <h2 id="progress-title" className="mt-2 font-display text-5xl font-black uppercase leading-none">
            Your Local Action Progress
          </h2>
          <p className="mt-4 text-sm font-bold leading-relaxed text-paper/75">
            Saved only in your browser localStorage. This hub does not track, upload, or analyze your checklist.
          </p>
          <div className="mt-6 inline-flex border-2 border-paper px-4 py-2 font-display text-4xl font-black">
            {completed}/{progressItems.length}
          </div>
        </div>
        <div className="grid gap-3">
          {progressItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => toggle(item.id)}
              className="focus-ring flex items-center gap-3 border-2 border-paper bg-paper/10 px-4 py-3 text-left text-sm font-black uppercase transition hover:bg-paper hover:text-ink"
            >
              {progress[item.id] ? <CheckSquare aria-hidden="true" size={20} /> : <Square aria-hidden="true" size={20} />}
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={handleReset}
            className="button-secondary mt-2 border-paper bg-paper text-ink"
          >
            <RotateCcw aria-hidden="true" size={16} />
            Reset progress
          </button>
        </div>
      </div>
    </PosterCard>
  );
}
