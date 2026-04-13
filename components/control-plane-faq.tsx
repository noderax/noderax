"use client";

import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Transition,
} from "@headlessui/react";
import { ChevronDown, MessageSquareText } from "lucide-react";
import { GradientText } from "@/components/ui/gradient-text";
import { Card } from "@/components/ui/card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";

const items = [
  {
    question: "How does the browser talk to the API?",
    answer:
      "The browser signs in through Next.js auth handlers, then uses proxy route handlers for authenticated REST traffic. Realtime state uses dedicated socket flows, so the public client does not need direct raw API plumbing for every surface.",
  },
  {
    question: "What is the onboarding process for new nodes?",
    answer:
      "Operators first install the control plane with the published one-liner and complete guided setup at /setup. After that, each workspace can create a short-lived node bootstrap command, and install progress streams back into the web UI until the node is enrolled.",
  },
  {
    question: "How is privileged access controlled on each node?",
    answer:
      "Each node has a root access profile with separate operational, task, and terminal surfaces, plus composite combinations. The UI and API wait for the applied profile before unlocking package actions, root tasks, or root terminals.",
  },
  {
    question: "What notification channels exist today?",
    answer:
      "Workspaces can route INFO, WARNING, and CRITICAL events through Email and Telegram. Node-specific rules can suppress node-scoped delivery by channel and severity, while critical event email preferences still allow admins to receive urgent alerts.",
  },
  {
    question: "What happens if an operator leaves a live terminal session?",
    answer:
      "Leaving the page does not terminate the shell immediately. The session stays reattachable for five minutes, transcript chunks remain persisted for seven days, and the creator can return to the same session from the terminal history.",
  },
  {
    question: "How are agent releases shipped across the fleet?",
    answer:
      "The Updates center only surfaces official tagged releases, then walks eligible nodes through a sequential rollout plan. Operators can retry, skip, resume, cancel, or roll back targets while watching status converge in the same view.",
  },
  {
    question: "How does the self-hosted control plane update?",
    answer:
      "Installer-managed deployments compare immutable release IDs rather than a changing marketing version string. When a newer official build exists, platform admins see an alert in the dashboard, stage the download from Updates, then explicitly apply it so the host-side supervisor can roll API, web, and nginx forward with health checks and rollback protection.",
  },
];

export function ControlPlaneFaq() {
  return (
    <section id="faq" className="relative py-20 lg:py-24 overflow-hidden border-t border-border/20">
      <div className="absolute left-1/2 top-0 -z-10 h-[500px] w-full -translate-x-1/2 -translate-y-1/2 bg-primary/5 blur-[150px] pointer-events-none" />

      <div className="relative mx-auto max-w-4xl px-6 lg:px-8">
        <ScrollReveal>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary shadow-sm backdrop-blur-md mb-6">
              <MessageSquareText className="mr-2 h-4 w-4" /> Technical FAQ
            </div>
            <h2 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-5xl">
              Control plane queries answered{" "}
              <GradientText className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-primary">without hand-waving</GradientText>
            </h2>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {items.map((item, index) => (
            <ScrollReveal key={item.question} delay={index * 0.08}>
              <Disclosure>
                {({ open }) => (
                  <Card
                    className={cn(
                      "group overflow-hidden border border-border/50 bg-card/60 backdrop-blur-xl transition-all duration-300",
                      open ? "border-primary/40 shadow-[0_0_30px_-5px_rgba(239,68,68,0.15)] bg-card/80" : "hover:border-primary/20 hover:bg-card/70 hover:shadow-lg hover:shadow-primary/5"
                    )}
                  >
                    <DisclosureButton className="flex w-full items-center justify-between gap-6 px-7 py-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
                      <span className={cn("text-[17px] font-bold text-foreground transition-colors", open && "text-primary")}>
                        {item.question}
                      </span>
                      <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors", open ? "border-primary/30 bg-primary/10 text-primary" : "border-border/60 bg-background/50 text-muted-foreground group-hover:border-primary/20 group-hover:text-primary")}>
                        <ChevronDown
                          className={cn("h-4 w-4 transition-transform duration-300", open && "rotate-180")}
                        />
                      </div>
                    </DisclosureButton>

                    <Transition
                      show={open}
                      enter="transition duration-300 ease-out"
                      enterFrom="opacity-0 -translate-y-4"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition duration-200 ease-in"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 -translate-y-4"
                    >
                      <DisclosurePanel
                        static
                        className="px-7 pb-6 pt-2 text-[15px] leading-relaxed text-muted-foreground/90 border-t border-border/40"
                      >
                        {item.answer}
                      </DisclosurePanel>
                    </Transition>
                  </Card>
                )}
              </Disclosure>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
