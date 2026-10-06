import {
  BadgeCheck,
  Calendar,
  Clock,
  Droplets,
  Factory,
  FileText,
  Handshake,
  HardHat,
  Landmark,
  Mail,
  MapPin,
  MessageSquareWarning,
  Newspaper,
  Phone,
  Ruler,
  ScrollText,
  ShieldAlert,
  ShieldCheck,
  Ship,
  Sun,
  TrendingUp,
  Truck,
  Users,
  Wind,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/lib/icon-names";

const icons: Record<IconName, LucideIcon> = {
  droplets: Droplets,
  factory: Factory,
  ship: Ship,
  sun: Sun,
  "trending-up": TrendingUp,
  truck: Truck,
  handshake: Handshake,
  newspaper: Newspaper,
  "hard-hat": HardHat,
  "shield-check": ShieldCheck,
  ruler: Ruler,
  "badge-check": BadgeCheck,
  "map-pin": MapPin,
  landmark: Landmark,
  "scroll-text": ScrollText,
  "message-warning": MessageSquareWarning,
  "shield-alert": ShieldAlert,
  wind: Wind,
  users: Users,
  calendar: Calendar,
  "file-text": FileText,
  phone: Phone,
  mail: Mail,
  clock: Clock,
};

/** Icono decorativo: siempre va junto a un texto que dice lo mismo, por eso se oculta a lectores de pantalla. */
export function Icon({ name, className = "size-5" }: { name: IconName; className?: string }) {
  const Component = icons[name];
  return <Component className={className} aria-hidden="true" focusable="false" strokeWidth={1.75} />;
}

type Tone = "light" | "dark";

/** Icono en un cuadrado de color. Es chico y va al costado del título, no encima. */
export function IconBadge({ name, tone = "light", className = "" }: { name: IconName; tone?: Tone; className?: string }) {
  const palette = tone === "light" ? "bg-petrol-100 text-petrol-700" : "bg-white/10 text-signal-500";
  return (
    <span className={`inline-flex size-11 shrink-0 items-center justify-center ${palette} ${className}`}>
      <Icon name={name} className="size-6" />
    </span>
  );
}
