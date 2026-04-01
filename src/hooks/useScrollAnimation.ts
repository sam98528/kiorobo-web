import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../styles/animations';

interface ScrollAnimationOptions {
  animation: 'fadeInUp' | 'staggerFadeInUp' | 'fadeIn';
  delay?: number;
  duration?: number;
  y?: number;
  stagger?: number;
  start?: string;
  childrenSelector?: string;
}

export function useScrollAnimation<T extends HTMLElement>(options: ScrollAnimationOptions) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;
    const {
      animation,
      delay = 0,
      duration = 0.8,
      y = 40,
      stagger = 0.15,
      start = 'top 85%',
      childrenSelector,
    } = options;

    let ctx = gsap.context(() => {
      if (animation === 'fadeInUp') {
        gsap.fromTo(
          el,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: 'play none none none',
            },
          }
        );
      } else if (animation === 'staggerFadeInUp') {
        const targets = childrenSelector ? el.querySelectorAll(childrenSelector) : el.children;
        gsap.fromTo(
          targets,
          { opacity: 0, y },
          {
            opacity: 1,
            y: 0,
            duration,
            stagger,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: 'play none none none',
            },
          }
        );
      } else if (animation === 'fadeIn') {
        gsap.fromTo(
          el,
          { opacity: 0 },
          {
            opacity: 1,
            duration,
            delay,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, el);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => {
        if (t.trigger === el) t.kill();
      });
    };
  }, [options.animation, options.delay, options.duration, options.y, options.stagger, options.start, options.childrenSelector]);

  return ref;
}
