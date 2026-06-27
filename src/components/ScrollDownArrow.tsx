export default function ScrollDownArrow() {
  return (
    <a
      href="#features"
      aria-label="Rolar para baixo"
      className="group absolute bottom-20 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-1 sm:bottom-6 sm:flex"
    >
      <span className="text-xs font-medium tracking-widest text-white/70 uppercase transition-colors group-hover:text-accent">
        Saiba mais
      </span>
      <div className="animate-scroll-arrow flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm transition-colors group-hover:border-accent group-hover:bg-accent/20">
        <svg
          className="h-5 w-5 text-white transition-colors group-hover:text-accent"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </a>
  );
}
