"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Marquee } from "@/components/ui/marquee";

const logos = [
  "Cloudflare",
  "Hetzner",
  "DigitalOcean",
  "AWS",
  "Vercel",
  "OVH",
];

export function LogoCloud() {
  return (
    <section className="relative border-y border-border/50 py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <ScrollReveal>
          <p className="text-center text-sm font-medium text-muted-foreground mb-8">
            Trusted by infrastructure teams across the globe
          </p>
        </ScrollReveal>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <Marquee pauseOnHover className="[--duration:30s]">
            {logos.map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="mx-8 flex items-center gap-3 text-muted-foreground opacity-60 transition-opacity hover:opacity-100"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/80 glass-panel">
                  <span className="text-xs font-bold">
                    {name.slice(0, 2).toUpperCase()}
                  </span>
                </div>
                <span className="text-base font-semibold tracking-wide">
                  {name}
                </span>
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}
