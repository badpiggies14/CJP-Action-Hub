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
      <div className="grid gap-5 sm:gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div>
          <p className="font-body text-xs font-black uppercase tracking-[0.14em] text-paper/70 sm:text-sm sm:tracking-[0.16em]">
            Local only. No account.
          </p>
          <h2 id="progress-title" className="mt-2 font-display text-4xl font-black uppercase leading-none sm:text-5xl">
            Your Local Action Progress
          </h2>
          <p className="mt-3 text-sm font-bold leading-relaxed text-paper/75 sm:mt-4">
            Saved only in your browser localStorage. This hub does not track, upload, or analyze your checklist.
          </p>
          <div className="mt-4 inline-flex border-2 border-paper px-4 py-2 font-display text-3xl font-black sm:mt-6 sm:text-4xl">
            {completed}/{progressItems.length}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-1 sm:gap-3">
          {progressItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => toggle(item.id)}
              className="focus-ring flex items-center gap-2 border-2 border-paper bg-paper/10 px-3 py-2.5 text-left text-[11px] font-black uppercase transition hover:bg-paper hover:text-ink sm:gap-3 sm:px-4 sm:py-3 sm:text-sm"
            >
              {progress[item.id] ? <CheckSquare aria-hidden="true" size={20} /> : <Square aria-hidden="true" size={20} />}
              {item.label}
            </button>
          ))}
          <button
            type="button"
            onClick={handleReset}
            className="button-secondary col-span-2 mt-1 border-paper bg-paper text-ink sm:col-span-1 sm:mt-2"
          >
            <RotateCcw aria-hidden="true" size={16} />
            Reset progress
          </button>
        </div>
      </div>
    </PosterCard>
  );
}
