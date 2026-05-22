import Link from "next/link";
import { FileText, Megaphone, PenTool } from "lucide-react";

export default function MobileActionBar() {
  return (
    <nav
      className="no-print fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t-2 border-ink bg-newsprint md:hidden"
      aria-label="Quick actions"
    >
      <Link className="grid min-h-14 place-items-center gap-0.5 border-r border-ink py-1.5 text-[10px] font-black uppercase" href="/follow">
        <Megaphone aria-hidden="true" size={18} />
        Follow
      </Link>
      <Link className="grid min-h-14 place-items-center gap-0.5 border-r border-ink py-1.5 text-[10px] font-black uppercase" href="/tools">
        <PenTool aria-hidden="true" size={18} />
        Tools
      </Link>
      <Link className="grid min-h-14 place-items-center gap-0.5 py-1.5 text-[10px] font-black uppercase" href="/manifesto">
        <FileText aria-hidden="true" size={18} />
        Demands
      </Link>
    </nav>
  );
}
