import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ContainerWidth = "home" | "case" | "page";

type ContainerProps = {
  children: ReactNode;
  width?: ContainerWidth;
  className?: string;
  as?: ElementType;
};

const widthClass: Record<ContainerWidth, string> = {
  home: "max-w-container-home",
  case: "max-w-container-case",
  page: "max-w-container-page",
};

export function Container({
  children,
  width = "home",
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag
      className={cn(
        "mx-auto w-full px-page-gutter-mobile md:px-page-gutter-desktop",
        widthClass[width],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
