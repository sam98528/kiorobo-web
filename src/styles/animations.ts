import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const fadeInUp = (
  element: gsap.TweenTarget,
  options?: {
    delay?: number;
    duration?: number;
    y?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  }
) => {
  const { delay = 0, duration = 0.8, y = 40, scrollTrigger } = options || {};
  return gsap.fromTo(
    element,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger,
    }
  );
};

export const staggerFadeInUp = (
  elements: gsap.TweenTarget,
  options?: {
    stagger?: number;
    duration?: number;
    y?: number;
    scrollTrigger?: ScrollTrigger.Vars;
  }
) => {
  const { stagger = 0.15, duration = 0.8, y = 40, scrollTrigger } = options || {};
  return gsap.fromTo(
    elements,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      stagger,
      ease: 'power3.out',
      scrollTrigger,
    }
  );
};

export const countUp = (
  element: HTMLElement,
  endValue: number,
  options?: {
    duration?: number;
    suffix?: string;
    prefix?: string;
    scrollTrigger?: ScrollTrigger.Vars;
  }
) => {
  const { duration = 2, suffix = '', prefix = '', scrollTrigger } = options || {};
  const obj = { value: 0 };
  return gsap.to(obj, {
    value: endValue,
    duration,
    ease: 'power2.out',
    scrollTrigger,
    onUpdate: () => {
      element.textContent = `${prefix}${Math.round(obj.value).toLocaleString()}${suffix}`;
    },
  });
};

export { gsap, ScrollTrigger };
