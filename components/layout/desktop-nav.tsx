"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { contactNav, isActive, primaryNav } from "@/lib/nav";
import { buttonClass } from "@/lib/ui";

export function DesktopNav() {
  const pathname = usePathname();
  const contactActive = isActive(pathname, contactNav.href);
  return (
    <nav aria-label="Principal" className="hidden nav:block">
      <ul className="flex items-center gap-1 wide:gap-2">
        {primaryNav.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "relative inline-flex min-h-11 items-center whitespace-nowrap px-3 text-[0.9375rem] font-medium transition-colors duration-200",
                  "after:absolute after:inset-x-3 after:bottom-1.5 after:h-0.5 after:bg-signal-500 after:transition-transform after:duration-300 after:ease-out-quart",
                  active
                    ? "text-white after:scale-x-100"
                    : "text-ink-300 after:scale-x-0 hover:text-white hover:after:scale-x-100",
                ].join(" ")}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
        <li className="ml-2">
          <Link
            href={contactNav.href}
            aria-current={contactActive ? "page" : undefined}
            className={buttonClass(contactActive ? "inverse" : "accent", "md")}
          >
            {contactNav.label}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
