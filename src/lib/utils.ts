import type { ClassValue } from "./types";

/** Join conditional class names. */
export function cn(...values: ClassValue[]): string {
  return values
    .flatMap((value) => {
      if (!value) return [];
      if (typeof value === "string") return [value];
      if (Array.isArray(value)) return value.filter(Boolean) as string[];
      return Object.entries(value)
        .filter(([, on]) => Boolean(on))
        .map(([key]) => key);
    })
    .join(" ");
}
