import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { SystemStatus } from "@/components/system-status";

const footerLinks = {
  Surface: [
    { label: "Product surface", href: "#surface" },
    { label: "Operational loops", href: "#operations" },
    { label: "Governance", href: "#governance" },
  ],
  Runtime: [
    { label: "Web runtime", href: "https://github.com/noderax/noderax-web" },
    {
      label: "API orchestration",
      href: "https://github.com/noderax/noderax-api",
    },
    {
      label: "Agent runtime",
      href: "https://github.com/noderax/noderax-agent",
    },
  ],
  Details: [
    { label: "Pricing", href: "#pricing" },
    { label: "Technical FAQ", href: "#faq" },
    { label: "Deploy Dashboard", href: "#cta" },
  ],
};

export function Footer() {
  return (
    <footer className="relative border-t border-border/50 bg-background/95 backdrop-blur-3xl pt-16">
      <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-10 mix-blend-overlay [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]" />
      <div className="absolute left-1/4 top-0 h-[300px] w-[500px] -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 pb-12 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <a href="#" className="group flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-primary/20 bg-primary/5 shadow-inner transition-transform group-hover:scale-105">
                <Image
                  src="/logo.webp"
                  alt="Noderax logo"
                  fill
                  sizes="48px"
                  className="object-contain p-2 dark:hidden"
                />
                <Image
                  src="/logo-white.png"
                  alt="Noderax logo"
                  fill
                  sizes="48px"
                  className="hidden object-contain p-2 dark:block"
                />
              </div>
              <div>
                <div className="text-[17px] font-extrabold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  Noderax
                </div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground/80">
                  Control Plane
                </div>
              </div>
            </a>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              A meticulously engineered infrastructure management suite
              featuring a workspace-aware web UI, robust orchestration, secure
              Go agents, and native persistent telemetry mapping.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title} className="mt-2 text-sm">
              <h4 className="mb-6 font-bold tracking-wider uppercase text-foreground/90">
                {title}
              </h4>
              <ul className="space-y-4">
                {links.map((link) => {
                  const isExternal = link.href.startsWith("http");

                  return (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target={isExternal ? "_blank" : undefined}
                        rel={isExternal ? "noreferrer" : undefined}
                        className="font-medium text-muted-foreground/80 transition-all hover:text-primary hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                      >
                        <span className="inline-flex items-center gap-1.5">
                          {link.label}
                          {isExternal ? (
                            <ExternalLink className="h-3.5 w-3.5" />
                          ) : null}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center gap-4 border-t border-border/40 pt-8 text-xs sm:flex-row sm:justify-between">
          <p className="text-muted-foreground/60 font-medium">
            © {new Date().getFullYear()} Noderax Inc. All rights reserved.
          </p>
          <SystemStatus placement="top" />
        </div>
      </div>
    </footer>
  );
}
