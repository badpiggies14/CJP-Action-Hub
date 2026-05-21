import { theme } from "@/data/theme";

export default function MarqueeTicker() {
  const line = [...theme.slogans, ...theme.slogans];

  return (
    <div className="no-print overflow-hidden border-y-2 border-ink bg-stamp py-3 text-paper" aria-label="Movement slogans">
      <div className="flex w-max animate-[ticker_28s_linear_infinite] gap-8 whitespace-nowrap font-display text-3xl font-black uppercase leading-none">
        {line.map((item, index) => (
          <span key={`${item}-${index}`} className="inline-flex items-center gap-8">
            {item}
            <span aria-hidden="true">✦</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
