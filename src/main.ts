// Types
type RGB = { r: number; g: number; b: number };

// Utilities: color interpolation and easing
function hexToRgb(hex: string): RGB {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function rgbToHex({ r, g, b }: RGB): string {
  const toHex = (v: number) => v.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function mixHex(hexA: string, hexB: string, t: number): string {
  const a = hexToRgb(hexA);
  const b = hexToRgb(hexB);
  const rgb: RGB = {
    r: Math.round(lerp(a.r, b.r, t)),
    g: Math.round(lerp(a.g, b.g, t)),
    b: Math.round(lerp(a.b, b.b, t)),
  };
  return rgbToHex(rgb);
}

// Smooth easing for scroll progress
function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// DOM helpers
const $ = <T extends Element = Element>(sel: string, root = document) =>
  root.querySelector<T>(sel);

const $$ = <T extends Element = Element>(sel: string, root = document) =>
  Array.from(root.querySelectorAll<T>(sel));

// Set current year
const yearEl = $("#year") as HTMLSpanElement | null;
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// Scroll-driven background gradient and adaptive text color
(function setupBackgroundScroll() {
  const docEl = document.documentElement;
  const styles = getComputedStyle(docEl);
  const light = styles.getPropertyValue("--bg-light").trim();
  const dark = styles.getPropertyValue("--bg-dark").trim();

  let ticking = false;

  function setBackground() {
    const max =
      (docEl.scrollHeight || 1) - (window.innerHeight || docEl.clientHeight);
    const scrolled = Math.min(Math.max(window.scrollY / (max || 1), 0), 1);
    const t = easeInOutCubic(scrolled);

    // Mix between light and dark
    const bgMix = mixHex(light, dark, t);
    docEl.style.setProperty("--bg-mix", bgMix);

    // Adaptive text color based on perceived luminance
    const { r, g, b } = hexToRgb(bgMix);
    const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

    const text =
      luminance > 0.7
        ? "#111319"
        : luminance > 0.5
        ? "#1b1f27"
        : "rgba(242,245,248,0.96)";
    const muted =
      luminance > 0.7
        ? "#4c5665"
        : luminance > 0.5
        ? "#707b8c"
        : "rgba(203,210,220,0.8)";

    docEl.style.setProperty("--text", text);
    docEl.style.setProperty("--muted", muted);

    // Subtle parallax for orbs
    const orbA = $(".orb-a") as HTMLElement | null;
    const orbB = $(".orb-b") as HTMLElement | null;
    if (orbA && orbB) {
      orbA.style.transform = `translateY(${t * 20}px)`;
      orbB.style.transform = `translateY(${t * -30}px)`;
    }
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        setBackground();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  setBackground();
})();

// Intersection Observer for reveal-on-scroll
(function setupReveals() {
  const els = $$(".reveal") as HTMLElement[];
  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add("in-view");
          io.unobserve(entry.target); // animate once
        }
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  els.forEach(el => io.observe(el));
})();

// Reduce motion respects user preference
(function respectReducedMotion() {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const apply = () => {
    if (mq.matches) {
      $$(".reveal").forEach(el => {
        (el as HTMLElement).style.transition = "none";
        el.classList.add("in-view");
      });
      $$(".orb").forEach(el => {
        (el as HTMLElement).style.display = "none";
      });
    }
  };
  if ("addEventListener" in mq) {
    mq.addEventListener("change", apply);
  } else {
    // @ts-expect-error: addListener for older browsers
    mq.addListener(apply);
  }
  apply();
})();