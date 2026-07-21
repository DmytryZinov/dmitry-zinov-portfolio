import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "sm"
  | "smOnHero"
  | "smOnDark"
  | "card"
  | "cardOutline";
type ButtonSize =
  | "md"
  | "sm"
  | "smMobile"
  | "smOnDark"
  | "icon"
  | "card"
  | "cardMobile";

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  iconRight?: ReactNode;
  iconLeft?: ReactNode;
  "aria-label"?: string;
};

type ButtonAsButton = CommonProps &
  Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "className" | "aria-label"
  > & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Shared hover for dark surface buttons (Hero / Contact / Project Cards):
 * solid fill #373737, no stroke, no pseudo-element effects.
 */
const darkButtonHover =
  "hover:bg-[#373737] focus-visible:bg-[#373737] hover:border-transparent focus-visible:border-transparent";

const variantClass: Record<ButtonVariant, string> = {
  primary:
    "bg-ink-strong text-canvas hover:bg-ink border border-transparent",
  secondary:
    "bg-transparent text-ink border border-border hover:bg-surface",
  ghost: "bg-transparent text-ink border border-transparent hover:bg-surface",
  sm: "bg-transparent text-ink border border-border hover:bg-surface rounded-full",
  /** Hero `smbtn` — default unchanged. */
  smOnHero: [
    "bg-transparent text-surface border border-border-on-hero rounded-full",
    darkButtonHover,
  ].join(" "),
  /** Contact `smbtn` — default unchanged. */
  smOnDark: [
    "text-surface rounded-full",
    "border border-border bg-ink-strong/20",
    darkButtonHover,
  ].join(" "),
  /** Project card primary — default unchanged. */
  card: [
    "bg-white/[0.06] text-surface border border-transparent rounded-[32px] font-normal",
    darkButtonHover,
  ].join(" "),
  /** Project card secondary — default unchanged. */
  cardOutline: [
    "bg-transparent text-surface border border-border rounded-[32px] font-normal",
    darkButtonHover,
  ].join(" "),
};

const sizeClass: Record<ButtonSize, string> = {
  md: "h-12 px-5 text-body gap-2 rounded-md",
  sm: "h-[30px] pl-3 pr-2 text-caption-lg font-medium gap-1 rounded-full",
  smMobile: "h-10 pl-3 pr-2 text-caption-lg font-medium gap-1 rounded-full",
  /** Figma small-button: h 30, pad 6/8/6/12, icon gap 4 */
  smOnDark:
    "h-[30px] pt-[6px] pr-[8px] pb-[6px] pl-[12px] text-caption-lg font-medium leading-[18px] gap-[4px] rounded-full",
  icon: "size-10 p-0 rounded-md justify-center",
  /**
   * Figma related/project card CTA: h48, px24, 16/22.
   * No `flex-1` — in column layouts flex-basis:0 collapses height below h-12.
   */
  card: "h-12 shrink-0 px-6 text-body leading-[22px] justify-center",
  /** Home project card pair — equal width in a row; height locked. */
  cardMobile: "h-10 min-h-10 shrink-0 flex-1 px-6 text-body-sm leading-[17px] justify-center",
};

function isLink(props: ButtonProps): props is ButtonAsLink {
  return typeof props.href === "string";
}

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size =
      variant === "sm" || variant === "smOnHero"
        ? "sm"
        : variant === "smOnDark"
          ? "smOnDark"
          : variant === "card" || variant === "cardOutline"
            ? "card"
            : "md",
    className,
    iconRight,
    iconLeft,
    "aria-label": ariaLabel,
  } = props;

  const classes = cn(
    "inline-flex items-center justify-center transition-colors duration-fast ease-out",
    "focus-visible:outline-2 focus-visible:outline-offset-2",
    variant === "smOnHero" ||
      variant === "smOnDark" ||
      variant === "card" ||
      variant === "cardOutline"
      ? "focus-visible:outline-surface"
      : "focus-visible:outline-ink",
    "disabled:pointer-events-none disabled:opacity-50",
    variantClass[variant],
    sizeClass[size],
    className,
  );

  const content = (
    <>
      {iconLeft}
      {children}
      {iconRight}
    </>
  );

  if (isLink(props)) {
    const { href, external } = props;
    if (external) {
      return (
        <a
          href={href}
          className={classes}
          aria-label={ariaLabel}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }

  const {
    children: _children,
    variant: _variant,
    size: _size,
    className: _className,
    iconRight: _iconRight,
    iconLeft: _iconLeft,
    "aria-label": _ariaLabel,
    ...buttonProps
  } = props;

  return (
    <button
      type="button"
      className={classes}
      aria-label={ariaLabel}
      {...buttonProps}
    >
      {content}
    </button>
  );
}
