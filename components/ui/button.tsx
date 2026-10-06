import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { buttonClass, type ButtonSize, type ButtonVariant } from "@/lib/ui";

type Shared = { variant?: ButtonVariant; size?: ButtonSize };

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: Shared & ComponentPropsWithoutRef<"button">) {
  return <button type={type} className={buttonClass(variant, size, className)} {...props} />;
}

export function ButtonLink({
  variant,
  size,
  className,
  ...props
}: Shared & ComponentPropsWithoutRef<typeof Link>) {
  return <Link className={buttonClass(variant, size, className)} {...props} />;
}

/** Enlace a un archivo o a otro sitio, con el aspecto de un botón. */
export function ButtonAnchor({
  variant,
  size,
  className,
  ...props
}: Shared & ComponentPropsWithoutRef<"a">) {
  return <a className={buttonClass(variant, size, className)} {...props} />;
}
