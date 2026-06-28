"use client";

import { useEffect, useRef, useState } from "react";

interface StatItem {
  label: string;
  value: number;
  suffix: string;
}

const stats: StatItem[] = [
  { label: "Businesses Funded", value: 600, suffix: "+" },
  { label: "Capital Deployed", value: 80, suffix: "M+" },
  { label: "Institutional Lenders", value: 500, suffix: "+" },
  { label: "Days to Funding", value: 5, suffix: "–23" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    const increment = target / steps;

    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding border-t border-vault-border"
    >
      <div className="container-vault">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, idx) => (
            <div
              key={stat.label}
              className={`scroll-reveal delay-${(idx + 1) as any}`}
            >
              <div className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-vault-gold mb-2">
                {isVisible ? (
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                ) : (
                  <>0{stat.suffix}</>
                )}
              </div>
              <p className="text-sm md:text-base text-vault-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
