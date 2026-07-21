import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type FooterProps = {
  year?: number;
  phone?: string;
  linkedInHref?: string;
  className?: string;
};

export function Footer({
  year = 2026,
  phone = "+7(910)-356-22-77",
  linkedInHref = "https://www.linkedin.com/in/zinovdmitr/",
  className,
}: FooterProps) {
  return (
    <footer className={cn("w-full mt-auto", className)}>
      <Container className="flex flex-wrap items-center justify-between gap-3 py-6 text-body text-ink">
        <span>© {year}</span>
        <div className="flex flex-wrap items-center gap-4">
          <a
            href={`tel:${phone.replace(/[^\d+]/g, "")}`}
            className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            {phone}
          </a>
          <a
            href={linkedInHref}
            target="_blank"
            rel="noopener noreferrer"
            className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            LinkedIn
          </a>
        </div>
      </Container>
    </footer>
  );
}
