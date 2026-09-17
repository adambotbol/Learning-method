// Render math with KaTeX, then highlight active TOC entry on scroll.
document.addEventListener("DOMContentLoaded", () => {
  if (window.renderMathInElement) {
    renderMathInElement(document.body, {
      delimiters: [
        { left: "$$", right: "$$", display: true },
        { left: "$", right: "$", display: false },
      ],
      throwOnError: false,
    });
  }

  const tocLinks = Array.from(document.querySelectorAll(".toc a"));
  const targets = tocLinks
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if (!targets.length) return;

  const setActive = (id) => {
    tocLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    },
    { rootMargin: "-15% 0px -70% 0px" }
  );

  targets.forEach((t) => observer.observe(t));
});
