"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from "@headlessui/react";
import { ChevronRight, Menu, X } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { SystemStatus } from "@/components/system-status";

const navLinks = [
  { label: "Surface", href: "#surface" },
  { label: "Architecture", href: "#architecture" },
  { label: "Operations", href: "#operations" },
  { label: "Governance", href: "#governance" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Disclosure
      as="header"
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-background/70 backdrop-blur-xl shadow-sm border-b border-border/40"
          : "bg-transparent py-2",
      )}
    >
      {({ open, close }) => (
        <motion.div
          initial={{ y: -18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5 lg:px-8">
            <a href="#" className="group flex items-center gap-3">
              <div className="relative h-14 w-14 overflow-hidden rounded-xl border border-primary/20 bg-primary/5 shadow-inner transition-transform group-hover:scale-105">
                <Image
                  src="/logo.webp"
                  alt="Noderax logo"
                  fill
                  className="object-contain p-1 dark:hidden"
                  priority
                />
                <Image
                  src="/logo-white.png"
                  alt="Noderax logo"
                  fill
                  className="hidden object-contain p-1 dark:block"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <div className="text-[17px] font-extrabold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  Noderax
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Control Plane
                </div>
              </div>
            </a>

            <div className="hidden items-center gap-1.5 md:flex rounded-full border border-border/40 bg-card/40 p-1.5 shadow-sm backdrop-blur-md">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="relative rounded-full px-4 py-1.5 text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:bg-background/80"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="hidden items-center gap-3 md:flex">
              <ThemeToggle />
              <div className="h-4 w-px bg-border/60" />
              <SystemStatus placement="bottom" />
              <a
                href="#architecture"
                className={cn(
                  buttonVariants({ variant: "ghost", size: "sm" }),
                  "font-medium",
                )}
              >
                View Architecture
              </a>
              <a
                href="#cta"
                className={cn(
                  buttonVariants({ size: "sm" }),
                  "group rounded-full shadow-md",
                )}
              >
                Dashboard
                <ChevronRight className="ml-1 h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>

            <div className="flex items-center gap-3 md:hidden">
              <ThemeToggle />
              <DisclosureButton
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-background/80 text-foreground shadow-sm backdrop-blur transition-colors hover:bg-muted"
                aria-label="Toggle navigation"
              >
                {open ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </DisclosureButton>
            </div>
          </nav>

          <Transition
            show={open}
            enter="transition duration-300 ease-out"
            enterFrom="opacity-0 -translate-y-4 shadow-none"
            enterTo="opacity-100 translate-y-0 shadow-lg"
            leave="transition duration-200 ease-in"
            leaveFrom="opacity-100 translate-y-0 shadow-lg"
            leaveTo="opacity-0 -translate-y-4 shadow-none"
          >
            <DisclosurePanel
              static
              className="absolute inset-x-0 top-full border-b border-border/40 bg-card/95 px-6 pb-6 pt-3 backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => close()}
                    className="flex rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:bg-primary/5 hover:text-primary active:bg-primary/10"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="mt-5 grid gap-3">
                <a
                  href="#architecture"
                  onClick={() => close()}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "default" }),
                    "h-11 rounded-xl",
                  )}
                >
                  View Architecture
                </a>
                <a
                  href="#cta"
                  onClick={() => close()}
                  className={cn(
                    buttonVariants({ size: "default" }),
                    "h-11 rounded-xl shadow-md",
                  )}
                >
                  Dashboard Console
                </a>
              </div>

              <SystemStatus mode="inline" className="mt-4" />
            </DisclosurePanel>
          </Transition>
        </motion.div>
      )}
    </Disclosure>
  );
}
