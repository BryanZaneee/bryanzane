// DOM helpers
const $ = <T extends Element = Element>(sel: string, root = document) =>
  root.querySelector<T>(sel);

const $$ = <T extends Element = Element>(sel: string, root = document) =>
  Array.from(root.querySelectorAll<T>(sel));

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
      // Disable BZS pattern animation
      $$(".bzs-row").forEach(el => {
        (el as HTMLElement).style.animation = "none";
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
