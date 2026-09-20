import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import data from "../../data/site.json";
import { SectionIntro, Reveal } from "../ui/Reveal";
import { useScrollTo } from "../../lib/useScrollTo";

gsap.registerPlugin(ScrollTrigger);

export function Process() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const progressRef = useRef(null);
  const scrollTo = useScrollTo();

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const track = trackRef.current;
      const distance = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${distance() + window.innerHeight * 0.4}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative overflow-hidden bg-bg md:flex md:min-h-screen md:flex-col md:justify-center"
    >
      <div className="container-x pt-16 md:pt-0">
        <SectionIntro label={data.process.label} heading={data.process.heading} sub={data.process.sub} />
      </div>

      <div
        ref={trackRef}
        className="mt-10 flex flex-col gap-0 px-5 will-change-transform md:mt-14 md:flex-row md:items-stretch md:gap-10 md:px-12 md:pr-[18vw]"
      >
        {data.process.steps.map((step) => (
          <div
            key={step.num}
            className="relative shrink-0 border-t border-line py-6 md:w-[24rem] md:border-t-0 md:border-l md:py-0 md:pl-8"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-2 right-2 font-display text-[4.5rem] font-semibold leading-none text-ink/[0.05] md:-top-8 md:right-0 md:text-[6.5rem]"
            >
              {step.num}
            </span>
            <p className="font-mono text-xs tracking-[0.22em] text-accent">{step.num}</p>
            <h3 className="mt-3 font-display text-2xl font-medium tracking-tight text-ink md:mt-16 md:text-3xl">
              {step.title}
            </h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted md:mt-4">
              {step.description}
            </p>
          </div>
        ))}

        {/* Closing CTA panel (desktop only) */}
        <div className="hidden shrink-0 items-center md:flex md:w-[22rem]">
          <Reveal y={16} className="w-full">
            <button
              onClick={() => scrollTo("#contact")}
              className="group flex w-full flex-col gap-2.5 rounded-2xl bg-accent p-7 text-left transition-colors duration-500 hover:bg-accent-strong"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">
                Next step
              </span>
              <span className="font-display text-2xl font-medium tracking-tight text-white">
                Have something in mind?
              </span>
              <span className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-white">
                Start a project
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
              </span>
            </button>
          </Reveal>
        </div>
      </div>

      {/* Progress hairline (desktop) */}
      <div className="container-x mt-12 hidden md:block">
        <div className="h-px w-full bg-line">
          <div ref={progressRef} className="h-px origin-left scale-x-0 bg-accent" />
        </div>
      </div>
      <div className="pb-16 md:hidden" />
    </section>
  );
}
