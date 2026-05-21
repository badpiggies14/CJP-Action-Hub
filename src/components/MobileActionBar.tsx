import Link from "next/link";
import { Megaphone, PenTool, UserPlus } from "lucide-react";

export default function MobileActionBar() {
  return (
    <nav
      className="no-print fixed inset-x-0 bottom-0 z-50 grid grid-cols-3 border-t-2 border-ink bg-newsprint md:hidden"
      aria-label="Quick actions"
    >
      <Link className="grid place-items-center gap-1 border-r border-ink py-2 text-[11px] font-black uppercase" href="/follow">
        <Megaphone aria-hidden="true" size={18} />
        Follow
      </Link>
      <Link className="grid place-items-center gap-1 border-r border-ink py-2 text-[11px] font-black uppercase" href="/tools">
        <PenTool aria-hidden="true" size={18} />
        Create
      </Link>
      <Link className="grid place-items-center gap-1 py-2 text-[11px] font-black uppercase" href="/#volunteer">
        <UserPlus aria-hidden="true" size={18} />
        Volunteer
      </Link>
    </nav>
  );
}
